import React from 'react';
import { render, screen } from '@testing-library/react';
import PostVoteClient from '@/components/post-vote/PostVoteClient';
import { VoteType } from '@prisma/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Mock axios.patch for testing purposes
jest.mock('axios');

describe('PostVoteClient Component', () => {
  // Mock any necessary functions and data
  const mockProps = {
    postId: '123',
    initialVotesAmt: 10,
    initialVote: 'UP' as VoteType, // Updated to match the prop type
  };

  const queryClient = new QueryClient();

  it('renders with initial vote state', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <PostVoteClient {...mockProps} />
      </QueryClientProvider>
    );

    // Assert that the UP vote button is active
    expect(screen.getByLabelText('upvote')).toBeInTheDocument();
    // Assert that the vote count is displayed
    expect(screen.getByText('10')).toBeInTheDocument();
  });
});
