const { pool } = require("../../database");
exports.insertUser = async function (email, password, nickname) {
  //DB연결 검사
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
      //쿼리
      const insertUserQuery =
        "insert into Users(email, password, nickname) values (?, ?, ?);";
      const insertUserParams = [email, password, nickname];

      const [row] = await connection.query(insertUserQuery, insertUserParams);
      return row;
    } catch (err) {
      console.log(`##### insertUser Query error#####`);
      return false;
    } finally {
      connection.release();
    }
  } catch (err) {
    console.error(`##### insertUser DB error#####`);
    return false;
  }
};

exports.isValidUserEmail = async function (email) {
  //DB연결 검사
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
      //쿼리
      const isValidUserEmailQuery = "select * from Users where email = ?;";
      const isValidUserEmailParams = [email];

      const [row] = await connection.query(
        isValidUserEmailQuery,
        isValidUserEmailParams
      );
      return row;
    } catch (err) {
      console.log(`##### isValidUserEmail Query error#####`);
      return false;
    } finally {
      connection.release();
    }
  } catch (err) {
    console.error(`##### isValidUserEmail DB error#####`);
    return false;
  }
};

exports.isValidUser = async function (email, password) {
  //DB연결 검사
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
      //쿼리
      const isValidUserQuery =
        "select * from Users where email = ? and password = ?;";
      const isValidUserParams = [email, password];

      const [row] = await connection.query(isValidUserQuery, isValidUserParams);
      return row;
    } catch (err) {
      console.log(`##### isValidUser Query error#####`);
      return false;
    } finally {
      connection.release();
    }
  } catch (err) {
    console.error(`##### isValidUser DB error#####`);
    return false;
  }
};

exports.selectNicknameByUsers = async function (userIdx) {
  //DB연결 검사
  try {
    const connection = await pool.getConnection(async (conn) => conn);
    try {
      //쿼리
      const selectNicknameByUsersQuery =
        "select * from Users where userIdx = ?;";
      const selectNicknameByUsersParams = [userIdx];

      const [row] = await connection.query(
        selectNicknameByUsersQuery,
        selectNicknameByUsersParams
      );
      return row;
    } catch (err) {
      console.log(`##### selectNicknameByUsers Query error#####`);
      return false;
    } finally {
      connection.release();
    }
  } catch (err) {
    console.error(`##### selectNicknameByUsers DB error#####`);
    return false;
  }
};
