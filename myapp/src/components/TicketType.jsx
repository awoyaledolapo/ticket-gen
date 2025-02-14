import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Use useNavigate instead of useHistory

const TicketTypePage = () => {
  const [ticketType, setTicketType] = useState("regular");
  const navigate = useNavigate(); // Change from useHistory to useNavigate

  const handleNext = () => {
    navigate("/form", {
      state: { ticketType }, // Pass ticketType to the next page
    });
  };

  return (
    <section className="content">
    <div className="main-card">
   <div className="tick">  <h1>Ticket Seletion </h1>
  <p>step 1/3</p></div> 
 
      <div className="second-layer">
    <div className="event-details">
     <h1>Techember Fest" 25</h1>
     <p>Join us for an unforgettable experience at [Event Name]! Secure your spot now.</p>
     <p>📍[Event Location]
     || March 15, 2025 | 7:00 PM</p>
    </div>
    <div className="thin-line"></div>
    <p  style={{color:"white"}}>Select Ticket Type</p>
    <div className="ticket-types">
        <div
          
            id="regular"
            className="ticketType"
            value="regular"
            checked={ticketType === "regular"}
            onClick={() => setTicketType("regular")}>
        <p>   Free</p>
             <p>Regular access  <br />
        20/52
        </p>
        </div>
        <div
        
           
            id="vip"
            className="ticketType"
            value="vip"
            checked={ticketType === "vip"}
            onChange={() => setTicketType("vip")}
        >  <p>   $150</p>
        <p>vip access 
   20/52
   </p>
       
        </div>
        <div
          
            
            id="vvip"
            className="ticketType"
            value="vvip"
            checked={ticketType === "vvip"}
            onChange={() => setTicketType("vvip")}
          >
         <p>   $150</p>
             <p>vvip access 
        20/52
        </p>
       
        </div>
        </div>
        <div className="numberofticket">
        <label htmlFor='number of ticket' className="ticket-number-text">
        Number of Ticket:
            </label>
            <br />
            <input
            type='number'
            className='ticket-input'
            
           
           
            />
        </div>
        
        <div className="TicketType-buttons"> <button
          type='button'

         className='btn'
         id='btn1'
          >
          Back
        </button>
        <button onClick={handleNext}  className="TicketType-button">Next</button>
        </div>
      </div>
      </div>
    </section>
  );
};

export default TicketTypePage;
