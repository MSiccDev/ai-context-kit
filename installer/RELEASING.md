# Releasing @msiccdev/ai-context-kit

The package is published by `.github/workflows/release.yml` with npm trusted publishing: no npm token is stored anywhere. Every push to `main` runs it, and it stages `installer/package.json`'s version with `npm stage publish` when that version is not on npm yet. A pre-release version (for example `2.1.0-beta.1`) goes to the `next` dist-tag, any other version to `latest`. Provenance is added automatically.

The package uses staged publishing: a release lands in npm's staging area, and a maintainer approves it with their second factor before it becomes public.

Commands that need npm 11.15.0 or later (`npm trust`, `npm stage`) run with Node 22 through `npx -y npm@11 <command>`.

## One-time setup (done for 2.0.0)

1. **GitHub environment.** In the repository settings, under Environments, create `npm`. Under Deployment branches and tags, allow only `main`.
2. **First publish, by hand.** npm only lets you add a trusted publisher to a package that already exists. On the approved release branch, before merging it, publish from your own machine with Node.js 22.12 or later, logged in as an owner of the `@msiccdev` organisation. From `installer/`:
   ```bash
   npm ci
   ```
   ```bash
   npm login
   ```
   ```bash
   npm publish --access public
   ```
   `prepack` builds the package first. With a passkey or security key, `npm login` and the publish confirm your second factor in the browser (npm prints an "Authenticate your account at" link). With an authenticator app, add `--otp <code>` if npm reports "OTP required".

   npm may stage the first version instead of publishing it: npmjs.com then shows only a placeholder, `0.0.0-stage`. Approve it as in [Approve a staged version](#approve-a-staged-version). The `0.0.0-stage` placeholder stays listed; `latest` points to the approved version.
3. **Lock it down.** In the package's Settings, under Publishing access, choose "Require two-factor authentication and disallow tokens".

## Every release

1. **Versions.** On `release/<version>`, set the version in every manifest: `npm version <version> --no-git-tag-version` in `installer/` (it updates `package.json` and `package-lock.json`), the three plugin manifests, and the `CHANGELOG.md` heading. `scripts/check-version-sync.sh` fails until they all agree. On the pull request, the Release workflow's `verify` job runs the dry run and shows the dist-tag it would use.
2. **Trusted publisher, within 2 days of the merge.** A new trusted-publisher entry must be used for a successful publish within 2 days, or it expires and has to be deleted and created again. So create it when the release is approved, not earlier. Check what exists:
   ```bash
   npx -y npm@11 trust list @msiccdev/ai-context-kit
   ```
   Delete an expired or wrong entry on npmjs.com, or with `npx -y npm@11 trust revoke --id <id> @msiccdev/ai-context-kit`. Then, on npmjs.com, open the package, Settings, Trusted publishing, and add GitHub Actions with these values (all case-sensitive; the owner is `MSiccDev`, not `msiccdev`):
   - Organization or user: `MSiccDev`
   - Repository: `ai-context-kit`
   - Workflow filename: `release.yml`
   - Environment name: `npm`
   - Allowed actions: `npm stage publish` only. Leave "Allow npm publish" unchecked, as npm recommends.

   The entry shows "Pending validation" until the first publish through it succeeds.
3. **Merge into `main`.** The `publish` job stages the new version.
4. **Approve it**, as below. `npm view @msiccdev/ai-context-kit version` then prints the new version, and the trusted-publisher entry shows as validated.

If the `publish` job fails because the entry expired or does not match, fix the entry (step 2) and re-run the failed job.

## Approve a staged version

On npmjs.com, open the package's **Staged Packages** tab, check the version and its tag, and choose **Approve**; npm asks for your second factor. From the CLI:
```bash
npx -y npm@11 stage list @msiccdev/ai-context-kit
```
```bash
npx -y npm@11 stage approve <stage-id>
```
A staged version's tag cannot be changed. For a wrong tag, reject it with `npx -y npm@11 stage reject <stage-id>` and publish again.
