# A3EM Project Website

Static website for the A3EM (Animal-Borne Adaptive Acoustic Environmental
Monitoring) project, an NSF-sponsored Cyber-Physical Systems research effort
led by Vanderbilt University and Colorado State University.

No build step is required — it's plain HTML, CSS, and JavaScript.

## Preview locally

```
make serve
```

then open http://localhost:8000. Or run any static file server (e.g.
`python3 -m http.server`) from this directory.

## Deploying to GitHub Pages

1. Push this repository to GitHub.
2. In the repo settings, under **Pages**, set the source to the branch
   containing this site (e.g. `main`) and the root directory.
3. The included `.nojekyll` file tells GitHub Pages to serve the files as-is,
   without running them through Jekyll.

## Structure

- `index.html`, `research.html`, `deployments.html`, `publications.html`,
  `team.html`, `education.html`, `code.html` — site pages
- `assets/css/style.css` — shared styles
- `assets/js/main.js` — mobile navigation toggle
- `assets/img/favicon.svg` — site icon

## Updating content

Page content is sourced from the project's NSF annual reports and the
[vu-a3em](https://github.com/vu-a3em) GitHub organization. When new reports
or repositories are published, update the relevant page(s) directly — there
is no templating layer.
