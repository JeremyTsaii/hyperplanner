import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
export type Maybe<T> = T | null
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> }
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
  active: Scalars['Boolean']
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
  active?: Maybe<Boolean_Comparison_Exp>
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
  active?: Maybe<Scalars['Boolean']>
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
  active?: Maybe<Order_By>
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
  Active = 'active',
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
  active?: Maybe<Scalars['Boolean']>
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
  Active = 'active',
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
  coreChecks?: Maybe<Scalars['String']>
  course_edits?: Maybe<Scalars['Int']>
  /** An array relationship */
  courses: Array<Courses>
  /** An aggregated array relationship */
  courses_aggregate: Courses_Aggregate
  created_at: Scalars['timestamptz']
  email?: Maybe<Scalars['String']>
  enroll?: Maybe<Scalars['Int']>
  grad_year?: Maybe<Scalars['Int']>
  id: Scalars['Int']
  last_seen: Scalars['timestamptz']
  major?: Maybe<Scalars['String']>
  majorChecks: Scalars['String']
  name: Scalars['String']
  nickname?: Maybe<Scalars['String']>
  planned_grad?: Maybe<Scalars['String']>
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
  course_edits?: Maybe<Scalars['Float']>
  enroll?: Maybe<Scalars['Float']>
  grad_year?: Maybe<Scalars['Float']>
  id?: Maybe<Scalars['Float']>
}

/** order by avg() on columns of table "users" */
export type Users_Avg_Order_By = {
  course_edits?: Maybe<Order_By>
  enroll?: Maybe<Order_By>
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
  coreChecks?: Maybe<String_Comparison_Exp>
  course_edits?: Maybe<Int_Comparison_Exp>
  courses?: Maybe<Courses_Bool_Exp>
  created_at?: Maybe<Timestamptz_Comparison_Exp>
  email?: Maybe<String_Comparison_Exp>
  enroll?: Maybe<Int_Comparison_Exp>
  grad_year?: Maybe<Int_Comparison_Exp>
  id?: Maybe<Int_Comparison_Exp>
  last_seen?: Maybe<Timestamptz_Comparison_Exp>
  major?: Maybe<String_Comparison_Exp>
  majorChecks?: Maybe<String_Comparison_Exp>
  name?: Maybe<String_Comparison_Exp>
  nickname?: Maybe<String_Comparison_Exp>
  planned_grad?: Maybe<String_Comparison_Exp>
  school?: Maybe<String_Comparison_Exp>
}

/** unique or primary key constraints on table "users" */
export enum Users_Constraint {
  /** unique or primary key constraint */
  UsersPkey = 'users_pkey',
}

/** input type for incrementing integer column in table "users" */
export type Users_Inc_Input = {
  course_edits?: Maybe<Scalars['Int']>
  enroll?: Maybe<Scalars['Int']>
  grad_year?: Maybe<Scalars['Int']>
  id?: Maybe<Scalars['Int']>
}

/** input type for inserting data into table "users" */
export type Users_Insert_Input = {
  auth0_id?: Maybe<Scalars['String']>
  concentration?: Maybe<Scalars['String']>
  coreChecks?: Maybe<Scalars['String']>
  course_edits?: Maybe<Scalars['Int']>
  courses?: Maybe<Courses_Arr_Rel_Insert_Input>
  created_at?: Maybe<Scalars['timestamptz']>
  email?: Maybe<Scalars['String']>
  enroll?: Maybe<Scalars['Int']>
  grad_year?: Maybe<Scalars['Int']>
  id?: Maybe<Scalars['Int']>
  last_seen?: Maybe<Scalars['timestamptz']>
  major?: Maybe<Scalars['String']>
  majorChecks?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  nickname?: Maybe<Scalars['String']>
  planned_grad?: Maybe<Scalars['String']>
  school?: Maybe<Scalars['String']>
}

/** aggregate max on columns */
export type Users_Max_Fields = {
  __typename?: 'users_max_fields'
  auth0_id?: Maybe<Scalars['String']>
  concentration?: Maybe<Scalars['String']>
  coreChecks?: Maybe<Scalars['String']>
  course_edits?: Maybe<Scalars['Int']>
  created_at?: Maybe<Scalars['timestamptz']>
  email?: Maybe<Scalars['String']>
  enroll?: Maybe<Scalars['Int']>
  grad_year?: Maybe<Scalars['Int']>
  id?: Maybe<Scalars['Int']>
  last_seen?: Maybe<Scalars['timestamptz']>
  major?: Maybe<Scalars['String']>
  majorChecks?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  nickname?: Maybe<Scalars['String']>
  planned_grad?: Maybe<Scalars['String']>
  school?: Maybe<Scalars['String']>
}

