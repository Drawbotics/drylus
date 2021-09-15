import React from 'react';

const Logo = ({ color = '#FFFFFF' }) => {
  return (
    <svg x="0px" y="0px" height="100%" viewBox="0 0 65.375 61.236">
      <g>
        <g>
          <g>
            <defs>
              <polygon id="SVGID_1_" points="0,49.853 65.375,61.236 28.219,42.138" />
            </defs>
            <use xlinkHref="#SVGID_1_" overflow="visible" fill={color} />
            <clipPath id="SVGID_2_">
              <use xlinkHref="#SVGID_1_" overflow="visible" />
            </clipPath>
            <rect
              y="42.138"
              clipPath="url(#SVGID_2_)"
              fill={color}
              width="65.375"
              height="19.098"
            />
          </g>
        </g>
      </g>
      <g>
        <g>
          <g>
            <defs>
              <polygon id="SVGID_3_" points="30.284,40.589 65.375,61.236 42.329,0" />
            </defs>
            <use xlinkHref="#SVGID_3_" overflow="visible" fill={color} />
            <clipPath id="SVGID_4_">
              <use xlinkHref="#SVGID_3_" overflow="visible" />
            </clipPath>
            <rect
              x="30.284"
              y="0"
              clipPath="url(#SVGID_4_)"
              fill={color}
              width="35.091"
              height="61.236"
            />
          </g>
        </g>
      </g>
      <g>
        <g>
          <g>
            <defs>
              <polygon id="SVGID_5_" points="0,49.853 27.276,39.835 42.329,0" />
            </defs>
            <use xlinkHref="#SVGID_5_" overflow="visible" fill={color} />
            <clipPath id="SVGID_6_">
              <use xlinkHref="#SVGID_5_" overflow="visible" />
            </clipPath>
            <rect y="0" clipPath="url(#SVGID_6_)" fill={color} width="42.329" height="49.854" />
          </g>
        </g>
      </g>
    </svg>
  );
};

export default Logo;
