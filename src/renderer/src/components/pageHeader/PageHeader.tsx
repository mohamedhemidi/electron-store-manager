import React from 'react'

const PageHeader: React.FC<{ children: React.ReactNode }> = ({ children }): JSX.Element => {
  return (
    <div className="page-header flex justify-between items-center bg-white dark:bg-slate-950 p-6 mb-6 rounded-md">
      {children}
    </div>
  )
}

export default PageHeader