/** order by max() on columns of table "users" */
export type Users_Max_Order_By = {
  auth0_id?: Maybe<Order_By>
  concentration?: Maybe<Order_By>
  coreChecks?: Maybe<Order_By>
  course_edits?: Maybe<Order_By>
  created_at?: Maybe<Order_By>
  email?: Maybe<Order_By>
  enroll?: Maybe<Order_By>
  grad_year?: Maybe<Order_By>
  id?: Maybe<Order_By>
  last_seen?: Maybe<Order_By>
  major?: Maybe<Order_By>
  majorChecks?: Maybe<Order_By>
  name?: Maybe<Order_By>
  nickname?: Maybe<Order_By>
  planned_grad?: Maybe<Order_By>
  school?: Maybe<Order_By>
}

/** aggregate min on columns */
export type Users_Min_Fields = {
  __typename?: 'users_min_fields'
  auth0_id?: Maybe<Scalars['String']>
  concentration?: Maybe<Scalars['String']>
  coreChecks?: Maybe<Scalars['String']>
  course_edits?: Maybe<Scalars['Int']>
  created_at?: Maybe<Scalars['timestamptz']>
  email?: Maybe<Scalars['String']>
  enroll?: Maybe<Scalars['Int']>
  grad_year?: Maybe<Scalars['Int']>
  id?: Maybe<Scalars['Int']>
  last_seen?: Maybe<Scalars['timestamptz']>
  major?: Maybe<Scalars['String']>
  majorChecks?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  nickname?: Maybe<Scalars['String']>
  planned_grad?: Maybe<Scalars['String']>
  school?: Maybe<Scalars['String']>
}

/** order by min() on columns of table "users" */
export type Users_Min_Order_By = {
  auth0_id?: Maybe<Order_By>
  concentration?: Maybe<Order_By>
  coreChecks?: Maybe<Order_By>
  course_edits?: Maybe<Order_By>
  created_at?: Maybe<Order_By>
  email?: Maybe<Order_By>
  enroll?: Maybe<Order_By>
  grad_year?: Maybe<Order_By>
  id?: Maybe<Order_By>
  last_seen?: Maybe<Order_By>
  major?: Maybe<Order_By>
  majorChecks?: Maybe<Order_By>
  name?: Maybe<Order_By>
  nickname?: Maybe<Order_By>
  planned_grad?: Maybe<Order_By>
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
  coreChecks?: Maybe<Order_By>
  course_edits?: Maybe<Order_By>
  courses_aggregate?: Maybe<Courses_Aggregate_Order_By>
  created_at?: Maybe<Order_By>
  email?: Maybe<Order_By>
  enroll?: Maybe<Order_By>
  grad_year?: Maybe<Order_By>
  id?: Maybe<Order_By>
  last_seen?: Maybe<Order_By>
  major?: Maybe<Order_By>
  majorChecks?: Maybe<Order_By>
  name?: Maybe<Order_By>
  nickname?: Maybe<Order_By>
  planned_grad?: Maybe<Order_By>
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
  CoreChecks = 'coreChecks',
  /** column name */
  CourseEdits = 'course_edits',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Email = 'email',
  /** column name */
  Enroll = 'enroll',
  /** column name */
  GradYear = 'grad_year',
  /** column name */
  Id = 'id',
  /** column name */
  LastSeen = 'last_seen',
  /** column name */
  Major = 'major',
  /** column name */
  MajorChecks = 'majorChecks',
  /** column name */
  Name = 'name',
  /** column name */
  Nickname = 'nickname',
  /** column name */
  PlannedGrad = 'planned_grad',
  /** column name */
  School = 'school',
}

