export interface SessionUserProps {
  user: {
    id: string;
    name: string;
    email: string;
    username: string;
    image: string;
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
