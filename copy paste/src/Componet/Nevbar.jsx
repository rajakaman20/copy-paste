import React from "react";
import { NavLink } from "react-router-dom";
function Navbar()
{
  return (
  <div className="flex flex-row gap-4 place-content-around">
     <NavLink
     to="/">
     Home
     </NavLink>
   
     <NavLink
     to="/Paste">
      Paste
     </NavLink>
  </div>
  )
  
}
export default  Navbar;