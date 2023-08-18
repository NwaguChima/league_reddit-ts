import { User } from 'next-auth';
import React from 'react';
import { DropdownMenu, DropdownMenuTrigger } from './ui/DropdownMenu';

interface UserAccountNavProps {
  user: Pick<User, 'name' | 'email' | 'image'>;
}

const UserAccountNav: React.FC<UserAccountNavProps> = ({ user }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar user={user} />
      </DropdownMenuTrigger>
    </DropdownMenu>
  );
};

export default UserAccountNav;