/** input type for updating data in table "users" */
export type Users_Set_Input = {
  auth0_id?: Maybe<Scalars['String']>
  concentration?: Maybe<Scalars['String']>
  coreChecks?: Maybe<Scalars['String']>
  course_edits?: Maybe<Scalars['Int']>
  created_at?: Maybe<Scalars['timestamptz']>
  email?: Maybe<Scalars['String']>
  enroll?: Maybe<Scalars['Int']>
  grad_year?: Maybe<Scalars['Int']>
  id?: Maybe<Scalars['Int']>
  last_seen?: Maybe<Scalars['timestamptz']>
  major?: Maybe<Scalars['String']>
  majorChecks?: Maybe<Scalars['String']>
  name?: Maybe<Scalars['String']>
  nickname?: Maybe<Scalars['String']>
  planned_grad?: Maybe<Scalars['String']>
  school?: Maybe<Scalars['String']>
}

/** aggregate stddev on columns */
export type Users_Stddev_Fields = {
  __typename?: 'users_stddev_fields'
  course_edits?: Maybe<Scalars['Float']>
  enroll?: Maybe<Scalars['Float']>
  grad_year?: Maybe<Scalars['Float']>
  id?: Maybe<Scalars['Float']>
}

/** order by stddev() on columns of table "users" */
export type Users_Stddev_Order_By = {
  course_edits?: Maybe<Order_By>
  enroll?: Maybe<Order_By>
  grad_year?: Maybe<Order_By>
  id?: Maybe<Order_By>
}

/** aggregate stddev_pop on columns */
export type Users_Stddev_Pop_Fields = {
  __typename?: 'users_stddev_pop_fields'
  course_edits?: Maybe<Scalars['Float']>
  enroll?: Maybe<Scalars['Float']>
  grad_year?: Maybe<Scalars['Float']>
  id?: Maybe<Scalars['Float']>
}

/** order by stddev_pop() on columns of table "users" */
export type Users_Stddev_Pop_Order_By = {
  course_edits?: Maybe<Order_By>
  enroll?: Maybe<Order_By>
  grad_year?: Maybe<Order_By>
  id?: Maybe<Order_By>
}

/** aggregate stddev_samp on columns */
export type Users_Stddev_Samp_Fields = {
  __typename?: 'users_stddev_samp_fields'
  course_edits?: Maybe<Scalars['Float']>
  enroll?: Maybe<Scalars['Float']>
  grad_year?: Maybe<Scalars['Float']>
  id?: Maybe<Scalars['Float']>
}

/** order by stddev_samp() on columns of table "users" */
export type Users_Stddev_Samp_Order_By = {
  course_edits?: Maybe<Order_By>
  enroll?: Maybe<Order_By>
  grad_year?: Maybe<Order_By>
  id?: Maybe<Order_By>
}

/** aggregate sum on columns */
export type Users_Sum_Fields = {
  __typename?: 'users_sum_fields'
  course_edits?: Maybe<Scalars['Int']>
  enroll?: Maybe<Scalars['Int']>
  grad_year?: Maybe<Scalars['Int']>
  id?: Maybe<Scalars['Int']>
}

/** order by sum() on columns of table "users" */
export type Users_Sum_Order_By = {
  course_edits?: Maybe<Order_By>
  enroll?: Maybe<Order_By>
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
  CoreChecks = 'coreChecks',
  /** column name */
  CourseEdits = 'course_edits',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Email = 'email',
  /** column name */
  Enroll = 'enroll',
  /** column name */
  GradYear = 'grad_year',
  /** column name */
  Id = 'id',
  /** column name */
  LastSeen = 'last_seen',
  /** column name */
  Major = 'major',
  /** column name */
  MajorChecks = 'majorChecks',
  /** column name */
  Name = 'name',
  /** column name */
  Nickname = 'nickname',
  /** column name */
  PlannedGrad = 'planned_grad',
  /** column name */
  School = 'school',
}

/** aggregate var_pop on columns */
export type Users_Var_Pop_Fields = {
  __typename?: 'users_var_pop_fields'
  course_edits?: Maybe<Scalars['Float']>
  enroll?: Maybe<Scalars['Float']>
  grad_year?: Maybe<Scalars['Float']>
  id?: Maybe<Scalars['Float']>
}

/** order by var_pop() on columns of table "users" */
export type Users_Var_Pop_Order_By = {
  course_edits?: Maybe<Order_By>
  enroll?: Maybe<Order_By>
  grad_year?: Maybe<Order_By>
  id?: Maybe<Order_By>
}

