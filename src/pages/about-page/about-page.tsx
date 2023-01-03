import React from 'react';
import Sidebar from '../../components/sidebar/sidebar';

import './about-page.css';

const AboutPage: React.FC = () => (
  <div className="AboutPage">
    <Sidebar />
    <div className="AboutPage-content">
      <div>Simple React app created for Fides as an interview task.</div>
      <div>Created by: Dávid Molnár</div>
      <a href="https://github.com/mdavid626/fides-sample-app">Source Code</a>
    </div>
  </div>
);

export default AboutPage;
