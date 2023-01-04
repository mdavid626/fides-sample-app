import React from 'react';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';

import './about-page.css';

const AboutPage: React.FC = () => (
  <div className="AboutPage">
    <Header />
    <div className="AboutPage-content">
      <div className="AboutPage-description">
        Simple React app created for Fides
      </div>
      <div>
        Created by: <a href="https://mdavid626.com">Dávid Molnár</a>
      </div>
      <a href="https://github.com/mdavid626/fides-sample-app">Source Code</a>
    </div>
    <Footer />
  </div>
);

export default AboutPage;
