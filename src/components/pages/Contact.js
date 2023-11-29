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
    color: 'white',
    padding: '50px',
  };

  const contactInfoStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: '20px',
    borderRadius: '10px',
  };

  const getInTouchStyle = {
    padding: '20px',
    borderRadius: '10px',
    textAlign: 'center',
  };

  const formStyle = {
    maxWidth: '400px',
    margin: 'auto',
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
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject:</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message:</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
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
