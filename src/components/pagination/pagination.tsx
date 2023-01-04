import React from 'react';
import classnames from 'classnames';

import './pagination.css';

const Pagination: React.FC<{
  currentPage: number;
  numberOfPages: number;
  goNext: () => void;
  goPrevious: () => void;
  className?: string;
}> = ({ currentPage, numberOfPages, goNext, goPrevious, className }) => {
  return (
    <div className={classnames('Pagination', className)}>
      {currentPage > 1 && (
        <div
          onClick={goPrevious}
          className="Pagination-arrow"
          title="Go to previous page"
        >
          «
        </div>
      )}
      <div>
        {currentPage}/{numberOfPages}
      </div>
      {currentPage < numberOfPages && (
        <div
          onClick={goNext}
          className="Pagination-arrow"
          title="Go to next page"
        >
          »
        </div>
      )}
    </div>
  );
};

export default Pagination;
