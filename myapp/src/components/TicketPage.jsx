
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';  // Import useState and useEffect
import Barcode from '../assets/Barcode.svg';

const TicketPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [isRedirecting, setIsRedirecting] = useState(false); // State to track redirection

 
  const { ticketType = 'regular', name = '', email = '', specialRequest = '', image = '' } = location.state || {};

  
  useEffect(() => {
    if (!name || !email || !image) {
      setIsRedirecting(true); 
      navigate('/form');  
    }
  }, [name, email, image, navigate]);

 
  if (isRedirecting) {
    return <div>Redirecting to form...</div>;
  }
  const  handleBack=(e)=>{
    e.preventDefault();
     navigate('/form')
  }
 
  const handleDownload = () => {
   
    alert('Download functionality will be implemented here.');
  };

  return (
    <div className='ticket-container'>
      <div className='ticket-heading'>
        <h1>Your Ticket is Booked</h1>
        <p>
          Check your email for a copy or you can{' '}
          <span style={{ fontWeight: 'bold' }}>Download</span>
        </p>
      </div>

      <div className='ticket'>
        <div className='ticket-deet'>
          <div className='event-details-2'>
            <h2>Techember Fest '25</h2>
            <p>📍 [Event Location] || March 15, 2025 | 7:00 PM</p>
          </div>

        
          <img src={image} alt="Uploaded" width="150" height="150" />

        
          <h3>Name: {name}</h3>
          <h3>Email: {email}</h3>
          {specialRequest && <h3>Special Request: {specialRequest}</h3>}
        </div>

    
        <div className='bar-code'>
          <img src={Barcode} alt="Barcode" />
        </div>
      </div>

      <div className='ticketpage-buttons'>
        <button
          type='button'
          onClick={handleBack}
         className='btn'
         id='btn1'
          tabIndex={0} 
           >
          Back
        </button>

        <button
          type='button'
          id='btn2'
           className='btn'
           onClick={handleDownload}
            >
          Get My Free Ticket
        </button>
        </div>
     
    </div>
  );
};

export default TicketPage;
