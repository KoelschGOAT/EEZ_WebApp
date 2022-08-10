import React from 'react';
import { NavLink } from 'react-router-dom';
function Footer() {
  const FOOTER_WRAPPER = {
    height: '40px',
    position: 'fixed',
    bottom: '0%',
    width: '100%',
    opacity: '1',
    textAlign: 'center',
    marginBottom: '1rem',
  };
  const FOOTER_BOX = {
    display: 'flex',
    justifyContent: 'center',
    gap: '12rem',
  };
  return (
    <>
      <div className="footer-wrapper" style={FOOTER_WRAPPER}>
        <div className="footer-box" style={FOOTER_BOX}>
          <span>
            Diese Seite wurde von der ENERCON IT Ausbildung erstellt
          </span>
          <NavLink to="/stellenanzeige" style={{ color: 'black' }}>
            Stellenanzeige
          </NavLink>
        </div>
      </div>
    </>
  );
}

export default Footer;
