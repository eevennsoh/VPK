import { setBooleanFeatureFlagResolver } from "@atlaskit/platform-feature-flags";

const PLATFORM_FEATURE_FLAGS_GLOBAL = "__PLATFORM_FEATURE_FLAGS__";

const existingResolver =
	typeof globalThis !== "undefined"
		? (
				globalThis as typeof globalThis & {
					[PLATFORM_FEATURE_FLAGS_GLOBAL]?: { booleanResolver?: unknown };
				}
			)[PLATFORM_FEATURE_FLAGS_GLOBAL]?.booleanResolver
		: undefined;

if (existingResolver === undefined || existingResolver === null) {
	// Prevent feature gate client initialization warnings in local builds.
	setBooleanFeatureFlagResolver(() => false);
}
