export const parseUser = (userJSON: string) => {
  const user = JSON.parse(userJSON);

  return user;
};
