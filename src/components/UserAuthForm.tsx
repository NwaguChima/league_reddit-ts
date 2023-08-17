import React from 'react';
import { Button } from './ui/Button';
import { cn } from '@/lib/utils';

interface UserAuthFormProps extends React.HtmlHTMLAttributes<HTMLDivElement> {}

const UserAuthForm: React.FC<UserAuthFormProps> = ({ className, ...props }) => {
  return (
    <div className={cn('flex justify-center', className)} {...props}>
      <Button size="sm" className="w-full">
        Google
      </Button>
    </div>
  );
};

export default UserAuthForm;
