import React from 'react';
import { Github, Twitter, Facebook } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-light py-3 mt-auto">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <p className="mb-0">© 2024 ColorCraft. All rights reserved.</p>
            <p className="mb-0">Made with Bolt AI</p>
          </div>
          <div className="col-md-6 text-md-end">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-dark me-3">
              <Github size={20} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-dark me-3">
              <Twitter size={20} />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-dark">
              <Facebook size={20} />
            </a>
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-12">
            <ins className="adsbygoogle"
                 style={{ display: 'block' }}
                 data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
                 data-ad-slot="XXXXXXXXXX"
                 data-ad-format="auto"
                 data-full-width-responsive="true"></ins>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;