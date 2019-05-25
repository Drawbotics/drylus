const context = require.context('../icons/', false, /\.svg$/);


let files = [];

context.keys().forEach((key) => files.push(context(key)));


export default files;
