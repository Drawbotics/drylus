export function extractIntrinsics(values) {
  return values.reduce(
    (memo, val) => {
      const maybeVariant = val.split('.')[1];
      const isVariant = ! ['boolean', 'number', 'string'].includes(maybeVariant);

      return {
        variants: isVariant ? [...memo.variants, val] : memo.variants,
        nonVariants: isVariant ? memo.nonVariants : [...memo.nonVariants, maybeVariant],
      };
    },
    { variants: [], nonVariants: [] }
  );
} 