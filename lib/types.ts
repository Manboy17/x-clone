export interface SessionUserProps {
  user: {
    id: string;
    name: string;
    username: string;
    bio: string;
    profileImage: string;
    imageCover: string;
  };
}

export interface UpdateUserParams {
  id: string;
  user: {
    name: string;
    username: string;
    bio: string;
    profileImage: string;
    imageCover: string;
  };
  path: string;
}

export interface FollowUserParams {
  path: string;
  currentUserId: string;
  userIdToFollow: string;
}

export interface UnfollowUserParams {
  path: string;
  currentUserId: string;
  userIdToUnfollow: string;
}
