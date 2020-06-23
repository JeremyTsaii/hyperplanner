import gql from 'graphql-tag'
import * as ApolloReactCommon from '@apollo/react-common'
import * as ApolloReactHooks from '@apollo/react-hooks'

export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  numeric: any
  timestamptz: any
}

/** expression to compare columns of type Boolean. All fields are combined with logical 'AND'. */
export type Boolean_Comparison_Exp = {
  _eq?: Maybe<Scalars['Boolean']>
  _gt?: Maybe<Scalars['Boolean']>
  _gte?: Maybe<Scalars['Boolean']>
  _in?: Maybe<Array<Scalars['Boolean']>>
  _is_null?: Maybe<Scalars['Boolean']>
  _lt?: Maybe<Scalars['Boolean']>
  _lte?: Maybe<Scalars['Boolean']>
  _neq?: Maybe<Scalars['Boolean']>
  _nin?: Maybe<Array<Scalars['Boolean']>>
}

/** expression to compare columns of type Int. All fields are combined with logical 'AND'. */
export type Int_Comparison_Exp = {
  _eq?: Maybe<Scalars['Int']>
  _gt?: Maybe<Scalars['Int']>
  _gte?: Maybe<Scalars['Int']>
  _in?: Maybe<Array<Scalars['Int']>>
  _is_null?: Maybe<Scalars['Boolean']>
  _lt?: Maybe<Scalars['Int']>
  _lte?: Maybe<Scalars['Int']>
  _neq?: Maybe<Scalars['Int']>
  _nin?: Maybe<Array<Scalars['Int']>>
}

/** expression to compare columns of type String. All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: Maybe<Scalars['String']>
  _gt?: Maybe<Scalars['String']>
  _gte?: Maybe<Scalars['String']>
  _ilike?: Maybe<Scalars['String']>
  _in?: Maybe<Array<Scalars['String']>>
  _is_null?: Maybe<Scalars['Boolean']>
  _like?: Maybe<Scalars['String']>
  _lt?: Maybe<Scalars['String']>
  _lte?: Maybe<Scalars['String']>
  _neq?: Maybe<Scalars['String']>
  _nilike?: Maybe<Scalars['String']>
  _nin?: Maybe<Array<Scalars['String']>>
  _nlike?: Maybe<Scalars['String']>
  _nsimilar?: Maybe<Scalars['String']>
  _similar?: Maybe<Scalars['String']>
}

/** columns and relationships of "courses" */
export type Courses = {
  __typename?: 'courses'
  campus: Scalars['String']
  code: Scalars['String']
  credits: Scalars['numeric']
  term: Scalars['String']
  title: Scalars['String']
  type: Scalars['String']
  /** An object relationship */
  user: Users
  user_id: Scalars['String']
  writ_inten: Scalars['Boolean']
}

/** aggregated selection of "courses" */
export type Courses_Aggregate = {
  __typename?: 'courses_aggregate'
  aggregate?: Maybe<Courses_Aggregate_Fields>
  nodes: Array<Courses>
}

/** aggregate fields of "courses" */
export type Courses_Aggregate_Fields = {
  __typename?: 'courses_aggregate_fields'
  avg?: Maybe<Courses_Avg_Fields>
  count?: Maybe<Scalars['Int']>
  max?: Maybe<Courses_Max_Fields>
  min?: Maybe<Courses_Min_Fields>
  stddev?: Maybe<Courses_Stddev_Fields>
  stddev_pop?: Maybe<Courses_Stddev_Pop_Fields>
  stddev_samp?: Maybe<Courses_Stddev_Samp_Fields>
  sum?: Maybe<Courses_Sum_Fields>
  var_pop?: Maybe<Courses_Var_Pop_Fields>
  var_samp?: Maybe<Courses_Var_Samp_Fields>
  variance?: Maybe<Courses_Variance_Fields>
}

/** aggregate fields of "courses" */
export type Courses_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Courses_Select_Column>>
  distinct?: Maybe<Scalars['Boolean']>
}

/** order by aggregate values of table "courses" */
export type Courses_Aggregate_Order_By = {
  avg?: Maybe<Courses_Avg_Order_By>
  count?: Maybe<Order_By>
  max?: Maybe<Courses_Max_Order_By>
  min?: Maybe<Courses_Min_Order_By>
  stddev?: Maybe<Courses_Stddev_Order_By>
  stddev_pop?: Maybe<Courses_Stddev_Pop_Order_By>
  stddev_samp?: Maybe<Courses_Stddev_Samp_Order_By>
  sum?: Maybe<Courses_Sum_Order_By>
  var_pop?: Maybe<Courses_Var_Pop_Order_By>
  var_samp?: Maybe<Courses_Var_Samp_Order_By>
  variance?: Maybe<Courses_Variance_Order_By>
}

/** input type for inserting array relation for remote table "courses" */
export type Courses_Arr_Rel_Insert_Input = {
  data: Array<Courses_Insert_Input>
  on_conflict?: Maybe<Courses_On_Conflict>
}

/** aggregate avg on columns */
export type Courses_Avg_Fields = {
  __typename?: 'courses_avg_fields'
  credits?: Maybe<Scalars['Float']>
}

/** order by avg() on columns of table "courses" */
export type Courses_Avg_Order_By = {
  credits?: Maybe<Order_By>
}

