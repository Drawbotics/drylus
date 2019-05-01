import React from 'react';
import parser from 'fast-xml-parser';

import Code from '../Code';


function beautifyString(html) {
  const jsonObject = parser.parse(html, {
    allowBooleanAttributes : true,
    ignoreAttributes : false,
    trimValues: false,
  });
  const formattedXML = new parser.j2xParser({
    supressEmptyNode: true,
    format: true,
    ignoreAttributes : false,
  }).parse(jsonObject);
  return formattedXML;
}


const CodeBox = ({ children, mode='jsx', format }) => {
  const beautified = format ? beautifyString(children) : children;
  return (
    <Code className={mode}>
      {beautified}
    </Code>
  );
};


export default CodeBox;
