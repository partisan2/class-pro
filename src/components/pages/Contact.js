import React, { useState } from 'react';
import HeaderDashboard from '../HeaderDashboard';
import FooterDashboard from '../FooterDashboard';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
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
      name: '',
      email: '',
      subject: '',
      message: '',
    });
  };

  


  const containerStyle = {
    background: `url('https://www.hphi.life/hubfs/Page%20-%20Home_7.png') no-repeat center center fixed`,
    backgroundSize: 'cover',
    minHeight: '100vh',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr', // 2 columns
    gap: '20px',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '50px',
  };

  const contactInfoStyle = {
    /*backgroundColor: 'rgba(255, 255, 255, 0.7)',*/
    padding: '20px',
    borderRadius: '10px',
    color: 'white',
  };

  const getInTouchStyle = {
    backgroundColor: 'rgba(0, 255, 255, 0.3)',
    padding: '20px',
    borderRadius: '10px',
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    alignItems: 'center', // Center the form vertically
    width: '100%', // Set the width to 100% to ensure responsiveness
  };

  const formStyle = {
    maxWidth: '900px',
    marginBottom:'100px',
    display: 'grid',
    gap: '10px',
    textAlign: 'right', // Center the form
   /* width: '100%', // Set the width to 100% to ensure responsiveness*/
  };

  const labelStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr', // 2 columns
    alignItems: 'center',
    marginBottom: '10px',
    textAlign: 'center',
    paddingRight: '10px',
  };

  const inputStyle = {
    width: '100%',
    padding: '8px',
    boxSizing: 'border-box',
    
  };

  const textareaStyle = {
    width: '100%',
    padding: '8px',
    boxSizing: 'border-box',
    height: '120px', // Adjust the height as needed
  };

  const buttonStyle = {
    padding: '10px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
  };

  return (
    <div>
      <HeaderDashboard />
      <div style={containerStyle}>
        {/* Contact Information */}
        <div style={contactInfoStyle}>
          <h3>Contact Information</h3>
          <p>Email: example@email.com</p>
          <p>Phone: +1234567890</p>
          <p>Address: 198 West 21th Street, Suite 721 New York, NY 10016</p>
          <p>Website: <a href="https://www.yoursite.com">yoursite.com</a></p>
        </div>

        {/* Get in Touch Section */}
        <div style={getInTouchStyle}>
          <h1>Get in Touch with Us</h1>
          <p>We are here to answer any questions you may have.</p>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} style={formStyle}>
            <div className="form-group" style={labelStyle}>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                style={inputStyle}
              />
            </div>

            <div className="form-group" style={labelStyle}>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                style={inputStyle}
              />
            </div>

            <div className="form-group" style={labelStyle}>
              <label htmlFor="subject">Subject:</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                style={inputStyle}
              />
            </div>

            <div className="form-group" style={labelStyle}>
              <label htmlFor="message">Message:</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                style={textareaStyle}
              />
            </div>

            <div className="form-group">
              <button type="submit" style={buttonStyle} className="btn btn-primary">
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
      <FooterDashboard />
    </div>
  );
};

export default Contact;
