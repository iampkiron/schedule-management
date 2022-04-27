const userDao = require("../dao/userDao");
const jwt = require("jsonwebtoken");
const { secretconfig } = require("../../secretconfig");

exports.signup = async function (req, res) {
  const { email, password, nickname } = req.body;
  if (!email || !password || !nickname) {
    return res.send({
      isSuccess: false,
      code: 400,
      message: "입력값이 누락되었습니다.",
    });
  }

  const isValidEmail =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
  if (!isValidEmail.test(email)) {
    return res.send({
      isSuccess: false,
      code: 400,
      message: "올바른 이메일 형식이 아닙니다.",
    });
  }

  const isValidPassword = /^[A-Za-z0-9]{10,20}$/; //숫자와 문자 포함 형태의 10~20자리 이내의 암호 정규식
  if (!isValidPassword.test(password)) {
    return res.send({
      isSuccess: false,
      code: 400,
      message: "올바른 비밀번호 형식이 아닙니다.",
    });
  }

  if (nickname.length < 2 || nickname.length > 10) {
    return res.send({
      isSuccess: false,
      code: 400,
      message: "올바른 닉네임 형식이 아닙니다.",
    });
  }

  const isValidUserEmail = await userDao.isValidUserEmail(email);
  if (isValidUserEmail > 0) {
    return res.send({
      isSuccess: false,
      code: 400,
      message: "이미 가입된 이메일입니다",
    });
  }

  const insertUser = await userDao.insertUser(email, password, nickname);
  return res.send({
    isSuccess: true,
    code: 200,
    message: `이제 ${email}로 로그인할 수 있습니다.`,
  });
};

exports.signin = async function (req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.send({
      isSuccess: false,
      code: 400,
      message: "잘못된 로그인 양식입니다. 1",
    });
  }

  //회원여부 검사
  const isValidUser = await userDao.isValidUser(email, password);
  if (!isValidUser) {
    return res.send({
      isSuccess: false,
      code: 400,
      message: "잘못된 로그인 양식입니다. 2",
    });
  }
  if (isValidUser.length < 1) {
    return res.send({
      isSuccess: false,
      code: 400,
      message: "존재하지 않는 회원입니다.",
    });
  }

  //토큰 발급
  const [userInfo] = isValidUser;
  const userIdx = userInfo.userIdx;

  const token = jwt.sign({ userIdx: userIdx }, secretconfig);

  return res.send({
    result: {
      token: token,
    },
    isSuccess: true,
    code: 200,
    message: "로그인되었습니다.",
  });
};

exports.getNickname = async function (req, res) {
  const { userIdx } = req.verifiedToken;
  const [userInfo] = await userDao.selectNicknameByUsers(userIdx);
  const nickanme = userInfo.nickname;

  return res.send({
    result: {
      nickname: nickanme,
    },
    isSuccess: true,
    code: 200,
    message: "토큰 검증 성공",
  });
};
