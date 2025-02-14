

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const FormPage = () => {
  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [specialRequest, setSpecialRequest] = useState('');
  const [errors, setErrors] = useState({});
  const [isUploading, setIsUploading] = useState(false); // Track upload status
  const location = useLocation();
  const navigate = useNavigate();
  const { ticketType } = location.state || { ticketType: 'regular' };

 
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('formData'));
    if (savedData) {
      setName(savedData.name);
      setEmail(savedData.email);
      setSpecialRequest(savedData.specialRequest);
      setImage(savedData.image);
    }
  }, []);

 
  useEffect(() => {
    localStorage.setItem(
      'formData',
      JSON.stringify({ name, email, specialRequest, image })
    );
  }, [name, email, specialRequest, image]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      
      if (file.size > 2 * 1024 * 1024) {
        setErrors({ ...errors, image: 'File size exceeds 2MB limit.' });
        return;
      }
  
      // Only accept image files
      if (!file.type.startsWith('image/')) {
        setErrors({ ...errors, image: 'Please select a valid image file.' });
        return;
      }
  
      setIsUploading(true);
      setErrors({ ...errors, image: '' });

      // Upload image to Cloudinary (example)
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'scavos'); // Replace with your Cloudinary upload preset

      fetch('https://api.cloudinary.com/v1_1/diqkdjkl9/image/upload', {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Cloudinary Response:', data); // Debugging: Log the response
          if (data.secure_url) {
            setImage(data.secure_url); // Save the image URL
            setIsUploading(false); // Upload complete
          } else {
            throw new Error('Image URL not found in response');
          }
        })
        .catch((error) => {
          console.error('Error uploading image:', error);
          setErrors({ ...errors, image: 'Failed to upload image' });
          setIsUploading(false); // Upload failed
        });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!name) newErrors.name = 'Name is required';
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!image) newErrors.image = 'Image is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
const  handleBack=(e)=>{
  e.preventDefault();
   navigate('/')
}
  const handleNext = (e) => {
    e.preventDefault(); // Prevent default form submission

    if (isUploading) {
      setErrors({ ...errors, image: 'Image is still uploading. Please wait.' });
      return;
    }

    if (validateForm()) {
      navigate('/ticket', {
        state: {
          ticketType,
          name,
          email,
          specialRequest,
          image,
        },
      });
    } else {
      console.log('Validation Errors:', errors); // Debugging: Log validation errors
    }
  };

  // Handle keyboard events for form submission
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && e.target.tagName !== 'BUTTON') {
      e.preventDefault(); // Prevent default form submission
      handleNext(e);
    }
  };

  return (
    <form
      className='form-container'
      noValidate
      onKeyDown={handleKeyDown} // Handle Enter key for form submission
    >
      <div className='form-container-border'>
        <div className='deets'>
          <h3>Attendee Details</h3>
          <p>Step 2/3</p>
        </div>

        <div className='upload-div'>
          <label htmlFor='profilePhoto' style={{backgroundColor:"transparent"}}>Upload Picture:</label>
          <input
            type='file'
            id='profilePhoto'
            onChange={handleImageChange}
            aria-describedby='imageError'
            tabIndex={0} // Ensure file input is focusable
          />
          {errors.image && (
            <span id='imageError' className='error' aria-live='polite'>
              {errors.image}
            </span>
          )}
          {isUploading && <p>Uploading image... Please wait.</p>}
          {image && <img src={image} alt="Uploaded Preview" width="100" height="100" />} {/* Display uploaded image preview */}
        </div>

        <div>
          <label htmlFor='name'>Name:</label>
          <input
            type='text'
            id='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='Enter your name'
            aria-describedby='nameError'
            required
            tabIndex={0} // Ensure input is focusable
          />
          {errors.name && (
            <span id='nameError' className='error' aria-live='polite'>
              {errors.name}
            </span>
          )}
        </div>

        <div>
          <label htmlFor='email'>Email:</label>
          <input
            type='email'
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Enter your email'
            aria-describedby='emailError'
            required
            tabIndex={0} // Ensure input is focusable
          />
          {errors.email && (
            <span id='emailError' className='error' aria-live='polite'>
              {errors.email}
            </span>
          )}
        </div>

        <div>
          <label htmlFor='specialRequest'>Special Request:</label>
          <textarea
            id='specialRequest'
            value={specialRequest}
            onChange={(e) => setSpecialRequest(e.target.value)}
            placeholder='Enter special requests'
            tabIndex={0} // Ensure textarea is focusable
          />
        </div>
        <div className='form-buttons'>
        <button
          type='button'
          onClick={handleBack}
         className='btn'
         id='btn1'
          tabIndex={0} 
          disabled={isUploading}  >
          Back
        </button>

        <button
          type='button'
          id='btn2'
           className='btn'
          onClick={handleNext}
          tabIndex={0} 
          disabled={isUploading}  >
          Get My Free Ticket
        </button>
        </div>
      </div>
    </form>
  );
};

export default FormPage;