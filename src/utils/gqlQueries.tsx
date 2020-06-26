import gql from 'graphql-tag'

export const GET_INFO_QUERY = gql`
  query GET_INFO {
    users {
      school
      grad_year
      major
      concentration
      nickname
      auth0_id
    }
  }
`

export const GET_COURSES_QUERY = gql`
  query GET_COURSES {
    courses {
      term
      title
      code
      credits
      type
      campus
      writ_inten
    }
  }
`

export const UPDATE_USER = gql`
  mutation UPDATE_USER(
    $id: String!
    $name: String!
    $school: String!
    $major: String!
    $conc: String!
    $gradYear: Int!
  ) {
    update_users(
      where: { auth0_id: { _eq: $id } }
      _set: {
        nickname: $name
        school: $school
        major: $major
        concentration: $conc
        grad_year: $gradYear
      }
    ) {
      affected_rows
      returning {
        nickname
        school
        major
        concentration
        grad_year
      }
    }
  }
`
