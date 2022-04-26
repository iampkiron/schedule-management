const jwt = require("jsonwebtoken");
const { secretconfig } = require("./secretconfig");

exports.jwtMiddleware = async function (req, res, next) {
  const token = req.headers["x-access-token"];

  if (!token) {
    return res.send({
      isSuccess: false,
      code: 403,
      message: "로그인이 필요한 서비스입니다.",
    });
  }

  try {
    const verifiedToken = jwt.verify(token, secretconfig);
    req.verifiedToken = verifiedToken;
    next();
  } catch {
    return res.send({
      isSuccess: false,
      code: 403,
      message: "유효하지 않은 토큰입니다.",
    });
  }
};
