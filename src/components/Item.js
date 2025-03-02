import React, { useState } from 'react';
import Details from './Details';

const LaunchItem = ({ launch }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleDetails = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className='launch__item'>
      <div className='flex gap-2'>
        <h2>{launch.mission_name}</h2>
        <span
          className={`launch__status ${
            launch.upcoming === true
              ? 'launch__status--info'
              : launch.launch_success === true
              ? 'launch__status--success'
              : 'launch__status--danger'
          }`}
        >
          {launch.upcoming === true
            ? 'Upcoming'
            : launch.launch_success === true
            ? 'Success'
            : 'Failed'}
        </span>
      </div>
      {isExpanded && <Details launch={launch} />}
      <button
        className='btn btn--primary'
        onClick={toggleDetails}
      >
        {isExpanded ? 'HIDE' : 'VIEW'}
      </button>
    </div>
  );
};

export default LaunchItem;
