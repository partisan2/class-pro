import React , { useState } from 'react';
import HeaderDashboard from '../HeaderDashboard'
import FooterDashboard from '../FooterDashboard'



const containerStyle = {
    maxWidth: '800px',
    margin: 'auto',
    padding: '20px',
  };
  
  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  };
  
  const labelStyle = {
    display: 'flex',
    flexDirection: 'column',
  };
  
  const buttonStyle = {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '10px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  };


function Contact() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        message: '',
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        // You can implement the logic to send the message here
        console.log('Message sent:', formData);
        // Reset the form after submitting
        setFormData({
          fullName: '',
          email: '',
          phoneNumber: '',
          message: '',
        });
      };
  
  
  
    return (
    <div>
        <HeaderDashboard/>
        <div style={containerStyle}>
        <h2>Contact Us</h2>
        <p>Feel free to reach out to us. We'd love to hear from you!</p>

        {/* Contact Information */}
        <div>
          <h3>Our Contact Information</h3>
          <p>Email: example@email.com</p>
          <p>Phone: +1234567890</p>
        </div>

        {/* Contact Form */}
        <div>
          <h3>Contact Form</h3>
          <form  style={formStyle} onSubmit={handleSubmit}>
            <label style={labelStyle}>
              Full Name:
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </label>

            <label style={labelStyle}>
              Email Address:
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </label>

            <label style={labelStyle}>
              Phone Number:
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
            </label>

            <label style={labelStyle}>
              Message:
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </label>

            <button type="submit" style={buttonStyle}> Send Message</button>
          </form>
        </div>
      </div>

        <FooterDashboard/>
    </div>
  )
}

export default Contact