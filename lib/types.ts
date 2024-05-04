export interface GetAllUsersParams {
  searchQuery?: string;
  filter?: string;
}

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

export interface GetNotificationsParams {
  userId: string;
}

export interface CreatePostParams {
  user: {
    id: string;
    name: string;
    username: string;
    profileImage: string;
  };
  description: string;
  path: string;
}
