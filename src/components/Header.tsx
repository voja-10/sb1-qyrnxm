import React from 'react';
import { Link } from 'react-router-dom';
import { Palette } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <Palette className="me-2" />
          <span>ColorCraft</span>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/" className="nav-link">Color Picker</Link>
            </li>
            <li className="nav-item">
              <Link to="/image-picker" className="nav-link">Pick from Image</Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;