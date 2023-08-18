import { User } from 'next-auth';
import React from 'react';

interface UserAvatarProps {
  user: Pick<User, 'name' | 'image'>;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ user }) => {
  return <div>UserAvatar</div>;
};

export default UserAvatar;
