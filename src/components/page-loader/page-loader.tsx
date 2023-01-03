import React from 'react';

const PageLoader: React.FC<{
  isLoading?: boolean;
  errorMessage?: string;
  children: JSX.Element;
}> = ({ isLoading, errorMessage, children }) => {
  if (errorMessage) {
    return <div>{errorMessage}</div>;
  }
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return children;
};

export default PageLoader;