/** aggregate var_samp on columns */
export type Users_Var_Samp_Fields = {
  __typename?: 'users_var_samp_fields'
  course_edits?: Maybe<Scalars['Float']>
  enroll?: Maybe<Scalars['Float']>
  grad_year?: Maybe<Scalars['Float']>
  id?: Maybe<Scalars['Float']>
}

/** order by var_samp() on columns of table "users" */
export type Users_Var_Samp_Order_By = {
  course_edits?: Maybe<Order_By>
  enroll?: Maybe<Order_By>
  grad_year?: Maybe<Order_By>
  id?: Maybe<Order_By>
}

/** aggregate variance on columns */
export type Users_Variance_Fields = {
  __typename?: 'users_variance_fields'
  course_edits?: Maybe<Scalars['Float']>
  enroll?: Maybe<Scalars['Float']>
  grad_year?: Maybe<Scalars['Float']>
  id?: Maybe<Scalars['Float']>
}

/** order by variance() on columns of table "users" */
export type Users_Variance_Order_By = {
  course_edits?: Maybe<Order_By>
  enroll?: Maybe<Order_By>
  grad_year?: Maybe<Order_By>
  id?: Maybe<Order_By>
}

export type Get_InfoQueryVariables = Exact<{ [key: string]: never }>

export type Get_InfoQuery = { __typename?: 'query_root' } & {
  users: Array<
    { __typename?: 'users' } & Pick<
      Users,
      | 'school'
      | 'major'
      | 'concentration'
      | 'nickname'
      | 'auth0_id'
      | 'majorChecks'
      | 'coreChecks'
      | 'enroll'
      | 'planned_grad'
    >
  >
}

export type Get_CoursesQueryVariables = Exact<{ [key: string]: never }>

export type Get_CoursesQuery = { __typename?: 'query_root' } & {
  courses: Array<
    { __typename?: 'courses' } & Pick<
      Courses,
      'term' | 'title' | 'code' | 'credits' | 'type' | 'campus' | 'writ_inten'
    >
  >
}

export type Update_UserMutationVariables = Exact<{
  id: Scalars['String']
  name: Scalars['String']
  school: Scalars['String']
  major: Scalars['String']
  conc: Scalars['String']
  enroll: Scalars['Int']
  plannedGrad: Scalars['String']
}>

export type Update_UserMutation = { __typename?: 'mutation_root' } & {
  update_users?: Maybe<
    { __typename?: 'users_mutation_response' } & Pick<
      Users_Mutation_Response,
      'affected_rows'
    > & {
        returning: Array<
          { __typename?: 'users' } & Pick<
            Users,
            | 'nickname'
            | 'school'
            | 'major'
            | 'concentration'
            | 'enroll'
            | 'planned_grad'
          >
        >
      }
  >
}

export type Update_Major_ChecksMutationVariables = Exact<{
  id: Scalars['String']
  majorChecks: Scalars['String']
}>

export type Update_Major_ChecksMutation = { __typename?: 'mutation_root' } & {
  update_users?: Maybe<
    { __typename?: 'users_mutation_response' } & Pick<
      Users_Mutation_Response,
      'affected_rows'
    > & {
        returning: Array<{ __typename?: 'users' } & Pick<Users, 'majorChecks'>>
      }
  >
}

export type Update_Core_ChecksMutationVariables = Exact<{
  id: Scalars['String']
  coreChecks: Scalars['String']
}>

export type Update_Core_ChecksMutation = { __typename?: 'mutation_root' } & {
  update_users?: Maybe<
    { __typename?: 'users_mutation_response' } & Pick<
      Users_Mutation_Response,
      'affected_rows'
    > & {
        returning: Array<{ __typename?: 'users' } & Pick<Users, 'coreChecks'>>
      }
  >
}

export type Increment_Course_EditsMutationVariables = Exact<{
  [key: string]: never
}>

export type Increment_Course_EditsMutation = {
  __typename?: 'mutation_root'
} & {
  update_users?: Maybe<
    { __typename?: 'users_mutation_response' } & Pick<
      Users_Mutation_Response,
      'affected_rows'
    > & {
        returning: Array<{ __typename?: 'users' } & Pick<Users, 'course_edits'>>
      }
  >
}

export type Update_CourseMutationVariables = Exact<{
  old_title: Scalars['String']
  term: Scalars['String']
  title: Scalars['String']
  code: Scalars['String']
  credits?: Maybe<Scalars['numeric']>
  type: Scalars['String']
  campus: Scalars['String']
  writ_inten: Scalars['Boolean']
}>

