'use client';

import React, { startTransition } from 'react';
import { Button } from './ui/Button';
import { useMutation } from '@tanstack/react-query';
import { SubscribeToSubredditPayload } from '@/lib/validators/subreddit';
import axios, { AxiosError } from 'axios';
import useCustomToast from '@/hooks/use-custom-toast';
import { toast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

interface SubscribeLeaveToggleProps {
  subredditId: string;
  subredditName: string;
  isSubscribed: boolean;
}

const SubscribeLeaveToggle: React.FC<SubscribeLeaveToggleProps> = ({
  subredditId,
  subredditName,
  isSubscribed,
}) => {
  const { loginToast } = useCustomToast();
  const router = useRouter();

  const { mutate: subscribe, isLoading: isSubLoading } = useMutation({
    mutationFn: async () => {
      const payload: SubscribeToSubredditPayload = {
        subredditId,
      };

      const { data } = await axios.post('/api/subreddit/subscribe', payload);
      return data as string;
    },

    onError: (error) => {
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          return loginToast();
        } else if (error.response?.status === 400) {
          return toast({
            title: `${error.response.data || 'Something went wrong'}`,
            description: 'Could not subscribe to subreddit',
            variant: 'destructive',
          });
        }
      }

      return toast({
        title: 'There was a problem',
        description: 'Something went wrong, please try again later.',
        variant: 'destructive',
      });
    },

    onSuccess: () => {
      startTransition(() => {
        router.refresh();
      }),
        toast({
          title: 'Subscribed!',
          description: `You are now subscribed to r/${subredditName}`,
        });
    },
  });

  const { mutate: unsubscribe, isLoading: isUnsubLoading } = useMutation({
    mutationFn: async () => {
      const payload: SubscribeToSubredditPayload = {
        subredditId,
      };

      const { data } = await axios.post('/api/subreddit/unsubscribe', payload);
      return data as string;
    },

    onError: (error) => {
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          return loginToast();
        } else if (error.response?.status === 400) {
          return toast({
            title: `${error.response.data || 'Something went wrong'}`,
            description: 'Could not unSubscribe to subreddit',
            variant: 'destructive',
          });
        }
      }

      return toast({
        title: 'There was a problem',
        description: 'Something went wrong, please try again later.',
        variant: 'destructive',
      });
    },

    onSuccess: () => {
      // basically refreshes the page!
      startTransition(() => {
        router.refresh();
      }),
        toast({
          title: 'Unsubscribed!',
          description: `You are now unsubscribed from r/${subredditName}`,
        });
    },
  });

  return isSubscribed ? (
    <Button
      isLoading={isUnsubLoading}
      onClick={() => unsubscribe()}
      className="w-full mt-1 mb-4"
    >
      Leave community
    </Button>
  ) : (
    <Button
      isLoading={isSubLoading}
      onClick={() => subscribe()}
      className="w-full mt-1 mb-4"
    >
      Join to post
    </Button>
  );
};

export default SubscribeLeaveToggle;