/** Boolean expression to filter rows from the table "courses". All fields are combined with a logical 'AND'. */
export type Courses_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Courses_Bool_Exp>>>
  _not?: Maybe<Courses_Bool_Exp>
  _or?: Maybe<Array<Maybe<Courses_Bool_Exp>>>
  campus?: Maybe<String_Comparison_Exp>
  code?: Maybe<String_Comparison_Exp>
  credits?: Maybe<Numeric_Comparison_Exp>
  term?: Maybe<String_Comparison_Exp>
  title?: Maybe<String_Comparison_Exp>
  type?: Maybe<String_Comparison_Exp>
  user?: Maybe<Users_Bool_Exp>
  user_id?: Maybe<String_Comparison_Exp>
  writ_inten?: Maybe<Boolean_Comparison_Exp>
}

/** unique or primary key constraints on table "courses" */
export enum Courses_Constraint {
  /** unique or primary key constraint */
  CoursesPkey = 'courses_pkey',
}

/** input type for incrementing integer column in table "courses" */
export type Courses_Inc_Input = {
  credits?: Maybe<Scalars['numeric']>
}

/** input type for inserting data into table "courses" */
export type Courses_Insert_Input = {
  campus?: Maybe<Scalars['String']>
  code?: Maybe<Scalars['String']>
  credits?: Maybe<Scalars['numeric']>
  term?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  type?: Maybe<Scalars['String']>
  user?: Maybe<Users_Obj_Rel_Insert_Input>
  user_id?: Maybe<Scalars['String']>
  writ_inten?: Maybe<Scalars['Boolean']>
}

/** aggregate max on columns */
export type Courses_Max_Fields = {
  __typename?: 'courses_max_fields'
  campus?: Maybe<Scalars['String']>
  code?: Maybe<Scalars['String']>
  credits?: Maybe<Scalars['numeric']>
  term?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  type?: Maybe<Scalars['String']>
  user_id?: Maybe<Scalars['String']>
}

/** order by max() on columns of table "courses" */
export type Courses_Max_Order_By = {
  campus?: Maybe<Order_By>
  code?: Maybe<Order_By>
  credits?: Maybe<Order_By>
  term?: Maybe<Order_By>
  title?: Maybe<Order_By>
  type?: Maybe<Order_By>
  user_id?: Maybe<Order_By>
}

/** aggregate min on columns */
export type Courses_Min_Fields = {
  __typename?: 'courses_min_fields'
  campus?: Maybe<Scalars['String']>
  code?: Maybe<Scalars['String']>
  credits?: Maybe<Scalars['numeric']>
  term?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  type?: Maybe<Scalars['String']>
  user_id?: Maybe<Scalars['String']>
}

/** order by min() on columns of table "courses" */
export type Courses_Min_Order_By = {
  campus?: Maybe<Order_By>
  code?: Maybe<Order_By>
  credits?: Maybe<Order_By>
  term?: Maybe<Order_By>
  title?: Maybe<Order_By>
  type?: Maybe<Order_By>
  user_id?: Maybe<Order_By>
}

/** response of any mutation on the table "courses" */
export type Courses_Mutation_Response = {
  __typename?: 'courses_mutation_response'
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int']
  /** data of the affected rows by the mutation */
  returning: Array<Courses>
}

/** input type for inserting object relation for remote table "courses" */
export type Courses_Obj_Rel_Insert_Input = {
  data: Courses_Insert_Input
  on_conflict?: Maybe<Courses_On_Conflict>
}

/** on conflict condition type for table "courses" */
export type Courses_On_Conflict = {
  constraint: Courses_Constraint
  update_columns: Array<Courses_Update_Column>
  where?: Maybe<Courses_Bool_Exp>
}

/** ordering options when selecting data from "courses" */
export type Courses_Order_By = {
  campus?: Maybe<Order_By>
  code?: Maybe<Order_By>
  credits?: Maybe<Order_By>
  term?: Maybe<Order_By>
  title?: Maybe<Order_By>
  type?: Maybe<Order_By>
  user?: Maybe<Users_Order_By>
  user_id?: Maybe<Order_By>
  writ_inten?: Maybe<Order_By>
}

/** primary key columns input for table: "courses" */
export type Courses_Pk_Columns_Input = {
  term: Scalars['String']
  title: Scalars['String']
  user_id: Scalars['String']
}

/** select columns of table "courses" */
export enum Courses_Select_Column {
  /** column name */
  Campus = 'campus',
  /** column name */
  Code = 'code',
  /** column name */
  Credits = 'credits',
  /** column name */
  Term = 'term',
  /** column name */
  Title = 'title',
  /** column name */
  Type = 'type',
  /** column name */
  UserId = 'user_id',
  /** column name */
  WritInten = 'writ_inten',
}

/** input type for updating data in table "courses" */
export type Courses_Set_Input = {
  campus?: Maybe<Scalars['String']>
  code?: Maybe<Scalars['String']>
  credits?: Maybe<Scalars['numeric']>
  term?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  type?: Maybe<Scalars['String']>
  user_id?: Maybe<Scalars['String']>
  writ_inten?: Maybe<Scalars['Boolean']>
}

/** aggregate stddev on columns */
export type Courses_Stddev_Fields = {
  __typename?: 'courses_stddev_fields'
  credits?: Maybe<Scalars['Float']>
}

