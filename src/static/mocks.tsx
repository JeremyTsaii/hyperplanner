// Used for Auth0 hook
export const mockAuthUser = {
  email: 'johndoe@me.com',
  email_verified: true,
  sub: 'google-oauth2|2147627834623744883746',
}

// Used for UserContext
export const mockUser = {
  nickname: 'jeremy',
  school: 'hmc',
  major: 'cs',
  concentration: 'Economics',
  auth0_id: 'google-oauth2|2147627834623744883746',
  enroll: '2018',
  planned_grad: '2022',
}

export const mockUserContext = {
  loading: false,
  error: undefined,
  data: {
    users: [mockUser],
  },
}
