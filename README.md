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
