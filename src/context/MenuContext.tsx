import React from "react";

export const MenuContext = React.createContext({
   outer: false,
   setOuter: (outer: boolean) => {},
   inner: false,
   setInner: (inner: boolean) => {},
   // category: 'spectacles',
   // setCategory: (category: string) => {}
});
