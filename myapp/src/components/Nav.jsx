import React from 'react'
import { Outlet } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTicketAlt } from '@fortawesome/free-solid-svg-icons';
import  thumbImage from "../assets/thumb.svg";
import  ticzImage from "../assets/ticz.svg"

function Nav() {
  return (
    <>
    <div className='nav-bar '>
        <div id="logo"  >
  <img src={thumbImage} className='logo-img' alt="" />
  <img src={ticzImage}  className='logo-img'alt="" />
            
        
        </div>
 <div className="nav-link" >
 <a href=""> Events</a>
 <a href="">My Ticket About Project </a>
 <a href="">My Ticket About Project </a>
 </div>

 <button id="top-button">
   My Tickets →
 </button>

    </div>
    <div><Outlet/></div>
    </>
  )
}

export default Nav