# Releasing @msiccdev/ai-context-kit

The package is published by `.github/workflows/release.yml` with npm trusted publishing: no npm token is stored anywhere. Every push to `main` runs it, and it publishes `installer/package.json`'s version when that version is not on npm yet. A pre-release version (for example `2.1.0-beta.1`) goes to the `next` dist-tag, any other version to `latest`. Provenance is added automatically.

## One-time setup

Do these in order. npm only lets you add a trusted publisher to a package that already exists, so the first version is published by hand.

1. **GitHub environment.** In the repository settings, under Environments, create `npm`. Under Deployment branches and tags, allow only `main`.
2. **First publish, by hand.** On the approved `release/2.0.0` branch, before merging it, publish from your own machine with Node.js 22.12 or later (the npm that comes with it is enough; the npm 11.5.1 minimum applies only to trusted publishing in the workflow). Log in as an owner of the `@msiccdev` organisation, then from `installer/`:
   ```bash
   npm ci
   ```
   ```bash
   npm login
   ```
   ```bash
   npm publish --access public
   ```
   `prepack` builds the package first. npm asks for your two-factor code; if it fails with "OTP required" instead, add `--otp <code>` from your authenticator app. `npm view @msiccdev/ai-context-kit version` then prints `2.0.0`.
3. **Trusted publisher.** On npmjs.com, open the package, then Settings, Trusted publishing, and add GitHub Actions with these values (all case-sensitive):
   - Organization or user: `MSiccDev`
   - Repository: `ai-context-kit`
   - Workflow filename: `release.yml`
   - Environment name: `npm`
4. **Lock it down.** In the package's Settings, under Publishing access, choose "Require two-factor authentication and disallow tokens".
5. Merge `release/2.0.0`. The workflow on `main` finds 2.0.0 on npm and publishes nothing.

If `release/2.0.0` was merged before step 2, the `publish` job fails because no trusted publisher exists yet. Do steps 2 to 4, then re-run the failed job.

## Every later release

1. On `release/<version>`, set the version in every manifest: `npm version <version> --no-git-tag-version` in `installer/` (it updates `package.json` and `package-lock.json`), the three plugin manifests, and the `CHANGELOG.md` heading. `scripts/check-version-sync.sh` fails until they all agree.
2. On the pull request, the Release workflow's `verify` job runs the dry run and shows the dist-tag it would use.
3. Merge into `main`. The `publish` job publishes the new version.
