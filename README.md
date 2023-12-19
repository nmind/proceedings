# NMIND

This repo houses the code for the search-portal and details-pages of NMIND'S ongoing evaluations of different neuroimaging tools, provisionally to be hosted at `nmind.org/proceedings`.

## Dependencies

It uses SvelteKit to generate a static site for hosting on e.g. GitHub Pages, Netlify, Vercel, S3, etc. Examples of how its filesystem-based routing works can be found at the [canonical Svelte Tutorial](https://learn.svelte.dev/tutorial/layouts), on various [~commercial/educational blogs](https://egghead.io/blog/learn-sveltekit-part-2-routing-in-sveltekit), or by querying your friendly local LLM.

For linting and formatting, it uses the default `eslint` and `prettier` configs offered by SvelteKit. TypeScript is enabled, with most types and interfaces listed in `src/lib/types.ts`.

For styling, it uses [TailwindCSS](https://tailwindcss.com/) for syntax/preprocessing and [DaisyUI](https://daisyui.com/) as the component primitives.

For testing, it uses (SvelteKit's built-in) Vitest as the test runner, and `@testing-library/svelte` plus `jsdom` for simulating browser/DOM interactions.

The list of VSCode extensions used during initial development include:

```
bradlc.vscode-tailwindcss
dbaeumer.vscode-eslint
eamodio.gitlens
esbenp.prettier-vscode
pflannery.vscode-versionlens
svelte.svelte-vscode
```

## Developing

Once you've pulled down the repo with e.g. `git clone` and installed dependencies with `npm install`, start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

NB while this includes [HMR](https://vitejs.dev/guide/why.html#slow-updates) out-of-the-box via Vite, the actual data-processing runs in a separate script, `src/lib/data/concatenate_data.js`, before the dev server starts (see the `"scripts"` key in `package.json` for details.)

As such, changes to the underlying JSON file will only be registered on process restart (i.e. `ctrl`+`c` followed by `npm run dev`).

## Testing

Before running the unit-test suite, first call `npm run build_test_fixtures` (this is a variant of the `concatenate_data.js` that pulls data from `tests/fixtures` rather than `src/lib/data`). As with the dev server, you'll need to run this script each time you make changes to the underlying fixture-data JSON files.

To run all tests: `npm run test`. NB this will automatically enter "watch mode" (in which tests in a given file are rerun when that file's code -- or the code of any of its dependencies -- changes.)

## Building

To create a production version of your app: `npm run build`.

You can preview the production build locally with `npm run preview`.

## Deploying

As of commit `cb5ba79d7fc9752f5a556f111a95db3e2a9ad56e` (2023.11.15), the contents of `src/lib/data` and `tests/fixtures` are identical; however, it's expected that former will be entirely replaced (_with accurate data_) while the latter will remain static (_to prevent spurious regressions in the test suite_) before production deploy.

Hosting has thus far been limited solely to S3, following the steps of [AWS' online documentation](https://docs.aws.amazon.com/AmazonS3/latest/userguide/WebsiteHosting.html). S3's specific filehosting implementation required the non-default `"always"` option for [handling trailing slashes](https://learn.svelte.dev/tutorial/trailingslash), visible in `src/routes/+layout.js`; this can likely be reset to (_the default_) `"never"` option if a different hosting provider is used.

## Hosting I: Configuring GitHub Pages

(_Full disclosure: Y Sussman, the [ETI liason dev](https://eti.umn.edu/), has not tested this in production. If you encounter any issues following these steps, he's happy to jump on a call to troubleshoot! Contact him at sussm068@umn.edu_)

To map the `https://www.nmind.org/proceedings` path to the static site generated by `https://github.com/nmind/proceedings`, follow these steps:

1. **Enable GitHub Pages**:
   - Go to the `Settings` tab of the `nmind/proceedings` repository.
   - Go to the `Pages` sidebar tab.
   - Enable GitHub Pages by selecting a source branch (either `development` or a new, single-purpose branch titled e.g. `master`, `main`, `gh-pages`, etc).

2. **Configure the Publishing Source**:
   - You can [choose to publish](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site) from either a specific branch or a custom GitHub Actions workflow.
   - [Integration with GitHub Actions](#integrating-with-github-actions) is discussed in a larger section below; for the purpose of this task, it's fine to leave `Source` set to the default `Deploy from a branch`.

3. **Set Up Custom Domain (Possibly Superfluous)**:
   - Navigate to your domain provider's settings.
   - Set the DNS records for your domain to point to the GitHub Pages server (I'm almost certain this has already been done for the [main NMIND repo](https://github.com/nmind/nmind.github.io)).
   - The typical setup includes adding A records pointing to GitHub's IPs (`185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`, at last check) and a CNAME record for the `www` subdomain to point to your GitHub Pages URL (`nmind.github.io`).

4. **Configure Repository Settings for Custom Domain (Possibly Superfluous)**:
   - In the repository settings under GitHub Pages, set the custom domain.
   - Enable HTTPS to ensure your site is securely served.
   - As with step three, I believe both steps were performed months ago; more details can be found on the [GitHub Pages documentation](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site).

5. **Backup: Redirect from Old Pages to New Repository**:
   - In the `nmind.github.io` repository, you might need to set up a redirect from `https://www.nmind.org/proceedings` to the new GitHub Pages site as a fallback.
   - (That is, this step and its children can be postponed until after the DNS changes have fully propagated; first confirm that users are not being served the new `/proceedings` page on navigation to `nmind.org/proceedings`)
   - This can be done using HTML `meta` redirects in the old `/proceedings` page (which I believe to be [here](https://github.com/nmind/nmind.github.io/blob/main/proceedings.md)), specifically:

    a. **Add a Basic Redirect**:
    - Put the following tag inside the `<head>` section of the `/proceedings` page.
    ```html
    <meta http-equiv="refresh" content="0; URL='https://nmind.github.io/proceedings'" />
    ```
    - `content="0` sets the time delay before the redirect (in seconds), while `URL='[new-url]'` specifies the destination.

    b. **Add a Fallback Message (Optional)**:
      - In case the redirect doesn't work (e.g., if the visitor has disabled `meta` redirects in their browser... it does happen!), you can also provide a manual link in the main `nmind.github.io` repo's `/proceedings` page.
      - e.g. something like:
        ```html
        <html>
          <head>
            <meta http-equiv="refresh" content="0; URL='https://nmind.github.io/proceedings'" />
          </head>
          <body>
            If you are not redirected automatically, follow this <a href='https://nmind.github.io/proceedings'>link to NMIND's new, interactive Proceedings page</a>.
          </body>
        </html>
        ```

    c. **Eventually Remove `a.` and `b.` above**:
      - `meta` refresh tags are purely client-side, and thus don't technically emit an  HTTP status code (like `301 Moved Permanently`).
      - As such, they can sometimes be poorly interpreted by search engines.
      - I don't anticipate this being a very large problem (this isn't e.g. competing with Shopify or Squarespace websites for e-commerce... thank god), but if the above changes end up being needed, I do recommend eventually removing them after a month or two.

For more detailed instructions and troubleshooting, almost all of the above was taken from GitHub's official documentation on [Creating a GitHub Pages site](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site) and [Configuring a publishing source for your GitHub Pages site](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site). (And you're welcome to contact Y Sussman for further collaboration!)

## Hosting II: Integrating With Github Actions

(_Full disclosure: Y Sussman, the [ETI liason dev](https://eti.umn.edu/), has not tested this in production. If you encounter any issues following these steps, he's happy to jump on a call to troubleshoot! Contact him at sussm068@umn.edu_)

To set up a GitHub Action for automatically building and redeploying your site on GitHub Pages every time a change is pushed to the `development` (or any other) branch of the `https://github.com/nmind/proceedings` repository, follow these steps:

1. **Create a GitHub Actions Workflow File**:
   - Inside the `nmind/proceedings` repository, create a new directory called `.github/workflows`
   - Inside it, create an e.g. `deploy.yml` YAML file (the filename itself is arbitrary).

2. **Define the Workflow**:
   - Specify the workflow to run on pushes to the `development` branch:
     ```yaml
     name: Build and Deploy
     on:
       push:
         branches:
           - development
     ```

3. **Set up the Environment**:
   - Add steps to check out the repository and set up the Node environment:
     ```yaml
     jobs:
       build-and-deploy:
         runs-on: ubuntu-latest
         steps:
           - name: Checkout
             uses: actions/checkout@v2
           - name: Set up Node
             uses: actions/setup-node@v1
             with:
               node-version: '18.x' # v18.16.1 was used during initial development; once fully set up, this should sometime in 2024 be updated to '20.x'
     ```
   - Add steps to install dependencies and build the project:
     ```yaml
       - name: Install and Build
         run: |
           npm install
           npm run build
     ```

4. **Deploy to GitHub Pages**:
    - Use GitHub's `actions/deploy-pages@v3` to deploy the built site to the e.g. `gh-pages` branch:
      ```yaml
          - name: Deploy to GitHub Pages
            uses: actions/deploy-pages@v3
      ```
    - NB there are several additional options available, e.g. `workflow_dispatch` to enable manual invocations from the browser UI, or `concurrency` to set behavior when multiple pushes are made.
    - For more such options, see the [generic static-site "Starter Workflow" GitHub Action](https://github.com/actions/starter-workflows/blob/main/pages/static.yml) from which this was adapted.

5. **Commit and Push the Workflow File**:
   - Commit the new `deploy.yml` file to your repository and push the changes to GitHub. It should look something like this: 
    ```yaml
    name: Build and Deploy NMIND Proceedings to GitHub Pages

    on:
      push:
        branches:
          - development

    jobs:
      build-and-deploy:
        runs-on: ubuntu-latest

        steps:
          - name: Checkout
            uses: actions/checkout@v2

          - name: Set up Node
            uses: actions/setup-node@v1
            with:
              node-version: '18.x'

          - name: Install dependencies
            run: npm install

          - name: Build
            run: npm run build

          - name: Deploy to GitHub Pages
            uses: actions/deploy-pages@v3
    ```
   - GitHub Actions will automatically recognize the workflow file and start running it based on the defined trigger (pushes to the `development` branch).
   - You can use the `Actions` tab in the `https://github.com/nmind/proceedings` repository to monitor the workflow's runs. 

For more detailed information, you can refer to the [GitHub Actions documentation](https://docs.github.com/en/actions), especially the [usage of Starter Workflows](https://docs.github.com/en/actions/learn-github-actions/using-starter-workflows). (And you're welcome to contact Y Sussman for further collaboration!)

