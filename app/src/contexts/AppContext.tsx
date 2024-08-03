import { createContext } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const AppContext = createContext<any | undefined>(undefined)



// export const AppContext: React.FC<{ children: ReactNode }> = ({ children }) => {
//     // Assume `myObject` is the object you want to pull from the window
//     // const myObject: MyObject = window.myObject;

//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     const api = (window as any).api;
  
//     return (<></>);
//   };