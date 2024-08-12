import React from 'react'
import { useNavigate } from 'react-router-dom'

interface Props {
  children: React.ReactNode
  path: string
}

const Breadcrumps: React.FC<Props> = ({ children, path }): JSX.Element => {
  const navigate = useNavigate()
  return (
    <div
      className="breadcrumbs mb-2 flex flex-row dark:text-slate-400 items-center cursor-pointer"
      onClick={() => navigate(path)}
    >
      <div className="w-10 dark:fill-slate-200">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
          <path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z" />
        </svg>
      </div>
      {/* <p className="text-base w-full">{en['back_to_list']}</p> */}
      <p className="text-base w-full">{children}</p>
    </div>
  )
}

export default Breadcrumps