/** order by stddev() on columns of table "courses" */
export type Courses_Stddev_Order_By = {
  credits?: Maybe<Order_By>
}

/** aggregate stddev_pop on columns */
export type Courses_Stddev_Pop_Fields = {
  __typename?: 'courses_stddev_pop_fields'
  credits?: Maybe<Scalars['Float']>
}

/** order by stddev_pop() on columns of table "courses" */
export type Courses_Stddev_Pop_Order_By = {
  credits?: Maybe<Order_By>
}

/** aggregate stddev_samp on columns */
export type Courses_Stddev_Samp_Fields = {
  __typename?: 'courses_stddev_samp_fields'
  credits?: Maybe<Scalars['Float']>
}

/** order by stddev_samp() on columns of table "courses" */
export type Courses_Stddev_Samp_Order_By = {
  credits?: Maybe<Order_By>
}

/** aggregate sum on columns */
export type Courses_Sum_Fields = {
  __typename?: 'courses_sum_fields'
  credits?: Maybe<Scalars['numeric']>
}

/** order by sum() on columns of table "courses" */
export type Courses_Sum_Order_By = {
  credits?: Maybe<Order_By>
}

/** update columns of table "courses" */
export enum Courses_Update_Column {
  /** column name */
  Campus = 'campus',
  /** column name */
  Code = 'code',
  /** column name */
  Credits = 'credits',
  /** column name */
  Term = 'term',
  /** column name */
  Title = 'title',
  /** column name */
  Type = 'type',
  /** column name */
  UserId = 'user_id',
  /** column name */
  WritInten = 'writ_inten',
}

/** aggregate var_pop on columns */
export type Courses_Var_Pop_Fields = {
  __typename?: 'courses_var_pop_fields'
  credits?: Maybe<Scalars['Float']>
}

/** order by var_pop() on columns of table "courses" */
export type Courses_Var_Pop_Order_By = {
  credits?: Maybe<Order_By>
}

/** aggregate var_samp on columns */
export type Courses_Var_Samp_Fields = {
  __typename?: 'courses_var_samp_fields'
  credits?: Maybe<Scalars['Float']>
}

/** order by var_samp() on columns of table "courses" */
export type Courses_Var_Samp_Order_By = {
  credits?: Maybe<Order_By>
}

/** aggregate variance on columns */
export type Courses_Variance_Fields = {
  __typename?: 'courses_variance_fields'
  credits?: Maybe<Scalars['Float']>
}

/** order by variance() on columns of table "courses" */
export type Courses_Variance_Order_By = {
  credits?: Maybe<Order_By>
}

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root'
  /** delete data from the table: "courses" */
  delete_courses?: Maybe<Courses_Mutation_Response>
  /** delete single row from the table: "courses" */
  delete_courses_by_pk?: Maybe<Courses>
  /** delete data from the table: "online_users" */
  delete_online_users?: Maybe<Online_Users_Mutation_Response>
  /** delete data from the table: "users" */
  delete_users?: Maybe<Users_Mutation_Response>
  /** delete single row from the table: "users" */
  delete_users_by_pk?: Maybe<Users>
  /** insert data into the table: "courses" */
  insert_courses?: Maybe<Courses_Mutation_Response>
  /** insert a single row into the table: "courses" */
  insert_courses_one?: Maybe<Courses>
  /** insert data into the table: "online_users" */
  insert_online_users?: Maybe<Online_Users_Mutation_Response>
  /** insert a single row into the table: "online_users" */
  insert_online_users_one?: Maybe<Online_Users>
  /** insert data into the table: "users" */
  insert_users?: Maybe<Users_Mutation_Response>
  /** insert a single row into the table: "users" */
  insert_users_one?: Maybe<Users>
  /** update data of the table: "courses" */
  update_courses?: Maybe<Courses_Mutation_Response>
  /** update single row of the table: "courses" */
  update_courses_by_pk?: Maybe<Courses>
  /** update data of the table: "online_users" */
  update_online_users?: Maybe<Online_Users_Mutation_Response>
  /** update data of the table: "users" */
  update_users?: Maybe<Users_Mutation_Response>
  /** update single row of the table: "users" */
  update_users_by_pk?: Maybe<Users>
}

