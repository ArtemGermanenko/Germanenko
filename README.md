## TECHNICAL TASK
 https://docs.google.com/document/d/1XIewy_Q2Y7lcUj8NXInuj3qMr1PMxYSR0F5rZEychHk/edit
## API

### Tasks

#### Teacher
* `GET /teacher/task/abbreviated-info` - to see `all active` tasks
send:
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
 * `GET /teacher/task/full-info&taskId=...` - to get next information about task:
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