export type Update_CourseMutation = { __typename?: 'mutation_root' } & {
  update_courses?: Maybe<
    { __typename?: 'courses_mutation_response' } & Pick<
      Courses_Mutation_Response,
      'affected_rows'
    > & {
        returning: Array<
          { __typename?: 'courses' } & Pick<
            Courses,
            | 'term'
            | 'title'
            | 'code'
            | 'credits'
            | 'type'
            | 'campus'
            | 'writ_inten'
          >
        >
      }
  >
}

export type Add_CourseMutationVariables = Exact<{
  term: Scalars['String']
  title: Scalars['String']
  code: Scalars['String']
  credits?: Maybe<Scalars['numeric']>
  type: Scalars['String']
  campus: Scalars['String']
  writ_inten: Scalars['Boolean']
}>

export type Add_CourseMutation = { __typename?: 'mutation_root' } & {
  insert_courses?: Maybe<
    { __typename?: 'courses_mutation_response' } & Pick<
      Courses_Mutation_Response,
      'affected_rows'
    > & {
        returning: Array<
          { __typename?: 'courses' } & Pick<
            Courses,
            | 'term'
            | 'title'
            | 'code'
            | 'credits'
            | 'type'
            | 'campus'
            | 'writ_inten'
          >
        >
      }
  >
}

export type Add_Multiple_CoursesMutationVariables = Exact<{
  objects: Array<Courses_Insert_Input>
}>

export type Add_Multiple_CoursesMutation = { __typename?: 'mutation_root' } & {
  insert_courses?: Maybe<
    { __typename?: 'courses_mutation_response' } & Pick<
      Courses_Mutation_Response,
      'affected_rows'
    > & {
        returning: Array<
          { __typename?: 'courses' } & Pick<
            Courses,
            | 'term'
            | 'title'
            | 'code'
            | 'credits'
            | 'type'
            | 'campus'
            | 'writ_inten'
          >
        >
      }
  >
}

export type Remove_CourseMutationVariables = Exact<{
  term: Scalars['String']
  title: Scalars['String']
}>

export type Remove_CourseMutation = { __typename?: 'mutation_root' } & {
  delete_courses?: Maybe<
    { __typename?: 'courses_mutation_response' } & Pick<
      Courses_Mutation_Response,
      'affected_rows'
    >
  >
}

export type Remove_All_CoursesMutationVariables = Exact<{
  [key: string]: never
}>

export type Remove_All_CoursesMutation = { __typename?: 'mutation_root' } & {
  delete_courses?: Maybe<
    { __typename?: 'courses_mutation_response' } & Pick<
      Courses_Mutation_Response,
      'affected_rows'
    >
  >
}

export const Get_InfoDocument = gql`
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

/**
 * __useGet_InfoQuery__
 *
 * To run a query within a React component, call `useGet_InfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useGet_InfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGet_InfoQuery({
 *   variables: {
 *   },
 * });
 */
export function useGet_InfoQuery(
  baseOptions?: Apollo.QueryHookOptions<Get_InfoQuery, Get_InfoQueryVariables>,
) {
  return Apollo.useQuery<Get_InfoQuery, Get_InfoQueryVariables>(
    Get_InfoDocument,
    baseOptions,
  )
}
export function useGet_InfoLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Get_InfoQuery,
    Get_InfoQueryVariables
  >,
) {
  return Apollo.useLazyQuery<Get_InfoQuery, Get_InfoQueryVariables>(
    Get_InfoDocument,
    baseOptions,
  )
}
export type Get_InfoQueryHookResult = ReturnType<typeof useGet_InfoQuery>
export type Get_InfoLazyQueryHookResult = ReturnType<
  typeof useGet_InfoLazyQuery
>
export type Get_InfoQueryResult = Apollo.QueryResult<
  Get_InfoQuery,
  Get_InfoQueryVariables
