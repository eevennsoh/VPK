const net = require("node:net");
const fs = require("node:fs");
const path = require("node:path");
const { spawn } = require("node:child_process");
const { getFrontendBasePort } = require("./lib/worktree-ports");

const basePort = getFrontendBasePort();
const portFile = path.join(process.cwd(), ".dev-frontend-port");
const lockFile = path.join(process.cwd(), ".next", "dev", "lock");
const maxTries = Number.parseInt(process.env.PORT_SEARCH_MAX ?? "20", 10);

const unsupportedErrors = new Set([
	"EADDRNOTAVAIL",
	"EAFNOSUPPORT",
	"EPROTONOSUPPORT",
	"ENOTSUP",
]);

const canListen = (options, { allowUnsupported = false } = {}) =>
	new Promise((resolve) => {
		const server = net.createServer();
		server.unref();
		server.once("error", (err) => {
			if (err.code === "EADDRINUSE" || err.code === "EACCES") {
				resolve(false);
				return;
			}
			if (allowUnsupported && unsupportedErrors.has(err.code)) {
				resolve(true);
				return;
			}
			resolve(false);
		});
		server.once("listening", () => {
			server.close(() => resolve(true));
		});
		server.listen(options);
	});

const isPortAvailable = async (port) => {
	const ipv4Available = await canListen({ port, host: "0.0.0.0" }, {
		allowUnsupported: true,
	});
	if (!ipv4Available) {
		return false;
	}

	const ipv6Available = await canListen(
		{ port, host: "::", ipv6Only: true },
		{ allowUnsupported: true }
	);
	if (ipv6Available === false) {
		return false;
	}

	// Explicit localhost checks (macOS can report free on 0.0.0.0/:: but fail on ::1:port)
	const localhostV4 = await canListen({ port, host: "127.0.0.1" }, {
		allowUnsupported: true,
	});
	if (!localhostV4) {
		return false;
	}

	const localhostV6 = await canListen(
		{ port, host: "::1" },
		{ allowUnsupported: true }
	);

	return localhostV6 !== false;
};

const findAvailablePort = async (minPort = basePort) => {
	const start = Math.max(basePort, minPort);
	const end = basePort + maxTries;
	for (let port = start; port < end; port += 1) {
		if (await isPortAvailable(port)) {
			return port;
		}
	}

	throw new Error(
		`No available port found from ${start} to ${end - 1}.`
	);
};

const writePortFile = (port) => {
	fs.writeFileSync(portFile, String(port));
};

const cleanupPortFile = () => {
	try {
		fs.unlinkSync(portFile);
	} catch {
		// ignore missing file
	}
};

const MAX_PORT_RETRIES = 5;

const startNext = async (port, attempt = 0) => {
	if (attempt === 0 && port !== basePort) {
		console.log(`Port ${basePort} in use. Using port ${port} instead.`);
	}

	writePortFile(port);

	const nextBin = require.resolve("next/dist/bin/next");
	let stderr = "";

	const child = spawn(
		process.execPath,
		[nextBin, "dev", "--turbopack", "--port", String(port), "--hostname", "localhost"],
		{
			stdio: ["inherit", "inherit", "pipe"],
			env: { ...process.env, PORT: String(port) },
		}
	);

	child.stderr?.on("data", (chunk) => {
		const s = chunk.toString();
		stderr += s;
		process.stderr.write(chunk);
	});

	const forwardSignal = (signal) => {
		child.kill(signal);
	};

	process.on("SIGINT", forwardSignal);
	process.on("SIGTERM", forwardSignal);

	child.on("exit", async (code, signal) => {
		cleanupPortFile();

		if (signal) {
			process.kill(process.pid, signal);
			return;
		}

		const isEaddrInUse =
			code === 1 &&
			(stderr.includes("EADDRINUSE") || stderr.includes("address already in use"));

		const isLockError =
			code === 1 &&
			stderr.includes("Unable to acquire lock");

		if (isEaddrInUse && attempt < MAX_PORT_RETRIES - 1) {
			try {
				const nextPort = await findAvailablePort(port + 1);
				console.log(`Port ${port} failed (address in use). Trying port ${nextPort} instead.`);
				process.removeListener("SIGINT", forwardSignal);
				process.removeListener("SIGTERM", forwardSignal);
				await startNext(nextPort, attempt + 1);
				return;
			} catch (err) {
				console.error(err);
				process.exit(1);
			}
		}

		if (isLockError && attempt < MAX_PORT_RETRIES - 1) {
			try {
				process.removeListener("SIGINT", forwardSignal);
				process.removeListener("SIGTERM", forwardSignal);
				await cleanLockAndRetry(port, attempt + 1);
				return;
			} catch (err) {
				console.error(err);
				process.exit(1);
			}
		}

		process.exit(code ?? 0);
	});
};

const cleanStaleLock = async () => {
	if (!fs.existsSync(lockFile)) {
		return;
	}

	// Check which port to test - use recorded port if available, otherwise base port
	let portToCheck = basePort;
	if (fs.existsSync(portFile)) {
		try {
			const recordedPort = Number.parseInt(fs.readFileSync(portFile, "utf8").trim(), 10);
			if (!Number.isNaN(recordedPort) && recordedPort > 0) {
				portToCheck = recordedPort;
			}
		} catch {
			// Ignore read errors, fall back to base port
		}
	}

	// Check if a process is actually using the port
	const portInUse = !(await isPortAvailable(portToCheck));
	if (portInUse) {
		// Lock is legitimate - a Next.js instance is running
		return;
	}

	// Also check the base port if different
	if (portToCheck !== basePort) {
		const basePortInUse = !(await isPortAvailable(basePort));
		if (basePortInUse) {
			return;
		}
	}

	// Lock exists but no process on port - stale lock
	console.log("Removing stale Next.js lock file from previous run...");
	try {
		fs.unlinkSync(lockFile);
	} catch {
		// Ignore errors (file might have been cleaned up already)
	}
	// Also clean up the stale port file
	cleanupPortFile();
};

const cleanLockAndRetry = async (port, attempt) => {
	console.log("Lock file conflict detected. Cleaning up and retrying...");
	try {
		fs.unlinkSync(lockFile);
	} catch {
		// Ignore
	}
	cleanupPortFile();
	await startNext(port, attempt);
};

const run = async () => {
	await cleanStaleLock();
	const port = await findAvailablePort();
	await startNext(port);
};

run().catch((error) => {
	cleanupPortFile();
	console.error(error);
	process.exit(1);
});
