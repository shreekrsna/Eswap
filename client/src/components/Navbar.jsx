import {HiMenuAlt4} from 'react-icons/hi';
import {AiOutlineClose} from 'react-icons/ai';

import log from '../../images/log.png';
import React from 'react';
const NavbarItem =({title,classProps}) => {

  return(
    <li className={`mx-4 cursor-pointer ${classProps}`}>
      {title}
    </li>
  )

}

const Navbar = () => {
const [toggleMenu,setToggleMenu] = React.useState(false);

  return (
   <nav className='w-full flex md:justify-center justify-between items-center p-3  '>
    <div className='flex flex-row justify-start items-center stamp-glassmorphism p-1 mr-[150px] m-2 mb-10 mt-5 cursor-pointer hover:shadow-2xl rounded-3xl'>
              <img src={log } alt="logo" className='w-32  cursor-pointer  '/>
            
              <div className='text-gradient  text-bold text-2xl mt-3 p-0  px-9 mb-5   '>
                Eswap
              </div>
    </div>
      <ul className='text-white md:flex hidden list-none flex-row justify-between items-center flex-initial  '>
          {["Market","Exchange","Tutorials","Wallets"].map((item,index) =>(
            <NavbarItem key={item+index} title={item}/>
          ))}
          
          <li className="bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd]">
          Login
        </li>
         
      </ul>
      <div className='flex-relative'>
        {!toggleMenu && (
          <HiMenuAlt4 fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(true)}/>

        )}
        {toggleMenu && (
          <AiOutlineClose fontSize={28} className="text-white md:hidden cursor-pointer" onClick={() => setToggleMenu(false)}/>
        )}
         {toggleMenu && (
          <ul className='z-10 fixed -top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in'>
              <li className='text-xl w-full my-2'> <AiOutlineClose onClick={()=>setToggleMenu(false)}/>

              </li>
              {["Market","Exchange","Tutorials","Wallets"].map((item,index) =>(
            <NavbarItem key={item+index} title={item} classProps="my-2 text-lg"/>
          ))}
          </ul>
         )}
      </div>
   </nav>
  )
} 

export default Navbar