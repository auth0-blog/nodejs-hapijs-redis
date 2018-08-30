module.exports = [

  './routes/todo_get',
  './routes/todo_post',
  './routes/todo_delete',

].map((elem) => require(elem));
