import { useContext, useState } from 'react'
import LogoIcon from '../../../assets/logo.png'
import UsersIcon from '../../../assets/icons/users.svg'
import OrdersIcon from '../../../assets/icons/cart.svg'
import { useNavigate } from 'react-router-dom'
import { DarkThemeToggle } from '@renderer/components/DarkThemeToggle'
import { LanguageToggle } from '@renderer/components/LanguageToggle'
import { LanguageContext } from '@renderer/contexts/LanguageContext'

const menus = [
  { title: { en: 'Orders', ar: 'طلبات' }, src: OrdersIcon, link: '/order/list' },
  { title: { en: 'Clients', ar: 'زبائن' }, src: UsersIcon, link: '/client/list' }
]

const Sidebar = (): JSX.Element => {
  const navigate = useNavigate()
  const { lang } = useContext(LanguageContext)
  const [open, setOpen] = useState(true)
  return (
    <div
      className={`${open ? 'w-72 p-5' : 'w-20'} h-screen relative duration-300 text-white dark:bg-slate-800 flex flex-col justify-center`}
    >
      <div
        className={`bg-white dark:bg-slate-950 p-3 flex flex-col ${open ? 'h-[98%] rounded-xl' : ' h-screen'}`}
      >
        <div
          className={`absolute cursor-pointer -right-5 top-9 w-7 border-2 border-[#eff1fa] bg-white rounded-full ${
            !open && 'rotate-180'
          }`}
          onClick={() => setOpen(!open)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
            <path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z" />
          </svg>
        </div>
        <div className="flex gap-x-4 items-center cursor-pointer" onClick={() => navigate('/')}>
          <img src={LogoIcon} className={`duration-500 ${open ? 'w-10 h-10 ' : 'w-13 h-13 '}`} />
          <h1
            className={`origin-left font-medium text-xl duration-300 dark:text-white text-stone-900 ${!open && 'scale-0'}`}
          >
            Store
          </h1>
        </div>
        <ul className="pt-6">
          {menus.map((item, index) => (
            <li
              key={index}
              className={`text-stone-900 dark:text-slate-400 text-sm flex  items-center gap-x-4 cursor-pointer p-2 hover:bg-[#9ba3af4d] rounded-md ${
                !open ? 'justify-center' : ''
              }`}
              onClick={() => navigate(item.link)}
            >
              <button className="btn btn-circle border-none bg-slate-400">
                <img src={item.src} className="h-6 w-6" />
              </button>

              <span className={`${!open && 'hidden'} origin-left duration-200 font-semibold`}>
                {item.title[lang]}
              </span>
            </li>
          ))}
        </ul>
        <div
          className={`mt-auto flex  justify-center gap-4 items-center ${open ? 'flex-row' : 'flex-col'}`}
        >
          <DarkThemeToggle />
          <LanguageToggle />
        </div>
      </div>
    </div>
  )
}

export default Sidebar
