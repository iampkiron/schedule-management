const { jwtMiddleware } = require("../../jwtmiddleware");
const userController = require("../controller/userController");

exports.userRouter = function (app) {
  app.post("/user", userController.signup); // 회원가입
  app.post("/log-in", userController.signin); // 로그인
  app.get("/jwt", jwtMiddleware, userController.getNickname); // 닉네임
};
