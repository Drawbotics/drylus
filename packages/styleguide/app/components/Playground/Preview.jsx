import React from 'react';
// import { LiveProvider, LivePreview } from 'react-live';
import { css } from 'emotion';
import sv from '@drawbotics/style-vars';


const styles = {
  preview: css`
    padding: ${sv.basePadding};
    border-radius: ${sv.baseBorderRadius};
    background: ${sv.white};
    margin: ${sv.baseMarginSmall};
  `,
};


// const _Preview = ({ children, component }) => {
//   const componentName = component.displayName || component.name;
//   if (! componentName) {
//     console.warn('Component has no name, won\'t render');
//     return null;
//   }
//   return (
//     <div style={{ marginTop: '40px' }}>
//       <LiveProvider code={children} scope={{ [componentName]: component }}>
//         <LivePreview />
//       </LiveProvider>
//     </div>
//   );
// };


const Preview = ({ children, raw }) => {
  return (
    <div className={styles.preview}>
      {do{
        if (raw) {
          <div dangerouslySetInnerHTML={{ __html: children }} />
        }
        else {
          <>
            {children}
          </>
        }
      }}
    </div>
  );
};


export default Preview;
