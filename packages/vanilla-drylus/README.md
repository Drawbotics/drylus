# Vanilla Drylus


## Development
```
npm run watch
```
This command will synchronously run the commands to both:
1. Watch the `react-drylus` lib for changes, this way a new CSS bundle can be generated from the styles defined in JS.
2. Run webpack in watch mode in the `src` folder of the vanilla library, as we have some vanilla-only JS code that needs to be written to add some interactions to the components

The commands are synchronous because we need the CSS bundle from the React components first, and then we include it in the webpack flow in case we have additional CSS code from the vanilla source that needs to be added to it.

To build for production run
```
npm run build
```
