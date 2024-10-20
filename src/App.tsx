import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ColorPicker from './components/ColorPicker';
import ImageColorPicker from './components/ImageColorPicker';
import Sidebar from './components/Sidebar';

const App: React.FC = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <div className="container-fluid flex-grow-1">
        <div className="row">
          <main className="col-md-9 col-lg-10 px-md-4">
            <Routes>
              <Route path="/" element={<ColorPicker />} />
              <Route path="/image-picker" element={<ImageColorPicker />} />
            </Routes>
          </main>
          <Sidebar />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default App;