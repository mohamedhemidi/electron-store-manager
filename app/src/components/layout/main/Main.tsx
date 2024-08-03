import React from 'react';

const Main: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className='p-7 text-2xl flex-1 h-screen'>{children}</div>;
};

export default Main;
