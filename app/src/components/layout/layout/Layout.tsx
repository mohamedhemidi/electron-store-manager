import React from 'react';
import { Main } from '../main';
import { Sidebar } from '../sidebar';


const Layout: React.FC<{children: React.ReactNode}> = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <Main>{children}</Main>
    </div>
  );
};

export default Layout;
