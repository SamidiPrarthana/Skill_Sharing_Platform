import React from 'react';
import '../Style/Footer.css';

const SimpleFooter = () => {
  return (
    <footer className="simple-footer">
      <div className="footer-content">
        <div className="footer-links">
          <a href="#">About Us</a>
          <a href="/postview">Recipes</a>
          <a href="#">Contact</a>
          <a href="#">Privacy Policy</a>
        </div>
        <div className="footer-copyright">
          <p>&copy; {new Date().getFullYear()} Traditional Recipe Sharing & Learning</p>
        </div>
      </div>
    </footer>
  );
};

export default SimpleFooter;