>
export const Get_CoursesDocument = gql`
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

/**
 * __useGet_CoursesQuery__
 *
 * To run a query within a React component, call `useGet_CoursesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGet_CoursesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGet_CoursesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGet_CoursesQuery(
  baseOptions?: Apollo.QueryHookOptions<
    Get_CoursesQuery,
    Get_CoursesQueryVariables
  >,
) {
  return Apollo.useQuery<Get_CoursesQuery, Get_CoursesQueryVariables>(
    Get_CoursesDocument,
    baseOptions,
  )
}
export function useGet_CoursesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    Get_CoursesQuery,
    Get_CoursesQueryVariables
  >,
) {
  return Apollo.useLazyQuery<Get_CoursesQuery, Get_CoursesQueryVariables>(
    Get_CoursesDocument,
    baseOptions,
  )
}
export type Get_CoursesQueryHookResult = ReturnType<typeof useGet_CoursesQuery>
export type Get_CoursesLazyQueryHookResult = ReturnType<
  typeof useGet_CoursesLazyQuery
>
export type Get_CoursesQueryResult = Apollo.QueryResult<
  Get_CoursesQuery,
  Get_CoursesQueryVariables
>
export const Update_UserDocument = gql`
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
export type Update_UserMutationFn = Apollo.MutationFunction<
  Update_UserMutation,
  Update_UserMutationVariables
>

/**
 * __useUpdate_UserMutation__
 *
 * To run a mutation, you first call `useUpdate_UserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdate_UserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdate_UserMutation({
 *   variables: {
 *      id: // value for 'id'
 *      name: // value for 'name'
 *      school: // value for 'school'
 *      major: // value for 'major'
 *      conc: // value for 'conc'
 *      enroll: // value for 'enroll'
 *      plannedGrad: // value for 'plannedGrad'
 *   },
 * });
 */
export function useUpdate_UserMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Update_UserMutation,
    Update_UserMutationVariables
  >,
) {
  return Apollo.useMutation<Update_UserMutation, Update_UserMutationVariables>(
    Update_UserDocument,
    baseOptions,
  )
}
export type Update_UserMutationHookResult = ReturnType<
  typeof useUpdate_UserMutation
>
export type Update_UserMutationResult = Apollo.MutationResult<Update_UserMutation>
export type Update_UserMutationOptions = Apollo.BaseMutationOptions<
  Update_UserMutation,
  Update_UserMutationVariables
>
export const Update_Major_ChecksDocument = gql`
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
export type Update_Major_ChecksMutationFn = Apollo.MutationFunction<
  Update_Major_ChecksMutation,
  Update_Major_ChecksMutationVariables
>

/**
 * __useUpdate_Major_ChecksMutation__
 *
 * To run a mutation, you first call `useUpdate_Major_ChecksMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdate_Major_ChecksMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateMajorChecksMutation, { data, loading, error }] = useUpdate_Major_ChecksMutation({
 *   variables: {
 *      id: // value for 'id'
 *      majorChecks: // value for 'majorChecks'
 *   },
 * });
 */
export function useUpdate_Major_ChecksMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Update_Major_ChecksMutation,
    Update_Major_ChecksMutationVariables
  >,
) {
  return Apollo.useMutation<
    Update_Major_ChecksMutation,
    Update_Major_ChecksMutationVariables
  >(Update_Major_ChecksDocument, baseOptions)
}
export type Update_Major_ChecksMutationHookResult = ReturnType<
  typeof useUpdate_Major_ChecksMutation
>
export type Update_Major_ChecksMutationResult = Apollo.MutationResult<Update_Major_ChecksMutation>
export type Update_Major_ChecksMutationOptions = Apollo.BaseMutationOptions<
  Update_Major_ChecksMutation,
  Update_Major_ChecksMutationVariables
>
export const Update_Core_ChecksDocument = gql`
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
export type Update_Core_ChecksMutationFn = Apollo.MutationFunction<
  Update_Core_ChecksMutation,
  Update_Core_ChecksMutationVariables
>

/**
 * __useUpdate_Core_ChecksMutation__
 *
 * To run a mutation, you first call `useUpdate_Core_ChecksMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdate_Core_ChecksMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCoreChecksMutation, { data, loading, error }] = useUpdate_Core_ChecksMutation({
 *   variables: {
 *      id: // value for 'id'
 *      coreChecks: // value for 'coreChecks'
 *   },
 * });
 */
export function useUpdate_Core_ChecksMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Update_Core_ChecksMutation,
    Update_Core_ChecksMutationVariables
  >,
) {
  return Apollo.useMutation<
    Update_Core_ChecksMutation,
    Update_Core_ChecksMutationVariables
  >(Update_Core_ChecksDocument, baseOptions)
}
export type Update_Core_ChecksMutationHookResult = ReturnType<
  typeof useUpdate_Core_ChecksMutation
