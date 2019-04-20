# Drawbotics Icons

Collection of icons as SVG, which are then used to generate the icon font to be used in Drawbotics projects.

This package shouldn't be used on its own, although it can be. The icons should come with the version of the Drawbotics design system that you decided to use for your project, e.g. `react` or `vanilla`.

This icon set is a superset of [feather icons](https://github.com/feathericons/feather), with additional custom icons created for business usage (e.g. products).

## Development
This package uses [webfont](https://github.com/itgalaxy/webfont) to generate the icon font from the svg of the icons. You also need to set the following environment variables at the root of the monorepo project i.e. at `drylus/.env`.
```
AWS_SECRET_KEY=
AWS_ACCESS_KEY=
```

In the `icons` folder you have the SVG for each icon. The font is also synced with the Drawbotics CDN on amazon s3.

To try out new icons (while developing) you run the following
```
npm run build:dev
```
This will generate new icon fonts and push them to the `dev` folder on the CDN. Since `react-drylus` uses the fonts directly, while developing you will have access to the `dev` version. If you're bundling the `react-drylus` package for production, the latest version of the icons will be used instead. See the docs in the `react-drylus` package for more info.

To build the icon fonts for a new production version run
```
npm run build
```
**NOTE** don't forget to bump the version, otherwise the CDN sync will not work, since you're trying to push to an existing production version.
