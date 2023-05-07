import { Dropdown } from 'bootstrap';
import { useState } from 'react';

export const CardFilter = ({ tweets }) => {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const handleFilterChange = selectedOption => {
    setSelectedFilter(selectedOption);
  };

  const filteredTweets = tweets.filter(tweet => {
    return tweet;
    // if (selectedFilter === 'active') {
    //   return tweet;
    // } else if (selectedFilter === 'inactive') {
    //   return !tweet;
    // } else {
    //   return true;
    // }
  });

  return (
    <div>
      <Dropdown onSelect={handleFilterChange} />
      {filteredTweets.map(card => (
        <div key={card.id}>{card.title}</div>
      ))}
    </div>
  );
};
