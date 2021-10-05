export const getters = {
  isLoggedIn: ({ userDetails }) => !!userDetails.userId,
};
