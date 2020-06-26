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

export const UPDATE_COURSE = gql`
  mutation UPDATE_COURSE(
    $old_title: String!
    $term: String!
    $title: String!
    $code: String!
    $credits: numeric
    $type: String!
    $campus: String!
    $writ_inten: Boolean!
  ) {
    update_courses(
      where: { term: { _eq: $term }, title: { _eq: $old_title } }
      _set: {
        title: $title
        code: $code
        credits: $credits
        type: $type
        campus: $campus
        writ_inten: $writ_inten
      }
    ) {
      affected_rows
      returning {
        term
        title
        code
        credits
        type
        campus
        writ_inten
      }
    }
  }
`

export const ADD_COURSE = gql`
  mutation ADD_COURSE(
    $term: String!
    $title: String!
    $code: String!
    $credits: numeric
    $type: String!
    $campus: String!
    $writ_inten: Boolean!
  ) {
    insert_courses(
      objects: {
        term: $term
        title: $title
        code: $code
        credits: $credits
        type: $type
        campus: $campus
        writ_inten: $writ_inten
      }
    ) {
      affected_rows
      returning {
        term
        title
        code
        credits
        type
        campus
        writ_inten
      }
    }
  }
`
export const REMOVE_COURSE = gql`
  mutation REMOVE_COURSE($term: String!, $title: String!) {
    delete_courses(where: { term: { _eq: $term }, title: { _eq: $title } }) {
      affected_rows
    }
  }
`
