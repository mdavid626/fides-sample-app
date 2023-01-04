import React from 'react';
import Header from '../../components/header/header';

import './about-page.css';

const AboutPage: React.FC = () => (
  <div className="AboutPage">
    <Header />
    <div className="AboutPage-content">
      <div>Simple React app created for Fides as an interview task.</div>
      <div>
        Created by: <a href="https://mdavid626.com">Dávid Molnár</a>
      </div>
      <a href="https://github.com/mdavid626/fides-sample-app">Source Code</a>
    </div>
  </div>
);

export default AboutPage;
