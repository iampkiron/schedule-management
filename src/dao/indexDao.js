const { pool } = require("../../database");

// exports.getUserRows = async function () {
//   try {
//     const connection = await pool.getConnection(async (conn) => conn);

//     try {
//       const selectUserQuery = "SELECT * FROM Users;";

//       const [row] = await connection.query(selectUserQuery);
//       return row;
//     } catch (err) {
//       console.log(`#####getUserRows Query error#####`);
//       return false;
//     } finally {
//       connection.release();
//     }
//   } catch (err) {
//     console.error(`#####getUserRows DB error#####`);
//     return false;
//   }
// };

exports.insertTodo = async function (userIdx, contents, type) {
  //DB연결 검사
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
      //쿼리
      const insertTodoQuery =
        "insert into Todos(userIdx, contents, type) values (?, ?, ?);";
      const insertTodoParams = [userIdx, contents, type];

      const [row] = await connection.query(insertTodoQuery, insertTodoParams);
      return row;
    } catch (err) {
      console.log(`#####insertTodo Query error#####`);
      return false;
    } finally {
      connection.release();
    }
  } catch (err) {
    console.error(`#####insertTodo DB error#####`);
    return false;
  }
};

exports.selectTodoByType = async function (userIdx, type) {
  //DB연결 검사
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
      //쿼리
      const selectTodoByTypeQuery =
        "select todoIdx, contents from Todos Where userIdx = ? and type = 'do' and not(status = 'D');";
      const selectTodoByTypeParams = [userIdx, type];

      const [row] = await connection.query(
        selectTodoByTypeQuery,
        selectTodoByTypeParams
      );
      return row;
    } catch (err) {
      console.log(`selectTodoByType Query error#####`);
      return false;
    } finally {
      connection.release();
    }
  } catch (err) {
    console.error(`selectTodoByType DB error#####`);
    return false;
  }
};

exports.isValidTodo = async function (userIdx, todoIdx) {
  //DB연결 검사
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
      //쿼리
      const isValidTodoQuery =
        "select * from Todos where todoIdx = ? and userIdx = ? and not(status='D');";
      const isValidTodoParams = [todoIdx, userIdx];

      const [row] = await connection.query(isValidTodoQuery, isValidTodoParams);
      return row;
    } catch (err) {
      console.log(`isValidTodo Query error#####`);
      return false;
    } finally {
      connection.release();
    }
  } catch (err) {
    console.error(`isValidTodo DB error#####`);
    return false;
  }
};

exports.updateTodo = async function (userIdx, todoIdx, contents, status) {
  //DB연결 검사
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
      //쿼리
      const updateTodoQuery =
        "update Todos set contents = ifnull(?, contents), status = ifnull(?, status) where userIdx = ? and todoIdx = ?;";
      const updateTodoParams = [contents, status, userIdx, todoIdx];

      const [row] = await connection.query(updateTodoQuery, updateTodoParams);
      return row;
    } catch (err) {
      console.log(`updateTodo Query error#####`);
      return false;
    } finally {
      connection.release();
    }
  } catch (err) {
    console.error(`updateTodo DB error#####`);
    return false;
  }
};

exports.deleteTodo = async function (userIdx, todoIdx) {
  //DB연결 검사
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
      //쿼리
      const deleteTodoQuery =
        "update Todos set status = 'D' where userIdx = ? and todoIdx = ?;";
      const deleteTodoParams = [userIdx, todoIdx];

      const [row] = await connection.query(deleteTodoQuery, deleteTodoParams);
      return row;
    } catch (err) {
      console.log(`deleteTodo Query error#####`);
      return false;
    } finally {
      connection.release();
    }
  } catch (err) {
    console.error(`deleteTodo DB error#####`);
    return false;
  }
};
