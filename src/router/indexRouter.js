const { jwtMiddleware } = require("../../jwtmiddleware");
const indexController = require("../controller/indexController");

exports.indexRouter = function (app) {
  app.post("/todo", jwtMiddleware, indexController.createTodo); // create
  app.get("/todos", jwtMiddleware, indexController.readTodo); // read
  app.patch("/todo", jwtMiddleware, indexController.selectTodo); // updated
  app.delete("/todo/:todoIdx", jwtMiddleware, indexController.deleteTodo); // delete
};
