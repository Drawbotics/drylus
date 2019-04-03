import { cx as _cx } from "emotion";
import { css as _css } from "emotion";
import React from 'react';

var width = '700px';
var styles = {
  button:
  /*#__PURE__*/
  _css("background:blue;color:red;@media (min-width:", width, "){color:green;}label:Button__button;" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL0J1dHRvbi5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBU2EiLCJmaWxlIjoiLi4vLi4vc3JjL2NvbXBvbmVudHMvQnV0dG9uLmpzeCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjc3MsIGN4IH0gZnJvbSAnZW1vdGlvbic7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuXG5cbmNvbnN0IHdpZHRoID0gJzcwMHB4JztcblxuXG5jb25zdCBzdHlsZXMgPSB7XG4gIGJ1dHRvbjogY3NzYFxuICAgIGJhY2tncm91bmQ6IGJsdWU7XG4gICAgY29sb3I6IHJlZDtcblxuICAgIEBtZWRpYSAobWluLXdpZHRoOiAke3dpZHRofSkge1xuICAgICAgY29sb3I6IGdyZWVuO1xuICAgIH1cbiAgYCxcbiAgaG92ZXI6IGNzc2BcbiAgICBiYWNrZ3JvdW5kOiBvcmFuZ2U7XG4gIGAsXG59O1xuXG5cbmNvbnN0IEJ1dHRvbiA9ICh7IGNoaWxkcmVuIH0pID0+IHtcbiAgcmV0dXJuIChcbiAgICA8YnV0dG9uIGNsYXNzTmFtZT17Y3goc3R5bGVzLmJ1dHRvbiwgc3R5bGVzLmhvdmVyKX0+e2NoaWxkcmVufTwvYnV0dG9uPlxuICApO1xufVxuXG5cbkJ1dHRvbi5wcm9wVHlwZXMgPSB7XG4gIC8qKiBOb3JtYWxseSBqdXN0IHRleHQgZm9yIHRoZSBidXR0b24gKi9cbiAgY2hpbGRyZW46IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbn1cblxuXG5leHBvcnQgZGVmYXVsdCBCdXR0b247XG4iXX0= */")),
  hover:
  /*#__PURE__*/
  _css(process.env.NODE_ENV === "production" ? {
    name: "1hm79eq-Button__hover",
    styles: "background:orange;label:Button__hover;"
  } : {
    name: "1hm79eq-Button__hover",
    styles: "background:orange;label:Button__hover;",
    map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL0J1dHRvbi5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBaUJZIiwiZmlsZSI6Ii4uLy4uL3NyYy9jb21wb25lbnRzL0J1dHRvbi5qc3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY3NzLCBjeCB9IGZyb20gJ2Vtb3Rpb24nO1xuaW1wb3J0IFByb3BUeXBlcyBmcm9tICdwcm9wLXR5cGVzJztcblxuXG5jb25zdCB3aWR0aCA9ICc3MDBweCc7XG5cblxuY29uc3Qgc3R5bGVzID0ge1xuICBidXR0b246IGNzc2BcbiAgICBiYWNrZ3JvdW5kOiBibHVlO1xuICAgIGNvbG9yOiByZWQ7XG5cbiAgICBAbWVkaWEgKG1pbi13aWR0aDogJHt3aWR0aH0pIHtcbiAgICAgIGNvbG9yOiBncmVlbjtcbiAgICB9XG4gIGAsXG4gIGhvdmVyOiBjc3NgXG4gICAgYmFja2dyb3VuZDogb3JhbmdlO1xuICBgLFxufTtcblxuXG5jb25zdCBCdXR0b24gPSAoeyBjaGlsZHJlbiB9KSA9PiB7XG4gIHJldHVybiAoXG4gICAgPGJ1dHRvbiBjbGFzc05hbWU9e2N4KHN0eWxlcy5idXR0b24sIHN0eWxlcy5ob3Zlcil9PntjaGlsZHJlbn08L2J1dHRvbj5cbiAgKTtcbn1cblxuXG5CdXR0b24ucHJvcFR5cGVzID0ge1xuICAvKiogTm9ybWFsbHkganVzdCB0ZXh0IGZvciB0aGUgYnV0dG9uICovXG4gIGNoaWxkcmVuOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG59XG5cblxuZXhwb3J0IGRlZmF1bHQgQnV0dG9uO1xuIl19 */"
  })
};


var a = function a() {
  return React.createElement("button", {
    className: _cx(styles.button, styles.hover)
  });
};


export default a;
