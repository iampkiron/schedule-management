const indexDao = require("../dao/indexDao");

exports.createTodo = async function (req, res) {
  const { userIdx } = req.verifiedToken;
  const { contents, type } = req.body;

  if (!userIdx || !contents || !type) {
    return res.send({
      isSuccess: false,
      code: 400,
      message: "입력값이 누락되었습니다.",
    });
  }

  if (contents.length > 20) {
    return res.send({
      isSuccess: false,
      code: 400,
      message: "글자수 20자를 초과했습니다.",
    });
  }
  const vaildTypes = ["do", "delegate", "decide", "delete"];
  if (!vaildTypes.includes(type)) {
    return res.send({
      isSuccess: false,
      code: 400,
      message: "타입값이 누락되었습니다.",
    });
  }

  const insertTodoRow = await indexDao.insertTodo(userIdx, contents, type);
  return res.send({
    isSuccess: true,
    code: 200,
    message: "새로운 할 일을 추가했습니다.",
  });
};

exports.readTodo = async function (req, res) {
  const { userIdx } = req.verifiedToken;
  let todos = {};
  const types = ["do", "delegate", "decide", "delete"];

  for (type of types) {
    let selectTodoByTypeRows = await indexDao.selectTodoByType(userIdx, type);

    if (!selectTodoByTypeRows) {
      return res.send({
        isSuccess: false,
        code: 400,
        message: "할 일 조회에 실패했습니다.",
      });
    }

    todos[type] = selectTodoByTypeRows;
  }

  return res.send({
    result: todos,
    isSuccess: false,
    code: 400,
    message: "할 일 조회에 성공했습니다.",
  });
};

exports.selectTodo = async function (req, res) {
  const { userIdx } = req.verifiedToken;
  let { todoIdx, contents, status } = req.body;

  if (!userIdx || !todoIdx) {
    return res.send({
      isSuccess: false,
      code: 400,
      message: "잘못된 userIdx, todoIdx 데이터입니다.",
    });
  }

  if (!contents) {
    contents = null;
  }

  if (!status) {
    status = null;
  }

  const isVaildTodo = await indexDao.isVaildTodo(userIdx, todoIdx);
  if (isVaildTodo.length < 1) {
    return res.send({
      isSuccess: false,
      code: 400,
      message: "유효하지 않은 userIdx 또는 todoIdx입니다.",
    });
  }

  const updateTodoRow = await indexDao.updateTodo(
    userIdx,
    todoIdx,
    contents,
    status
  );

  if (!updateTodoRow) {
    return res.send({
      isSuccess: false,
      code: 400,
      message: "할 일 수정에 실패했습니다.",
    });
  }

  return res.send({
    isSuccess: true,
    code: 200,
    message: "할 일 수정에 성공했습니다.",
  });
};

exports.deleteTodo = async function (req, res) {
  const { userIdx } = req.verifiedToken;
  const { todoIdx } = req.params;
  if (!userIdx || !todoIdx) {
    return res.send({
      isSuccess: false,
      code: 200,
      message: "잘못된 userIdx, todoIdx 데이터입니다.",
    });
  }

  const isValidTodo = await indexDao.isValidTodo(userIdx, todoIdx);
  if (isValidTodo.length < 1) {
    return res.send({
      isSuccess: false,
      code: 200,
      message: "유효하지 않은 userIdx, todoIdx 데이터입니다.",
    });
  }

  const deleteTodoRow = await indexDao.deleteTodo(userIdx, todoIdx);
  if (!deleteTodoRow) {
    return res.send({
      isSuccess: false,
      code: 400,
      message: "할 일 삭제 실패",
    });
  }

  return res.send({
    isSuccess: true,
    code: 200,
    message: "할 일 삭제 성공",
  });
};
