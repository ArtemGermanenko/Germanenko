## TECHNICAL TASK
 https://docs.google.com/document/d/1XIewy_Q2Y7lcUj8NXInuj3qMr1PMxYSR0F5rZEychHk/edit
## API

### Tasks

#### Teacher
* `GET /teacher/task/abbreviated-info` - `all active` tasks
Send:
 ```javaScript
 {
  _id,
  name,
  weight
 }
 ```
* `POST /teacher/task/assign` - to assign task to student
 body:
 ```javaScript
 {
  taskId,
  studentId, /** or groupId **/
  teacherId,                         
  deadline (Number of miliseconds)
 }
 ```
 * `GET /teacher/task/full-info?taskId=...` - to get next information about task:
 ```javaScript
{
 name, 
 description, 
 weight,
 tags[]
 inpFiles: [ { link, name } ]
 outFiles: [ { link, name } ]
}
 ```
 Query is id of task, which your want to get.

#### Student
* `GET /student/task/full-info?assId=...` - to get next informaton about task assignment by id:
Send:
 ```javaScript
 {
 	taskId:
 	{
     name,
     description,
     weight
    },
    deadline,
    teacherId: 
    {
     name,
     surname
    }
}
 ```
 * `GET /student/task/tasks-list?id=some_id` - to get array of all task of certain student, whom `_id` is `some_id`. Array is sorted: first comes task `without` submissions and only then `with` submissions. If student has more than one submissions for one assignment, sends only `one best` submission.
 Send:
 ```javaScript
{
 _id,
 taskId: 
 {
  attempts,
  name,
  weight,
  active
 },
 teacherId:
 {
  name,
  surname
 }
 submission:
 {
  _id,
  srcFileId,
  submitTime,
  tests: []
 }
}
 ```

 #### Admin