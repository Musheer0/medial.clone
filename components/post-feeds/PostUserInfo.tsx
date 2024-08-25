
import React from 'react';
import formatTimeDifference from '@/libs/formate/FormateDate';
import PostDropDown from './PostDropDown'; // Import the PostDropDown component
import { PostFeedType } from '@/type';
import Link from 'next/link';

interface UserInfoProps {
  user: {
    image: string;
    name: string;
    id:string;
  };
  createdAt: Date | string;
  post?: PostFeedType; // Accept post prop to pass to PostDropDown
  setIsDeleting?: (isDeleting: boolean) => void; // To manage delete state
}

const UserInfo = ({ user, createdAt, post, setIsDeleting }:UserInfoProps) => {
  return (
    <div className="header flex items-center justify-between">
      <Link href={`/user/profile/${user.id}`}>
      <div className="user gap-2 flex items-center ">
        <img
          src={user.image}
          className="bg-red-500 rounded-full w-[40px] h-[40px]"
          alt="User avatar"
        />
        <div className="text flex flex-col gap-2">
          <p className="font-semibold leading-none text-md">{user.name||'name'}</p>
          <p className="leading-none text-xs text-zinc-500">
            {createdAt ? formatTimeDifference(createdAt) : 'Just now'}
          </p>
        </div>
      </div>
      </Link>
      {/* <PostDropDown post={post} deleting={setIsDeleting} /> */}
    </div>
  );
};

export default UserInfo;
