# Drawbotics Styleguide

 This is the app used to showcase the Drawbotics styles and components, to be used both by devs and non-devs.

 It uses all the packages that define components i.e. `react-drylus`, `vanilla-drylus` and eventually `drylus-web-components`.

 Nothing particularly fancy about this.

 ## Development
```
npm start
```

**NOTE**: an `.env` file containing the following variables is needed to run the styleguide:
```
MAPBOX_ACCESS_TOKEN=
EXAMPLE_API_HOST=
```
To have valid API keys and urls for the examples.

To build the static app (served through Github pages)
```
npm run build
```
