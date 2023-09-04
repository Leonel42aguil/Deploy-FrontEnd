import React from 'react';
import "./FooterHome.css"

function FooterHome() {
  return (
    <footer>
      <div className="contact-info">
        <h3 className='contáctanos' >Contact us</h3>
        <p className='pregunta'>For any questions or comments, do not hesitate to contact us:</p>
        <ul className='CorreoHeader'>
          <li className='info'><strong className='infoMia'>Email:</strong> Leonelcarp142nuevo@gmail.com</li>
          <li className='info'><strong className='infoMia'>Phone number:</strong> +1 (555) 123-4567</li>
          <li className='info'><strong className='infoMia'>Address:</strong> patagonia E 13, Mendoza, Maipu, Postal Code: 5515</li>
        </ul>
      </div>
      <div className="copyright">
        <p className='reserved'>© 2023 Your Dog Page. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default FooterHome;