>
export type Update_Core_ChecksMutationResult = Apollo.MutationResult<Update_Core_ChecksMutation>
export type Update_Core_ChecksMutationOptions = Apollo.BaseMutationOptions<
  Update_Core_ChecksMutation,
  Update_Core_ChecksMutationVariables
>
export const Increment_Course_EditsDocument = gql`
  mutation INCREMENT_COURSE_EDITS {
    update_users(where: {}, _inc: { course_edits: 1 }) {
      affected_rows
      returning {
        course_edits
      }
    }
  }
`
export type Increment_Course_EditsMutationFn = Apollo.MutationFunction<
  Increment_Course_EditsMutation,
  Increment_Course_EditsMutationVariables
>

/**
 * __useIncrement_Course_EditsMutation__
 *
 * To run a mutation, you first call `useIncrement_Course_EditsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useIncrement_Course_EditsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [incrementCourseEditsMutation, { data, loading, error }] = useIncrement_Course_EditsMutation({
 *   variables: {
 *   },
 * });
 */
export function useIncrement_Course_EditsMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Increment_Course_EditsMutation,
    Increment_Course_EditsMutationVariables
  >,
) {
  return Apollo.useMutation<
    Increment_Course_EditsMutation,
    Increment_Course_EditsMutationVariables
  >(Increment_Course_EditsDocument, baseOptions)
}
export type Increment_Course_EditsMutationHookResult = ReturnType<
  typeof useIncrement_Course_EditsMutation
>
export type Increment_Course_EditsMutationResult = Apollo.MutationResult<Increment_Course_EditsMutation>
export type Increment_Course_EditsMutationOptions = Apollo.BaseMutationOptions<
  Increment_Course_EditsMutation,
  Increment_Course_EditsMutationVariables
>
export const Update_CourseDocument = gql`
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
export type Update_CourseMutationFn = Apollo.MutationFunction<
  Update_CourseMutation,
  Update_CourseMutationVariables
>

/**
 * __useUpdate_CourseMutation__
 *
 * To run a mutation, you first call `useUpdate_CourseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdate_CourseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCourseMutation, { data, loading, error }] = useUpdate_CourseMutation({
 *   variables: {
 *      old_title: // value for 'old_title'
 *      term: // value for 'term'
 *      title: // value for 'title'
 *      code: // value for 'code'
 *      credits: // value for 'credits'
 *      type: // value for 'type'
 *      campus: // value for 'campus'
 *      writ_inten: // value for 'writ_inten'
 *   },
 * });
 */
export function useUpdate_CourseMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Update_CourseMutation,
    Update_CourseMutationVariables
  >,
) {
  return Apollo.useMutation<
    Update_CourseMutation,
    Update_CourseMutationVariables
  >(Update_CourseDocument, baseOptions)
}
export type Update_CourseMutationHookResult = ReturnType<
  typeof useUpdate_CourseMutation
>
export type Update_CourseMutationResult = Apollo.MutationResult<Update_CourseMutation>
export type Update_CourseMutationOptions = Apollo.BaseMutationOptions<
  Update_CourseMutation,
  Update_CourseMutationVariables
>
export const Add_CourseDocument = gql`
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
export type Add_CourseMutationFn = Apollo.MutationFunction<
  Add_CourseMutation,
  Add_CourseMutationVariables
>

/**
 * __useAdd_CourseMutation__
 *
 * To run a mutation, you first call `useAdd_CourseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdd_CourseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addCourseMutation, { data, loading, error }] = useAdd_CourseMutation({
 *   variables: {
 *      term: // value for 'term'
 *      title: // value for 'title'
 *      code: // value for 'code'
 *      credits: // value for 'credits'
 *      type: // value for 'type'
 *      campus: // value for 'campus'
 *      writ_inten: // value for 'writ_inten'
 *   },
 * });
 */
export function useAdd_CourseMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Add_CourseMutation,
    Add_CourseMutationVariables
  >,
) {
  return Apollo.useMutation<Add_CourseMutation, Add_CourseMutationVariables>(
    Add_CourseDocument,
    baseOptions,
  )
}
export type Add_CourseMutationHookResult = ReturnType<
  typeof useAdd_CourseMutation
