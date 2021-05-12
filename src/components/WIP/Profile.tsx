import React from 'react'
import { useAuth0 } from '../../utils/react-auth0-spa'

const Profile = (): JSX.Element => {
  const { loading, user } = useAuth0()

  if (loading || !user) {
    return <div>Loading...</div>
  }

  return (
    <>
      <img src={user.picture} alt="Profile" />

      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <code>{JSON.stringify(user, null, 2)}</code>
    </>
  )
}

export default Profile
