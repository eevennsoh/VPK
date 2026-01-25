# Deployment setup

## Summary

- **Must do for local-only:**
  - Step 1 – Local setup (Atlas CLI, Docker not strictly needed unless your local run uses it)
  - Step 2 – Get the prototype code
  - Step 3 – Configure AI Gateway locally (`.env.local`)
  - Step 4 – ASAP (Atlassian Service Authentication Protocol) setup (because AI Gateway auth uses ASAP)
- **Can skip for local-only (no Micros deploy):**
  - Step 5 – Artifactory (Atlassian’s Docker Registry) login
  - Step 6 – Build Docker image
  - Step 7 – Push image
  - Step 8 – Micros stash env vars (Stash your config and secrets from `.env.local` or `.asap-config` from your laptop to Micros)
  - Step 9 – Create Micros service
  - Step 10 – Deploy to Micros
  - Step 11/12 – Micros URL + iteration
  - You only need to care about **Artifactory, Docker images, Micros, stash, service-descriptor.yml** once you want a **persistent Micros URL**.
- Expand for more details
  ### **1. Local setup**
  - Install **Homebrew** (if you don’t already have it).
  - Install **Atlas CLI**:
    - `brew tap atlassian/tap`
    - `brew install atlassian/tap/atlas`
  - Install **Docker Desktop** and make sure it’s running.
  ### **2. Get / prepare the prototype code**
  - Clone or download the prototype repo to your machine.
  - `cd` into the project root (where `backend/` and `service-descriptor.yml` live).
  ### **3. Configure AI Gateway locally**
  - Register / get an **AI Gateway use case ID**.
  - Create `.env.local` with values like:
    - `AI_GATEWAY_URL`
    - `AI_GATEWAY_USE_CASE_ID`
    - `AI_GATEWAY_CLOUD_ID`
    - `AI_GATEWAY_USER_ID`
  - Run locally (e.g. `npm run dev` / `npm run start`) to confirm the AI calls work.
  Relevant AI Gateway + ASAP refs:
  - [HOWTO: CCP API Gateway Auth - Setting Up SLAuth, ASAP and UCT](https://hello.atlassian.net/wiki/spaces/~63be703a0a1b5442166a9426/pages/2673868823/HOWTO+CCP+API+Gateway+Auth+-+Setting+Up+SLAuth+ASAP+and+UCT)
  - [Generate ASAP Token](https://hello.atlassian.net/wiki/spaces/MEXTemporary/pages/4434119489/Generate+ASAP+Token)
  ### **4. Set up ASAP keys (auth to AI Gateway)**
  - Use **Atlas CLI** to generate an ASAP keypair + config:
    - e.g. `atlas asap key generate ... -f .asap-config`
  - Save the ASAP key to keyserver, tied to your prototype service.
  - Test generating an ASAP token locally:
    - `atlas asap token -a ai-gateway --config .asap-config`
  - Use that token in `curl` to AI Gateway to confirm it works.
  More on ASAP:
  - [ASAP & SLAuth CLI Reference](https://hello.atlassian.net/wiki/spaces/~349911239/pages/6088600652/ASAP+SLAuth+CLI+Reference)
  - [Middleman - ASAP token and AI Gateway](https://hello.atlassian.net/wiki/spaces/~ometelytsia/pages/6016891221/Middleman+-+ASAP+token+and+AI+Gateway)
  ### **5. Log in to Artifactory Docker registry**
  - Go to [https://packages.atlassian.com](https://packages.atlassian.com/) and generate an **Identity Token** (API key).
  - In your terminal:
    - `docker login docker.atl-paas.net`
      - Username: your StaffID
      - Password: the Identity Token
  - This lets you **push** images to `docker.atl-paas.net`.
  Artifactory & Micros background:
  - [Artifactory And Micros](https://hello.atlassian.net/wiki/spaces/BEART/pages/1310861568/Artifactory+And+Micros)
  - [RFC - Decoupling Artifactory And Micros](https://hello.atlassian.net/wiki/spaces/BEART/pages/1827520723/RFC+-+Decoupling+Artifactory+And+Micros)
  ### **6. Build Docker image**
  - Set variables:
    - `SERVICE_NAME=your-service-name`
    - `VERSION=1.0.1` (or whatever version tag you want)
  - Run build:
  ```markdown
  docker buildx build --platform linux/amd64 \
   --no-cache \
   -t docker.atl-paas.net/$SERVICE_NAME:app-${VERSION} \
   -f backend/Dockerfile . --load
  ```
  ### **7. Push Docker image to Artifactory**
  - Push the built image:`docker push docker.atl-paas.net/$SERVICE_NAME:app-${VERSION}`
  - This makes the image available for Micros to pull.
  ### **8. Set env vars & ASAP key in Micros stash (prod env)**
  - Choose Micros env:
    - `ENV=pdev-west2`
  - Set AI Gateway env vars in Micros:
    ```markdown
    atlas micros stash set -s $SERVICE_NAME -e $ENV -k AI_GATEWAY_URL -v "<your URL>"
    atlas micros stash set -s $SERVICE_NAME -e $ENV -k AI_GATEWAY_USE_CASE_ID -v "<your use case ID>"
    atlas micros stash set -s $SERVICE_NAME -e $ENV -k AI_GATEWAY_CLOUD_ID -v "local-testing"
    atlas micros stash set -s $SERVICE_NAME -e $ENV -k AI_GATEWAY_USER_ID -v "your-email@atlassian.com"
    ```
  - Add ASAP private key via temporary JSON file:
  ```markdown
  cat > /tmp/stash_vars.json << 'EOF'
  {
  "ASAP_PRIVATE_KEY": "-----BEGIN RSA PRIVATE KEY-----\n...your key...\n-----END RSA PRIVATE KEY-----"
  }
  EOF

  atlas micros stash set -s $SERVICE_NAME -e $ENV -f /tmp/stash_vars.json
  rm /tmp/stash_vars.json
  ```
  ***
  ### **9. Create the Micros service (if not auto‑created)**
  - (Skip if stash already auto‑created it.)
  - Explicitly create service:`atlas micros service create --service=$SERVICE_NAME --no-sd`
  ***
  ### **10. Deploy to Micros**
  - Ensure `VERSION` is exported:`export VERSION=1.0.1`
  - Deploy using your `service-descriptor.yml`:
  ```markdown
  atlas micros service deploy \
   --service=$SERVICE_NAME \
   --env=pdev-west2 \
   --file=service-descriptor.yml
  ```

  - First deploy takes ~10–15 min (provision infra, wire networking, start container).
  ***
  ### **11. Get the live URL & test**
  - Show service details:`atlas micros service show --service=$SERVICE_NAME --env=pdev-west2`
  - Copy the URL from the output (e.g. `https://$SERVICE_NAME.us-west-2.platdev.atl-paas.net`).
  - Open in browser, run through your prototype, confirm AI interactions work.
  ***
  ### **12. Iterate (new versions)**
  Each iteration:
  - Bump `VERSION` (e.g. `1.0.2`).
  - Re‑build:`docker buildx build ... -t docker.atl-paas.net/$SERVICE_NAME:app-${VERSION} ... --load`
  - Re‑push:`docker push docker.atl-paas.net/$SERVICE_NAME:app-${VERSION}`
  - Re‑deploy:
  ```markdown
  export VERSION=1.0.2
  atlas micros service deploy --service=$SERVICE_NAME --env=pdev-west2 --file=service-descriptor.yml
  ```

## Details

- Expand for more details
  ### Artifactory account
  1. https://packages.atlassian.com/ui/packages
  2. Artifactory is our internal artifact repository (e.g., for npm, Maven, Docker images) behind domains like `packages.atlassian.com` and `docker.atl-paas.net`
  3. An **Artifactory account** here is a credential (user or bot) that:
     1. Authenticates to Artifactory
     2. Has permissions to **push/pull artifacts** (packages, Docker images, build outputs)
  4. When you “deploy to Micros”, you’re really doing this:
     1. **Build a Docker image for your prototype**
     2. **Push that image to Atlassian’s Docker registry**
     3. **Tell Micros to run that image**
     4. The key piece: **Atlassian’s Docker registry _is_ Artifactory**, behind the hostname `docker.atl-paas.net`.
     5. **Micros only pulls images from Artifactory**
     6. When you run `atlas micros service deploy ...`, Micros goes to **Artifactory** to fetch that image.
  ```markdown
  image: docker.atl-paas.net/YOUR-SERVICE-NAME:app-1.0.1
  ```

  - To push Docker images to Artifactory (Atlassian’s Docker Registry), you will need to get your API key.
    - Visit https://packages.atlassian.com/
    - Click your profile → "Edit Profile"
    - Generate an Identity Token
  - Your Docker’s login staffID is your username (eg: esoh)
  - https://hello.atlassian.net/wiki/spaces/20c1e96f156749a6bcba84acd584dddf/pages/778592318
  ### Docker Desktop
  - https://hello.atlassian.net/wiki/spaces/MICROS/pages/693843069
  - Install Docker Desktop
  - `docker --version` to check if installed
  - buildx is already included and enabled by default when installed Docker Desktop
    - required for multi-platform builds
  - `docker buildx version`
  - Authenticate with Docker Registry
    - `docker login docker.atl-pass.net`
    - Username: esoh
    - Pass: API key from https://packages.atlassian.com/ (Atlassian’s Docker Registry, Artifactory)
  ### Atlas CLI
  1. Atlas CLI is the tool that talks to Atlassian’s internal infra for you.
     1. A way to **create and deploy** the Micros service
     2. A way to **stash env vars and secrets** used by the running prototype
     3. A simple way to **generate ASAP keys** for AI Gateway
  2. Install Atlas CLI doing the following:
     1. `brew tap atlassian/tap`
        1. `brew tap` is a built-in Homebrew command
           1. tap = add a new formula repository
           2. tells Homebrew: “add Atlassian’s formula repo so I can install `atlas` and other tools.”
        2. They’re just **filesystem paths inside our internal dev environment**
        3. A **top‑level directory / project area** in our internal tooling setup
        4. Used as a home for **TAP (Tooling / Atlassian Platform) related code and tools** – e.g. internal tooling experiments, platform demos, etc.
     2. `brew install atlassian/tap/atlas`
        1. That’s just a **subfolder** under that project:
           - `atlassian/tap` → the overall internal tooling / TAP project
           - `atlassian/tap/atlas` → **the bit in that project that contains the Atlas‑related prototype code and config**
     3. `atlas --version`
  3. **Authenticate you to Atlassian infra**
     1. `atlas auth login` → proves “this is Ee Venn” to our internal services.
  4. **Manage AI Gateway / ASAP credentials**
     1. `atlas asap key generate` → creates the keypair and `.asap-config` the prototype uses to call AI Gateway.
     - `atlas asap token` → generates tokens so your prototype can call models via AI Gateway.
  5. **Deploy & configure your Micros service**
     1. `atlas micros service create` → registers your service in Micros.
     2. `atlas micros stash set ...` → stores environment variables / secrets (AI_GATEWAY_URL, use case ID, ASAP key, etc.) for your service in `pdev-west2`.
     3. `atlas micros service deploy ...` → actually deploys the Docker image you built to Micros and wires everything up.
  ### ASAP (Atlassian Service Authentication Protocol)
  - It’s Atlassian’s **service‑to‑service auth system**.
    - `.asap-config` – stored on your machine, holds the keypair and metadata for “your prototype as a calling service”.
    - **ASAP token** – short‑lived JWTs generated from that config with `atlas asap token`, used to call **AI Gateway**.
    - **ASAP (the protocol)** – the whole mechanism Atlassian uses for service‑to‑service auth, so AI Gateway can safely trust calls coming from your Micros service.
  - Services prove “I am X talking to Y” by sending a **signed JWT** (ASAP token) in the `Authorization: Bearer …` header.
  - This is used everywhere internally (Micros, AI Gateway, Jira, Search, Media API, etc.).
  - ASAP is how your Micros‑hosted service is allowed to call **AI Gateway**.
  - Atlas CLI creates **a local config file** – conventionally called `.asap-config`
    - `.asap-config` = **the local key + metadata** needed to mint ASAP tokens.
  ```markdown
  {
  "kid": "micros/my-service/test-key",
  "issuer": "micros/my-service",
  "audience": [ ... ],
  "expiry": 3600,
  "privateKey": "-----BEGIN RSA PRIVATE KEY----- ...",
  "publicKey": "-----BEGIN PUBLIC KEY----- ..."
  }
  ```

  - `atlas asap token`
    - Reads your `.asap-config` (private key, issuer, etc.).
    - Creates a **JWT token** signed with that key.
    - That JWT is the **ASAP token**.
    - **ASAP token** = “I am service X, allowed to talk to audience Y, right now.”
    - AI Gateway uses that to authenticate and authorise your prototype’s backend calls.
  ### Set environment variables for your deployed app
  - Your deployed app needs access to AI Gateway.
    - “For my deployed Micros service, set these environment variables so the backend can call AI Gateway just like it did locally.”
    - Config and secrets are **not** read from `.env.local` or `.asap-config` on your laptop.
    - They come from **Micros stash** → which shows up as **environment variables** inside the running container.
  - **Telling Micros what AI config your _production_ service should use**
  - **Uploading your ASAP private key so the deployed service can authenticate to AI Gateway**
  - When you run locally, your `.env.local` and `.asap-config` files live on your laptop and Next.js reads them directly.
  - When you deploy to Micros, **that machine does not have your local files**, so you have to push those values into Micros’ config store (“stash”).
  **1) Setting AI Gateway env vars in Micros (“stash”)**
  ```markdown
  ENV=pdev-west2
  SERVICE_NAME=your-service-name
  ```
  ```markdown
  atlas micros stash set -s $SERVICE_NAME -e $ENV \
   -k AI_GATEWAY_URL \
   -v "https://ai-gateway.us-east-1.staging.atl-paas.net/v1/bedrock/model/anthropic.claude-3-5-sonnet-20241022-v2:0/invoke"

  atlas micros stash set -s $SERVICE_NAME -e $ENV \
   -k AI_GATEWAY_USE_CASE_ID \
   -v "YOUR-USE-CASE-ID"

  atlas micros stash set -s $SERVICE_NAME -e $ENV \
   -k AI_GATEWAY_CLOUD_ID \
   -v "local-testing"

  atlas micros stash set -s $SERVICE_NAME -e $ENV \
   -k AI_GATEWAY_USER_ID \
   -v "your-email@atlassian.com"
  ```

  - `AI_GATEWAY_URL` – which model endpoint to call
  - `AI_GATEWAY_USE_CASE_ID` – your registered AI Gateway use case
  - `AI_GATEWAY_CLOUD_ID` – the cloud id the backend sends (here `local-testing`)
  - `AI_GATEWAY_USER_ID` – your Atlassian identity the backend sends
  1. **Uploading your ASAP private key securely**
     1. Use the private key from YOUR `.asap-config` file that you generated with `atlas asap key generate`.
  ```markdown
  # Create temporary JSON file with your ASAP key

  cat > /tmp/stash_vars.json << 'EOF'
  {
  "ASAP_PRIVATE_KEY": "-----BEGIN RSA PRIVATE KEY-----\nYOUR_KEY_HERE\n-----END RSA PRIVATE KEY-----"
  }
  EOF

  # Upload to SSM

  atlas micros stash set -s $SERVICE_NAME -e $ENV -f /tmp/stash_vars.json

  # Clean up

  rm /tmp/stash_vars.json
  ```
  This is needed because:
  - Your app in Micros must **mint ASAP tokens** to talk to AI Gateway.
  - To do that it needs the **private key** from your `.asap-config`.
  - You can’t paste a multi‑line private key directly on the CLI easily, so:
    - You put it into a small JSON file
    - `atlas micros stash set ... -f /tmp/stash_vars.json` uploads it to Micros stash
    - Micros then exposes it to the container as `ASAP_PRIVATE_KEY`
    - The backend code reads that env var and uses it to sign ASAP tokens.
  ### Build Docker image
  - Takes 3-5 minutes.
  - Building Next.js app
  - Creating Docker container
  - Optimizing for production
  ```markdown
  VERSION=1.0.1
  SERVICE_NAME=your-service-name # Replace with your service name
  docker buildx build --platform linux/amd64 \
   --no-cache \
   -t docker.atl-paas.net/$SERVICE_NAME:app-${VERSION} \
   -f backend/Dockerfile . --load
  ```

  - `docker buildx build`
    - Uses **BuildKit / buildx** (newer, faster builder) instead of the older `docker build`.
    - Needed for multi‑platform images and better caching.
  - `backend/Dockerfile`
    - Path to the Dockerfile to use (in your repo’s `backend/` folder).
  - `.`
    - The **build context**: everything in the current directory is sent to the Docker daemon so it can COPY files into the image.
  - `-platform linux/amd64`
    - Force‑build for **Linux, x86_64**.
    - Micros runs on Linux amd64; this makes sure the image is compatible even if you’re on an M‑series Mac (arm64).
  - `-no-cache`
    - Ignore any existing build cache.
    - Forces Docker to rebuild all layers from scratch (useful when you want to avoid weird “it’s using old code” issues).
  - `t` = **tag** the resulting image with a name:
    - Registry: `docker.atl-paas.net` (Artifactory Docker registry)
    - Repo: `$SERVICE_NAME`
    - Tag: `app-${VERSION}` (e.g. `app-1.0.1`)
  - This is the exact name Micros will later use in `service-descriptor.yml`.
  - `f backend/Dockerfile`
    - Tell Docker to use a **non‑default Dockerfile** (the default would be `./Dockerfile`).
    - Here we explicitly point at `backend/Dockerfile`.
  - `-load`
    - After building with buildx, **load the image into your local Docker daemon**.
    - Without `-load`, buildx might only store it in a separate builder cache; with `-load`, you can then do:
  ```markdown
  docker images | grep $SERVICE_NAME
  docker push docker.atl-paas.net/$SERVICE_NAME:app-${VERSION}
  ```
  A **daemon** is a program that:
  - runs **in the background**
  - is **not interactive**
  - **not remote**
  - usually **starts automatically**
  - provides a service
  ### Push to Atlassian’s Docker Registry (Artifactory)
  - Takes 2-3 minutes.
  ```markdown
  docker push docker.atl-paas.net/$SERVICE_NAME:app-${VERSION}
  ```
  ### Create service and deploy to Micros
  - `atlas micros service create --service=$SERVICE_NAME --no-sd`
    - **Registers your prototype as a Micros service**
      - Tells Micros: “There is a service called `$SERVICE_NAME` that I want to be able to deploy in `pdev-west2`.”
      - After this exists, you can:
        - attach env vars (stash)
        - deploy images
        - look it up with `atlas micros service show`.
    - **Skips the interactive “service descriptor” wizard**
      - `--no-sd` = “don’t open the interactive flow, I already have my own `service-descriptor.yml`”.
      - Without `--no-sd`, Atlas would try to generate a `<service-name>.sd.yml` for you.
  - If you already set environment variables, the service was created then. You can skip the service creation above.
    - That’s because some `atlas micros stash set` calls will auto‑create the service if it doesn’t exist yet. Step 8 is just making sure the service definitely exists before deployment.
  - Deploy your built Docker image to Micros
  ```markdown
  export VERSION=1.0.1

  atlas micros service deploy \
   --service=$SERVICE_NAME \
   --env=pdev-west2 \
   --file=service-descriptor.yml
  ```

  - `atlas micros service deploy`
    - Reads your `service-descriptor.yml` and:
      - **Finds the Docker image** you pushed (e.g. `docker.atl-paas.net/$SERVICE_NAME:app-1.0.1`)
      - **Allocates infrastructure** in Micros:
        - EC2 instance / task
        - networking + security groups
        - health checks
      - **Injects environment variables** from stash (Step 5):
        - `AI_GATEWAY_URL`
        - `AI_GATEWAY_USE_CASE_ID`
        - `AI_GATEWAY_CLOUD_ID`
        - `AI_GATEWAY_USER_ID`
        - `ASAP_PRIVATE_KEY`
      - **Starts your container** using those settings.
  - The future deployments are much faster (hot swap, **remove or replace a component while the system is still running** — **no shutdown, no restart)**
  ```markdown
  export VERSION=1.0.2

  # build + push a new image with that version

  atlas micros service deploy --service=$SERVICE_NAME --env=pdev-west2 --file=service-descriptor.yml
  ```
  ### Verify deployment
  - Get your service URL:
  `atlas micros service show --service=$SERVICE_NAME --env=pdev-west2`
  - Test health endpoint (replace with your actual service name):
  `curl https://$SERVICE_NAME.us-west-2.platdev.atl-paas.net/api/health`
