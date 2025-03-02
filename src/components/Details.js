import React from 'react';

const getTimeElapsed = (dateString) => {
  const launchDate = new Date(dateString);
  const currentDate = new Date();
  const timeDifference = Math.abs(currentDate - launchDate);

  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (years > 0) return `${years} year${years !== 1 ? 's' : ''} ago`;
  if (months > 0) return `${months} month${months !== 1 ? 's' : ''} ago`;
  if (days > 0) return `${days} day${days !== 1 ? 's' : ''} ago`;
  if (hours > 0) return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
  if (minutes > 0) return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
  return `${seconds} second${seconds !== 1 ? 's' : ''} ago`;
};

const LaunchDetails = ({ launch }) => {
  return (
    <div className='launch__details'>
      <div className='flex gap-1'>
        <p>
          {launch.launch_date_utc
            ? `${getTimeElapsed(launch.launch_date_utc)}`
            : 'No launch date available.'}
        </p>
        {launch.links && launch.links.article_link && (
          <>
            <span>{` | `}</span>
            <a
              href={launch.links.article_link}
              target='_blank'
              rel='noopener noreferrer'
            >
              Article
            </a>
          </>
        )}
        {launch.links && launch.links.video_link && (
          <>
            <span>{` | `}</span>
            <a
              href={launch.links.video_link}
              target='_blank'
              rel='noopener noreferrer'
            >
              Video
            </a>
          </>
        )}
      </div>
      <div className='flex gap-4'>
        {launch.links.mission_patch_small ? (
          <img
            src={launch.links.mission_patch_small}
            alt={launch.mission_name}
            onError={(e) => {
              e.target.src = `https://placehold.co/150x170?text=${launch.mission_name}`;
            }}
          />
        ) : (
          <img
            src={`https://placehold.co/150x170?text=No image yet`}
            alt={launch.mission_name}
          />
        )}
        <p className={`text ${launch.details || 'no-content'}`}>
          {launch.details || 'No details available.'}
        </p>
      </div>
    </div>
  );
};

export default LaunchDetails;
