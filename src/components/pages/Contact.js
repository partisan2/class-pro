import React from 'react'
import HeaderDashboard from '../HeaderDashboard'
import FooterDashboard from '../FooterDashboard'

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
        <div>
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
          <form onSubmit={handleSubmit}>
            <label>
              Full Name:
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Email Address:
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Phone Number:
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Message:
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </label>

            <button type="submit">Send Message</button>
          </form>
        </div>
      </div>

        <FooterDashboard/>
    </div>
  )
}

export default Contact