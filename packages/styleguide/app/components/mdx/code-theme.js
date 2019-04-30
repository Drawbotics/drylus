import sv from '@drawbotics/style-vars';


export default {
  plain: {
    color: sv.colorSecondaryInverse,
    backgroundColor: sv.neutralDarkest,
  },
  styles: [
    {
      types: ["prolog", "constant", "builtin"],
      style: {
        color: sv.blue,
      }
    },
    {
      types: ["inserted", "function"],
      style: {
        color: sv.green,
      }
    },
    {
      types: ["deleted"],
      style: {
        color: sv.red,
      }
    },
    {
      types: ["changed"],
      style: {
        color: sv.orange,
      }
    },
    {
      types: ["punctuation", "symbol"],
      style: {
        color: sv.brand,
      }
    },
    {
      types: ["string", "char", "tag", "selector"],
      style: {
        color: sv.brand,
      }
    },
    {
      types: ["keyword", "variable"],
      style: {
        color: sv.blue,
        fontStyle: "italic"
      }
    },
    {
      types: ["comment"],
      style: {
        color: sv.colorTertiaryInverse,
      }
    },
    {
      types: ["attr-name"],
      style: {
        color: sv.orange,
      }
    }
  ]
};
