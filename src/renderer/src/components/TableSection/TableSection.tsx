import React from 'react'

interface ITable {
  Header: React.ReactNode // For the `thead` section
  Body: React.ReactNode
}
const TableSection: React.FC<ITable> = ({ Header, Body }): JSX.Element => {
  return (
    <div className="table-section">
      <div className="overflow-x-auto">
        <table className="table dark:text-white">
          <thead className="dark:text-white">{Header}</thead>
          <tbody>{Body}</tbody>
        </table>
      </div>
    </div>
  )
}

export default TableSection
