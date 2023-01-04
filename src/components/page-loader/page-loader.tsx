import React from 'react';
import Spinner from '../../assets/spinner.svg';

import './page-loader.css';

const PageLoader: React.FC<{
  isLoading?: boolean;
  errorMessage?: string;
  children: JSX.Element;
}> = ({ isLoading, errorMessage, children }) => {
  if (errorMessage) {
    return <div className="PageLoader-errorMessage">{errorMessage}</div>;
  }
  if (isLoading) {
    return <img src={Spinner} className="PageLoader-spinner" />;
  }
  return children;
};

export default PageLoader;
