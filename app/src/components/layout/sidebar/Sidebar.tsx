import { useState } from 'react';
import LogoIcon from '../../../assets/logo.png';
import UsersIcon from '../../../assets/icons/users.svg';
import OrdersIcon from '../../../assets/icons/cart.svg';
import { useNavigate } from 'react-router-dom';

const menus = [
  { title: 'Clients', src: UsersIcon, link: "/client/create" },
  { title: 'Orders', src: OrdersIcon, link: "" },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  return (
    <div
      className={`${
        open ? 'w-72' : 'w-20'
      } h-screen p-5 pt-8 bg-blue-700 relative duration-300 text-white`}
    >
      <div
        className={`absolute cursor-pointer -right-3 top-9 w-7 border-2 border-blue-700 bg-white rounded-full ${
          !open && 'rotate-180'
        }`}
        onClick={() => setOpen(!open)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
          <path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z" />
        </svg>
      </div>
      <div className="flex gap-x-4 items-center cursor-pointer">
        <img src={LogoIcon} className="w-10 h-10 duration-500" />
        <h1
          className={`origin-left font-medium text-xl duration-300 ${
            !open && 'scale-0'
          }`}
        >
          Store
        </h1>
      </div>
      <ul className="pt-6">
        {menus.map((item, index) => (
          <li
            key={index}
            className="text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-[#ffffff2b] rounded-md "
            onClick={() => navigate(item.link)}
          >
            <div className={`${open ? 'p-2' : 'p-1'} flex justify-center items-center w-9 h-9  border rounded-md`}>
              <img src={item.src} className="w-full" />
            </div>

            <span className={`${!open && 'hidden'} origin-left duration-200 font-semibold`}>
            {item.title}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
