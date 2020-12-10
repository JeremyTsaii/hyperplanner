## Frontend/Backend Integration
The frontend uses GraphQL to get a payload of user information and their courses from the Hasura GraphQL endpoint. Apollo helps us communicate between the frontend and Hasura using GraphQL. Based on the payload, the frontend displays the user information, courses, and relevant statistics on the dashboard. When users insert/update/delete courses, GraphQL queries are sent back to the Hasura endpoint to modify the database. For UI performance reasons, we use optimistic updates. This way, the UI does not have to wait for the database write to complete before updating.

## Database Layout
There are two main tables in the database, a user table and a courses table. There is a one-to-many relationship between users and courses. The object relationship defined in Hasura is courses.user_id -> users.auth0_id.

Users table:
- id
- auth0_id
- name
- created_at
- last_seen
- school
- email
- grad_year
- major
- concentration
- nickname
- majorChecks
- coreChecks
- course_edits

Courses table:
- term
- title
- code
- credits
- campus
- type
- user_id
- writ_inten
- active

## Frontend Component Layout
Below is the layout of the frontend components that make up the main dashboard. Diagrams are supplied to gve a sense of which components are responsible for displaying what specific data and from which context providers they draw the data from. The React Context API helps us keep data stores and reduce prop-drilling.

![image](https://user-images.githubusercontent.com/44514622/101759712-c92f0100-3a8e-11eb-8d14-9db5614c1cfc.png)

![image](https://user-images.githubusercontent.com/44514622/101759763-d9df7700-3a8e-11eb-8cd8-cf8b0ea0f692.png)