/** mutation root */
export type Mutation_RootDelete_CoursesArgs = {
  where: Courses_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Courses_By_PkArgs = {
  term: Scalars['String']
  title: Scalars['String']
  user_id: Scalars['String']
}

/** mutation root */
export type Mutation_RootDelete_Online_UsersArgs = {
  where: Online_Users_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_UsersArgs = {
  where: Users_Bool_Exp
}

/** mutation root */
export type Mutation_RootDelete_Users_By_PkArgs = {
  auth0_id: Scalars['String']
}

/** mutation root */
export type Mutation_RootInsert_CoursesArgs = {
  objects: Array<Courses_Insert_Input>
  on_conflict?: Maybe<Courses_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Courses_OneArgs = {
  object: Courses_Insert_Input
  on_conflict?: Maybe<Courses_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Online_UsersArgs = {
  objects: Array<Online_Users_Insert_Input>
}

/** mutation root */
export type Mutation_RootInsert_Online_Users_OneArgs = {
  object: Online_Users_Insert_Input
}

/** mutation root */
export type Mutation_RootInsert_UsersArgs = {
  objects: Array<Users_Insert_Input>
  on_conflict?: Maybe<Users_On_Conflict>
}

/** mutation root */
export type Mutation_RootInsert_Users_OneArgs = {
  object: Users_Insert_Input
  on_conflict?: Maybe<Users_On_Conflict>
}

/** mutation root */
export type Mutation_RootUpdate_CoursesArgs = {
  _inc?: Maybe<Courses_Inc_Input>
  _set?: Maybe<Courses_Set_Input>
  where: Courses_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Courses_By_PkArgs = {
  _inc?: Maybe<Courses_Inc_Input>
  _set?: Maybe<Courses_Set_Input>
  pk_columns: Courses_Pk_Columns_Input
}

/** mutation root */
export type Mutation_RootUpdate_Online_UsersArgs = {
  _set?: Maybe<Online_Users_Set_Input>
  where: Online_Users_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_UsersArgs = {
  _inc?: Maybe<Users_Inc_Input>
  _set?: Maybe<Users_Set_Input>
  where: Users_Bool_Exp
}

/** mutation root */
export type Mutation_RootUpdate_Users_By_PkArgs = {
  _inc?: Maybe<Users_Inc_Input>
  _set?: Maybe<Users_Set_Input>
  pk_columns: Users_Pk_Columns_Input
}

/** expression to compare columns of type numeric. All fields are combined with logical 'AND'. */
export type Numeric_Comparison_Exp = {
  _eq?: Maybe<Scalars['numeric']>
  _gt?: Maybe<Scalars['numeric']>
  _gte?: Maybe<Scalars['numeric']>
  _in?: Maybe<Array<Scalars['numeric']>>
  _is_null?: Maybe<Scalars['Boolean']>
  _lt?: Maybe<Scalars['numeric']>
  _lte?: Maybe<Scalars['numeric']>
  _neq?: Maybe<Scalars['numeric']>
  _nin?: Maybe<Array<Scalars['numeric']>>
}

/** columns and relationships of "online_users" */
export type Online_Users = {
  __typename?: 'online_users'
  last_seen?: Maybe<Scalars['timestamptz']>
  name?: Maybe<Scalars['String']>
}

/** aggregated selection of "online_users" */
export type Online_Users_Aggregate = {
  __typename?: 'online_users_aggregate'
  aggregate?: Maybe<Online_Users_Aggregate_Fields>
  nodes: Array<Online_Users>
}

/** aggregate fields of "online_users" */
export type Online_Users_Aggregate_Fields = {
  __typename?: 'online_users_aggregate_fields'
  count?: Maybe<Scalars['Int']>
  max?: Maybe<Online_Users_Max_Fields>
  min?: Maybe<Online_Users_Min_Fields>
}

/** aggregate fields of "online_users" */
export type Online_Users_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Online_Users_Select_Column>>
  distinct?: Maybe<Scalars['Boolean']>
}

/** order by aggregate values of table "online_users" */
export type Online_Users_Aggregate_Order_By = {
  count?: Maybe<Order_By>
  max?: Maybe<Online_Users_Max_Order_By>
  min?: Maybe<Online_Users_Min_Order_By>
}

/** input type for inserting array relation for remote table "online_users" */
export type Online_Users_Arr_Rel_Insert_Input = {
  data: Array<Online_Users_Insert_Input>
}

/** Boolean expression to filter rows from the table "online_users". All fields are combined with a logical 'AND'. */
export type Online_Users_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Online_Users_Bool_Exp>>>
  _not?: Maybe<Online_Users_Bool_Exp>
  _or?: Maybe<Array<Maybe<Online_Users_Bool_Exp>>>
  last_seen?: Maybe<Timestamptz_Comparison_Exp>
  name?: Maybe<String_Comparison_Exp>
}

/** input type for inserting data into table "online_users" */
export type Online_Users_Insert_Input = {
  last_seen?: Maybe<Scalars['timestamptz']>
  name?: Maybe<Scalars['String']>
}

/** aggregate max on columns */
export type Online_Users_Max_Fields = {
  __typename?: 'online_users_max_fields'
  last_seen?: Maybe<Scalars['timestamptz']>
  name?: Maybe<Scalars['String']>
}

/** order by max() on columns of table "online_users" */
export type Online_Users_Max_Order_By = {
  last_seen?: Maybe<Order_By>
  name?: Maybe<Order_By>
}

/** aggregate min on columns */
export type Online_Users_Min_Fields = {
  __typename?: 'online_users_min_fields'
  last_seen?: Maybe<Scalars['timestamptz']>
  name?: Maybe<Scalars['String']>
}

/** order by min() on columns of table "online_users" */
export type Online_Users_Min_Order_By = {
  last_seen?: Maybe<Order_By>
  name?: Maybe<Order_By>
}

/** response of any mutation on the table "online_users" */
export type Online_Users_Mutation_Response = {
  __typename?: 'online_users_mutation_response'
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int']
  /** data of the affected rows by the mutation */
  returning: Array<Online_Users>
}

/** input type for inserting object relation for remote table "online_users" */
export type Online_Users_Obj_Rel_Insert_Input = {
  data: Online_Users_Insert_Input
}

/** ordering options when selecting data from "online_users" */
export type Online_Users_Order_By = {
  last_seen?: Maybe<Order_By>
  name?: Maybe<Order_By>
}

/** select columns of table "online_users" */
export enum Online_Users_Select_Column {
  /** column name */
  LastSeen = 'last_seen',
  /** column name */
  Name = 'name',
}

/** input type for updating data in table "online_users" */
export type Online_Users_Set_Input = {
  last_seen?: Maybe<Scalars['timestamptz']>
  name?: Maybe<Scalars['String']>
}

/** column ordering options */
export enum Order_By {
  /** in the ascending order, nulls last */
  Asc = 'asc',
  /** in the ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in the ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in the descending order, nulls first */
  Desc = 'desc',
  /** in the descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in the descending order, nulls last */
  DescNullsLast = 'desc_nulls_last',
}

/** query root */
export type Query_Root = {
  __typename?: 'query_root'
  /** fetch data from the table: "courses" */
  courses: Array<Courses>
  /** fetch aggregated fields from the table: "courses" */
  courses_aggregate: Courses_Aggregate
  /** fetch data from the table: "courses" using primary key columns */
  courses_by_pk?: Maybe<Courses>
  /** fetch data from the table: "online_users" */
  online_users: Array<Online_Users>
  /** fetch aggregated fields from the table: "online_users" */
  online_users_aggregate: Online_Users_Aggregate
  /** fetch data from the table: "users" */
  users: Array<Users>
  /** fetch aggregated fields from the table: "users" */
  users_aggregate: Users_Aggregate
  /** fetch data from the table: "users" using primary key columns */
  users_by_pk?: Maybe<Users>
}

/** query root */
export type Query_RootCoursesArgs = {
  distinct_on?: Maybe<Array<Courses_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Courses_Order_By>>
  where?: Maybe<Courses_Bool_Exp>
}

/** query root */
export type Query_RootCourses_AggregateArgs = {
  distinct_on?: Maybe<Array<Courses_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Courses_Order_By>>
  where?: Maybe<Courses_Bool_Exp>
}

/** query root */
export type Query_RootCourses_By_PkArgs = {
  term: Scalars['String']
  title: Scalars['String']
  user_id: Scalars['String']
}

/** query root */
export type Query_RootOnline_UsersArgs = {
  distinct_on?: Maybe<Array<Online_Users_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Online_Users_Order_By>>
  where?: Maybe<Online_Users_Bool_Exp>
}

/** query root */
export type Query_RootOnline_Users_AggregateArgs = {
  distinct_on?: Maybe<Array<Online_Users_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Online_Users_Order_By>>
  where?: Maybe<Online_Users_Bool_Exp>
}

/** query root */
export type Query_RootUsersArgs = {
  distinct_on?: Maybe<Array<Users_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Users_Order_By>>
  where?: Maybe<Users_Bool_Exp>
}

/** query root */
export type Query_RootUsers_AggregateArgs = {
  distinct_on?: Maybe<Array<Users_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Users_Order_By>>
  where?: Maybe<Users_Bool_Exp>
}

/** query root */
export type Query_RootUsers_By_PkArgs = {
  auth0_id: Scalars['String']
}

/** subscription root */
export type Subscription_Root = {
  __typename?: 'subscription_root'
  /** fetch data from the table: "courses" */
  courses: Array<Courses>
  /** fetch aggregated fields from the table: "courses" */
  courses_aggregate: Courses_Aggregate
  /** fetch data from the table: "courses" using primary key columns */
  courses_by_pk?: Maybe<Courses>
  /** fetch data from the table: "online_users" */
  online_users: Array<Online_Users>
  /** fetch aggregated fields from the table: "online_users" */
  online_users_aggregate: Online_Users_Aggregate
  /** fetch data from the table: "users" */
  users: Array<Users>
  /** fetch aggregated fields from the table: "users" */
  users_aggregate: Users_Aggregate
  /** fetch data from the table: "users" using primary key columns */
  users_by_pk?: Maybe<Users>
}

/** subscription root */
export type Subscription_RootCoursesArgs = {
  distinct_on?: Maybe<Array<Courses_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Courses_Order_By>>
  where?: Maybe<Courses_Bool_Exp>
}

/** subscription root */
export type Subscription_RootCourses_AggregateArgs = {
  distinct_on?: Maybe<Array<Courses_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Courses_Order_By>>
  where?: Maybe<Courses_Bool_Exp>
}

/** subscription root */
export type Subscription_RootCourses_By_PkArgs = {
  term: Scalars['String']
  title: Scalars['String']
  user_id: Scalars['String']
}

/** subscription root */
export type Subscription_RootOnline_UsersArgs = {
  distinct_on?: Maybe<Array<Online_Users_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Online_Users_Order_By>>
  where?: Maybe<Online_Users_Bool_Exp>
}

/** subscription root */
export type Subscription_RootOnline_Users_AggregateArgs = {
  distinct_on?: Maybe<Array<Online_Users_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Online_Users_Order_By>>
  where?: Maybe<Online_Users_Bool_Exp>
}

/** subscription root */
export type Subscription_RootUsersArgs = {
  distinct_on?: Maybe<Array<Users_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Users_Order_By>>
  where?: Maybe<Users_Bool_Exp>
}

/** subscription root */
export type Subscription_RootUsers_AggregateArgs = {
  distinct_on?: Maybe<Array<Users_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Users_Order_By>>
  where?: Maybe<Users_Bool_Exp>
}

/** subscription root */
export type Subscription_RootUsers_By_PkArgs = {
  auth0_id: Scalars['String']
}

/** expression to compare columns of type timestamptz. All fields are combined with logical 'AND'. */
export type Timestamptz_Comparison_Exp = {
  _eq?: Maybe<Scalars['timestamptz']>
  _gt?: Maybe<Scalars['timestamptz']>
  _gte?: Maybe<Scalars['timestamptz']>
  _in?: Maybe<Array<Scalars['timestamptz']>>
  _is_null?: Maybe<Scalars['Boolean']>
  _lt?: Maybe<Scalars['timestamptz']>
  _lte?: Maybe<Scalars['timestamptz']>
  _neq?: Maybe<Scalars['timestamptz']>
  _nin?: Maybe<Array<Scalars['timestamptz']>>
}

/** columns and relationships of "users" */
export type Users = {
  __typename?: 'users'
  auth0_id: Scalars['String']
  concentration?: Maybe<Scalars['String']>
  /** An array relationship */
  courses: Array<Courses>
  /** An aggregated array relationship */
  courses_aggregate: Courses_Aggregate
  created_at: Scalars['timestamptz']
  email?: Maybe<Scalars['String']>
  grad_year?: Maybe<Scalars['Int']>
  id: Scalars['Int']
  last_seen: Scalars['timestamptz']
  major?: Maybe<Scalars['String']>
  name: Scalars['String']
  school?: Maybe<Scalars['String']>
}

/** columns and relationships of "users" */
export type UsersCoursesArgs = {
  distinct_on?: Maybe<Array<Courses_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Courses_Order_By>>
  where?: Maybe<Courses_Bool_Exp>
}

/** columns and relationships of "users" */
export type UsersCourses_AggregateArgs = {
  distinct_on?: Maybe<Array<Courses_Select_Column>>
  limit?: Maybe<Scalars['Int']>
  offset?: Maybe<Scalars['Int']>
  order_by?: Maybe<Array<Courses_Order_By>>
  where?: Maybe<Courses_Bool_Exp>
}

/** aggregated selection of "users" */
export type Users_Aggregate = {
  __typename?: 'users_aggregate'
  aggregate?: Maybe<Users_Aggregate_Fields>
  nodes: Array<Users>
}

/** aggregate fields of "users" */
export type Users_Aggregate_Fields = {
  __typename?: 'users_aggregate_fields'
  avg?: Maybe<Users_Avg_Fields>
  count?: Maybe<Scalars['Int']>
  max?: Maybe<Users_Max_Fields>
  min?: Maybe<Users_Min_Fields>
  stddev?: Maybe<Users_Stddev_Fields>
  stddev_pop?: Maybe<Users_Stddev_Pop_Fields>
  stddev_samp?: Maybe<Users_Stddev_Samp_Fields>
  sum?: Maybe<Users_Sum_Fields>
  var_pop?: Maybe<Users_Var_Pop_Fields>
  var_samp?: Maybe<Users_Var_Samp_Fields>
  variance?: Maybe<Users_Variance_Fields>
}

/** aggregate fields of "users" */
export type Users_Aggregate_FieldsCountArgs = {
  columns?: Maybe<Array<Users_Select_Column>>
  distinct?: Maybe<Scalars['Boolean']>
}

/** order by aggregate values of table "users" */
export type Users_Aggregate_Order_By = {
  avg?: Maybe<Users_Avg_Order_By>
  count?: Maybe<Order_By>
  max?: Maybe<Users_Max_Order_By>
  min?: Maybe<Users_Min_Order_By>
  stddev?: Maybe<Users_Stddev_Order_By>
  stddev_pop?: Maybe<Users_Stddev_Pop_Order_By>
  stddev_samp?: Maybe<Users_Stddev_Samp_Order_By>
  sum?: Maybe<Users_Sum_Order_By>
  var_pop?: Maybe<Users_Var_Pop_Order_By>
  var_samp?: Maybe<Users_Var_Samp_Order_By>
  variance?: Maybe<Users_Variance_Order_By>
}

/** input type for inserting array relation for remote table "users" */
export type Users_Arr_Rel_Insert_Input = {
  data: Array<Users_Insert_Input>
  on_conflict?: Maybe<Users_On_Conflict>
}

/** aggregate avg on columns */
export type Users_Avg_Fields = {
  __typename?: 'users_avg_fields'
  grad_year?: Maybe<Scalars['Float']>
  id?: Maybe<Scalars['Float']>
}

/** order by avg() on columns of table "users" */
export type Users_Avg_Order_By = {
  grad_year?: Maybe<Order_By>
  id?: Maybe<Order_By>
}

/** Boolean expression to filter rows from the table "users". All fields are combined with a logical 'AND'. */
export type Users_Bool_Exp = {
  _and?: Maybe<Array<Maybe<Users_Bool_Exp>>>
  _not?: Maybe<Users_Bool_Exp>
  _or?: Maybe<Array<Maybe<Users_Bool_Exp>>>
  auth0_id?: Maybe<String_Comparison_Exp>
  concentration?: Maybe<String_Comparison_Exp>
  courses?: Maybe<Courses_Bool_Exp>
  created_at?: Maybe<Timestamptz_Comparison_Exp>
  email?: Maybe<String_Comparison_Exp>
  grad_year?: Maybe<Int_Comparison_Exp>
  id?: Maybe<Int_Comparison_Exp>
  last_seen?: Maybe<Timestamptz_Comparison_Exp>
  major?: Maybe<String_Comparison_Exp>
  name?: Maybe<String_Comparison_Exp>
  school?: Maybe<String_Comparison_Exp>
}

/** unique or primary key constraints on table "users" */
export enum Users_Constraint {
  /** unique or primary key constraint */
  UsersPkey = 'users_pkey',
}

/** input type for incrementing integer column in table "users" */
export type Users_Inc_Input = {
  grad_year?: Maybe<Scalars['Int']>
  id?: Maybe<Scalars['Int']>
}

/** input type for inserting data into table "users" */
export type Users_Insert_Input = {
  auth0_id?: Maybe<Scalars['String']>
  concentration?: Maybe<Scalars['String']>
  courses?: Maybe<Courses_Arr_Rel_Insert_Input>
  created_at?: Maybe<Scalars['timestamptz']>
  email?: Maybe<Scalars['String']>
  grad_year?: Maybe<Scalars['Int']>
  id?: Maybe<Scalars['Int']>
  last_seen?: Maybe<Scalars['timestamptz']>
  major?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  school?: Maybe<Scalars['String']>
}

/** aggregate max on columns */
export type Users_Max_Fields = {
  __typename?: 'users_max_fields'
  auth0_id?: Maybe<Scalars['String']>
  concentration?: Maybe<Scalars['String']>
  created_at?: Maybe<Scalars['timestamptz']>
  email?: Maybe<Scalars['String']>
  grad_year?: Maybe<Scalars['Int']>
  id?: Maybe<Scalars['Int']>
  last_seen?: Maybe<Scalars['timestamptz']>
  major?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  school?: Maybe<Scalars['String']>
}

/** order by max() on columns of table "users" */
export type Users_Max_Order_By = {
  auth0_id?: Maybe<Order_By>
  concentration?: Maybe<Order_By>
  created_at?: Maybe<Order_By>
  email?: Maybe<Order_By>
  grad_year?: Maybe<Order_By>
  id?: Maybe<Order_By>
  last_seen?: Maybe<Order_By>
  major?: Maybe<Order_By>
  name?: Maybe<Order_By>
  school?: Maybe<Order_By>
}

/** aggregate min on columns */
export type Users_Min_Fields = {
  __typename?: 'users_min_fields'
  auth0_id?: Maybe<Scalars['String']>
  concentration?: Maybe<Scalars['String']>
  created_at?: Maybe<Scalars['timestamptz']>
  email?: Maybe<Scalars['String']>
  grad_year?: Maybe<Scalars['Int']>
  id?: Maybe<Scalars['Int']>
  last_seen?: Maybe<Scalars['timestamptz']>
  major?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  school?: Maybe<Scalars['String']>
}

/** order by min() on columns of table "users" */
export type Users_Min_Order_By = {
  auth0_id?: Maybe<Order_By>
  concentration?: Maybe<Order_By>
  created_at?: Maybe<Order_By>
  email?: Maybe<Order_By>
  grad_year?: Maybe<Order_By>
  id?: Maybe<Order_By>
  last_seen?: Maybe<Order_By>
  major?: Maybe<Order_By>
  name?: Maybe<Order_By>
  school?: Maybe<Order_By>
}

/** response of any mutation on the table "users" */
export type Users_Mutation_Response = {
  __typename?: 'users_mutation_response'
  /** number of affected rows by the mutation */
  affected_rows: Scalars['Int']
  /** data of the affected rows by the mutation */
  returning: Array<Users>
}

/** input type for inserting object relation for remote table "users" */
export type Users_Obj_Rel_Insert_Input = {
  data: Users_Insert_Input
  on_conflict?: Maybe<Users_On_Conflict>
}

/** on conflict condition type for table "users" */
export type Users_On_Conflict = {
  constraint: Users_Constraint
  update_columns: Array<Users_Update_Column>
  where?: Maybe<Users_Bool_Exp>
}

/** ordering options when selecting data from "users" */
export type Users_Order_By = {
  auth0_id?: Maybe<Order_By>
  concentration?: Maybe<Order_By>
  courses_aggregate?: Maybe<Courses_Aggregate_Order_By>
  created_at?: Maybe<Order_By>
  email?: Maybe<Order_By>
  grad_year?: Maybe<Order_By>
  id?: Maybe<Order_By>
  last_seen?: Maybe<Order_By>
  major?: Maybe<Order_By>
  name?: Maybe<Order_By>
  school?: Maybe<Order_By>
}

/** primary key columns input for table: "users" */
export type Users_Pk_Columns_Input = {
  auth0_id: Scalars['String']
}

/** select columns of table "users" */
export enum Users_Select_Column {
  /** column name */
  Auth0Id = 'auth0_id',
  /** column name */
  Concentration = 'concentration',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Email = 'email',
  /** column name */
  GradYear = 'grad_year',
  /** column name */
  Id = 'id',
  /** column name */
  LastSeen = 'last_seen',
  /** column name */
  Major = 'major',
  /** column name */
  Name = 'name',
  /** column name */
  School = 'school',
}

/** input type for updating data in table "users" */
export type Users_Set_Input = {
  auth0_id?: Maybe<Scalars['String']>
  concentration?: Maybe<Scalars['String']>
  created_at?: Maybe<Scalars['timestamptz']>
  email?: Maybe<Scalars['String']>
  grad_year?: Maybe<Scalars['Int']>
  id?: Maybe<Scalars['Int']>
  last_seen?: Maybe<Scalars['timestamptz']>
  major?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  school?: Maybe<Scalars['String']>
}

/** aggregate stddev on columns */
export type Users_Stddev_Fields = {
  __typename?: 'users_stddev_fields'
  grad_year?: Maybe<Scalars['Float']>
  id?: Maybe<Scalars['Float']>
}

/** order by stddev() on columns of table "users" */
export type Users_Stddev_Order_By = {
  grad_year?: Maybe<Order_By>
  id?: Maybe<Order_By>
}

/** aggregate stddev_pop on columns */
export type Users_Stddev_Pop_Fields = {
  __typename?: 'users_stddev_pop_fields'
  grad_year?: Maybe<Scalars['Float']>
  id?: Maybe<Scalars['Float']>
}

/** order by stddev_pop() on columns of table "users" */
export type Users_Stddev_Pop_Order_By = {
  grad_year?: Maybe<Order_By>
  id?: Maybe<Order_By>
}

/** aggregate stddev_samp on columns */
export type Users_Stddev_Samp_Fields = {
  __typename?: 'users_stddev_samp_fields'
  grad_year?: Maybe<Scalars['Float']>
  id?: Maybe<Scalars['Float']>
}

/** order by stddev_samp() on columns of table "users" */
export type Users_Stddev_Samp_Order_By = {
  grad_year?: Maybe<Order_By>
  id?: Maybe<Order_By>
}

/** aggregate sum on columns */
export type Users_Sum_Fields = {
  __typename?: 'users_sum_fields'
  grad_year?: Maybe<Scalars['Int']>
  id?: Maybe<Scalars['Int']>
}

/** order by sum() on columns of table "users" */
export type Users_Sum_Order_By = {
  grad_year?: Maybe<Order_By>
  id?: Maybe<Order_By>
}

/** update columns of table "users" */
export enum Users_Update_Column {
  /** column name */
  Auth0Id = 'auth0_id',
  /** column name */
  Concentration = 'concentration',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Email = 'email',
  /** column name */
  GradYear = 'grad_year',
  /** column name */
  Id = 'id',
  /** column name */
  LastSeen = 'last_seen',
  /** column name */
  Major = 'major',
  /** column name */
  Name = 'name',
  /** column name */
  School = 'school',
}

/** aggregate var_pop on columns */
export type Users_Var_Pop_Fields = {
  __typename?: 'users_var_pop_fields'
  grad_year?: Maybe<Scalars['Float']>
  id?: Maybe<Scalars['Float']>
}

/** order by var_pop() on columns of table "users" */
export type Users_Var_Pop_Order_By = {
  grad_year?: Maybe<Order_By>
  id?: Maybe<Order_By>
}

/** aggregate var_samp on columns */
export type Users_Var_Samp_Fields = {
  __typename?: 'users_var_samp_fields'
  grad_year?: Maybe<Scalars['Float']>
  id?: Maybe<Scalars['Float']>
}

/** order by var_samp() on columns of table "users" */
export type Users_Var_Samp_Order_By = {
  grad_year?: Maybe<Order_By>
  id?: Maybe<Order_By>
}

/** aggregate variance on columns */
export type Users_Variance_Fields = {
  __typename?: 'users_variance_fields'
  grad_year?: Maybe<Scalars['Float']>
  id?: Maybe<Scalars['Float']>
}

/** order by variance() on columns of table "users" */
export type Users_Variance_Order_By = {
  grad_year?: Maybe<Order_By>
  id?: Maybe<Order_By>
}

export type GetMyCoursesQueryVariables = Exact<{ [key: string]: never }>

export type GetMyCoursesQuery = { __typename?: 'query_root' } & {
  courses: Array<
    { __typename?: 'courses' } & Pick<
      Courses,
      'term' | 'title' | 'code' | 'credits' | 'type' | 'campus' | 'writ_inten'
    >
  >
}

export const GetMyCoursesDocument = gql`
  query getMyCourses {
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

/**
 * __useGetMyCoursesQuery__
 *
 * To run a query within a React component, call `useGetMyCoursesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyCoursesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyCoursesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMyCoursesQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetMyCoursesQuery,
    GetMyCoursesQueryVariables
  >,
) {
  return ApolloReactHooks.useQuery<
    GetMyCoursesQuery,
    GetMyCoursesQueryVariables
  >(GetMyCoursesDocument, baseOptions)
}
export function useGetMyCoursesLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetMyCoursesQuery,
    GetMyCoursesQueryVariables
  >,
) {
  return ApolloReactHooks.useLazyQuery<
    GetMyCoursesQuery,
    GetMyCoursesQueryVariables
  >(GetMyCoursesDocument, baseOptions)
}
export type GetMyCoursesQueryHookResult = ReturnType<
  typeof useGetMyCoursesQuery
>
export type GetMyCoursesLazyQueryHookResult = ReturnType<
  typeof useGetMyCoursesLazyQuery
>
export type GetMyCoursesQueryResult = ApolloReactCommon.QueryResult<
  GetMyCoursesQuery,
  GetMyCoursesQueryVariables
>
