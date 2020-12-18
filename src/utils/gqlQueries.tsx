import gql from 'graphql-tag'

// User information
export const GET_INFO_QUERY = gql`
  query GET_INFO {
    users {
      school
      major
      concentration
      nickname
      auth0_id
      majorChecks
      coreChecks
      enroll
      planned_grad
    }
  }
`

export const GET_COURSES_QUERY = gql`
  query GET_COURSES {
    courses(order_by: [{ type: desc }, { code: asc }]) {
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
    $enroll: Int!
    $plannedGrad: String!
  ) {
    update_users(
      where: { auth0_id: { _eq: $id } }
      _set: {
        nickname: $name
        school: $school
        major: $major
        concentration: $conc
        enroll: $enroll
        planned_grad: $plannedGrad
      }
    ) {
      affected_rows
      returning {
        nickname
        school
        major
        concentration
        enroll
        planned_grad
      }
    }
  }
`

export const UPDATE_MAJOR_CHECKS = gql`
  mutation UPDATE_MAJOR_CHECKS($id: String!, $majorChecks: String!) {
    update_users(
      where: { auth0_id: { _eq: $id } }
      _set: { majorChecks: $majorChecks }
    ) {
      affected_rows
      returning {
        majorChecks
      }
    }
  }
`

export const UPDATE_CORE_CHECKS = gql`
  mutation UPDATE_CORE_CHECKS($id: String!, $coreChecks: String!) {
    update_users(
      where: { auth0_id: { _eq: $id } }
      _set: { coreChecks: $coreChecks }
    ) {
      affected_rows
      returning {
        coreChecks
      }
    }
  }
`

export const INCREMENT_COURSE_EDITS_MUTATION = gql`
  mutation INCREMENT_COURSE_EDITS {
    update_users(where: {}, _inc: { course_edits: 1 }) {
      affected_rows
      returning {
        course_edits
      }
    }
  }
`

// Course information
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

export const ADD_MULTIPLE_COURSES = gql`
  mutation ADD_MULTIPLE_COURSES($objects: [courses_insert_input!]!) {
    insert_courses(objects: $objects) {
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

export const REMOVE_ALL_COURSES = gql`
  mutation REMOVE_ALL_COURSES {
    delete_courses(where: {}) {
      affected_rows
    }
  }
`
