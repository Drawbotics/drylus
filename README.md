# Drylus - Drawbotics Styles Library


### Usage
Note: this is a monorepo, meaning all the code is divided into packages (`/packages`). All packages are dependencies of each other meaning the code can be shared between them. To manage the packages we use [Lerna](https://github.com/lerna/lerna).
```
npm install
```

There are 4 total packages:
- [react-drylus](/packages/react-drylus): This is basically the source of all the components for the library; it uses React
- [vanilla-drylus](/packages/vanilla-drylus): The vanilla JS version of the library. The styles (CSS) is extracted from `react-drylus` using `extract-emotion` (see next point) and bundled to be used in non-react apps. Since we can't extract JS logic from React, the component logic is re-written in non-react code and bundled separately as well
- [extract-emotion](/packages/extract-emotion): A small CLI tool to extract the CSS from React components that use [emotion](https://github.com/emotion-js/emotion) for styling (see [readme](/packages/extract-emotion/README.md))
- [drylus-web-components](/packages/drylus-web-components): __WIP__ Auto generated from `react-drylus`
- [styleguide](/packages/styleguide): This is where we write all the documentation and code examples for the library; examples are written in React and the equivalent HTML and web-components version are auto generated


#### Commands
All commands should be run from the root of the project

__GLOBAL__

Running this commands will call the corresponding `build`, `watch`, `test` etc. in all packages that match
```
npm run [command]
```

__react-drylus__
```
npm run watch:react
npm run test:react
npm run build:react
```

__vanilla-drylus__
```
npm run build:vanilla
```

__extract-emotion__
```
npm run test:extract-emotion
npm run build:extract-emotion
```

__styleguide__
```
npm run watch:styleguide
npm run build:styleguide
```
