"use client";

import { PostFeedType } from '@/type';
import { Poll as PollType} from '@prisma/client';
import React, { useState } from 'react';

interface PollProps {
  poll: PollType
}

const Poll: React.FC<PollProps> = ({ poll}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="poll flex flex-col gap-1">
      {poll.options.map((option, i) => (
        <label
          key={i}
          htmlFor={`${poll.id}-${option}`}
          className={`text-start text-purple-50 ${selectedOption === option ? 'bg-purple-600/15 text-purple-600 border border-purple-600' : 'bg-purple-200/15'} w-full py-2 rounded-lg px-2 cursor-pointer`}
        >
          {option}
          <input
            type="radio"
            name={poll.id}
            id={`${poll.id}-${option}`}
            hidden
            value={option}
            checked={selectedOption === option}
            onChange={handleRadioChange}
            aria-label={`Select ${option}`}
          />
        </label>
      ))}
      <p className='text-xs text-zinc-500 w-full text-end'>
        {poll.vote_count === 0 ? 'Be the first one to vote' : 
          Intl.NumberFormat("en-US", {
            notation: 'compact',
            maximumFractionDigits: 1
          }).format(poll.vote_count) + ' votes'
        }
      </p>
    </div>
  );
};

export default Poll;
