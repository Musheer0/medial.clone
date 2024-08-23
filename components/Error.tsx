// Ensure the `Error` component is correctly defined and used
import React from 'react';
import { CiWarning } from 'react-icons/ci';

// Ensure this component is used in a client context
const Error = ({ msg }: { msg: string }) => {
  return (
    <div className='flex items-center w-full py-3 px-2 bg-red-600/15 text-red-500 gap-2 rounded-lg text-sm'>
      <CiWarning />
      {msg}
    </div>
  );
};

export default Error;