>
export type Add_CourseMutationResult = Apollo.MutationResult<Add_CourseMutation>
export type Add_CourseMutationOptions = Apollo.BaseMutationOptions<
  Add_CourseMutation,
  Add_CourseMutationVariables
>
export const Add_Multiple_CoursesDocument = gql`
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
export type Add_Multiple_CoursesMutationFn = Apollo.MutationFunction<
  Add_Multiple_CoursesMutation,
  Add_Multiple_CoursesMutationVariables
>

/**
 * __useAdd_Multiple_CoursesMutation__
 *
 * To run a mutation, you first call `useAdd_Multiple_CoursesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdd_Multiple_CoursesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addMultipleCoursesMutation, { data, loading, error }] = useAdd_Multiple_CoursesMutation({
 *   variables: {
 *      objects: // value for 'objects'
 *   },
 * });
 */
export function useAdd_Multiple_CoursesMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Add_Multiple_CoursesMutation,
    Add_Multiple_CoursesMutationVariables
  >,
) {
  return Apollo.useMutation<
    Add_Multiple_CoursesMutation,
    Add_Multiple_CoursesMutationVariables
  >(Add_Multiple_CoursesDocument, baseOptions)
}
export type Add_Multiple_CoursesMutationHookResult = ReturnType<
  typeof useAdd_Multiple_CoursesMutation
>
export type Add_Multiple_CoursesMutationResult = Apollo.MutationResult<Add_Multiple_CoursesMutation>
export type Add_Multiple_CoursesMutationOptions = Apollo.BaseMutationOptions<
  Add_Multiple_CoursesMutation,
  Add_Multiple_CoursesMutationVariables
>
export const Remove_CourseDocument = gql`
  mutation REMOVE_COURSE($term: String!, $title: String!) {
    delete_courses(where: { term: { _eq: $term }, title: { _eq: $title } }) {
      affected_rows
    }
  }
`
export type Remove_CourseMutationFn = Apollo.MutationFunction<
  Remove_CourseMutation,
  Remove_CourseMutationVariables
>

/**
 * __useRemove_CourseMutation__
 *
 * To run a mutation, you first call `useRemove_CourseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemove_CourseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeCourseMutation, { data, loading, error }] = useRemove_CourseMutation({
 *   variables: {
 *      term: // value for 'term'
 *      title: // value for 'title'
 *   },
 * });
 */
export function useRemove_CourseMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Remove_CourseMutation,
    Remove_CourseMutationVariables
  >,
) {
  return Apollo.useMutation<
    Remove_CourseMutation,
    Remove_CourseMutationVariables
  >(Remove_CourseDocument, baseOptions)
}
export type Remove_CourseMutationHookResult = ReturnType<
  typeof useRemove_CourseMutation
>
export type Remove_CourseMutationResult = Apollo.MutationResult<Remove_CourseMutation>
export type Remove_CourseMutationOptions = Apollo.BaseMutationOptions<
  Remove_CourseMutation,
  Remove_CourseMutationVariables
>
export const Remove_All_CoursesDocument = gql`
  mutation REMOVE_ALL_COURSES {
    delete_courses(where: {}) {
      affected_rows
    }
  }
`
export type Remove_All_CoursesMutationFn = Apollo.MutationFunction<
  Remove_All_CoursesMutation,
  Remove_All_CoursesMutationVariables
>

/**
 * __useRemove_All_CoursesMutation__
 *
 * To run a mutation, you first call `useRemove_All_CoursesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemove_All_CoursesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeAllCoursesMutation, { data, loading, error }] = useRemove_All_CoursesMutation({
 *   variables: {
 *   },
 * });
 */
export function useRemove_All_CoursesMutation(
  baseOptions?: Apollo.MutationHookOptions<
    Remove_All_CoursesMutation,
    Remove_All_CoursesMutationVariables
  >,
) {
  return Apollo.useMutation<
    Remove_All_CoursesMutation,
    Remove_All_CoursesMutationVariables
  >(Remove_All_CoursesDocument, baseOptions)
}
export type Remove_All_CoursesMutationHookResult = ReturnType<
  typeof useRemove_All_CoursesMutation
>
export type Remove_All_CoursesMutationResult = Apollo.MutationResult<Remove_All_CoursesMutation>
export type Remove_All_CoursesMutationOptions = Apollo.BaseMutationOptions<
  Remove_All_CoursesMutation,
  Remove_All_CoursesMutationVariables
>
