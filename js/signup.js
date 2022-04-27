// ######토큰 검사######
const token = localStorage.getItem("x-access-token");
if (token) {
  alert("로그인 상태에서는 이용하실 수 없는 서비스입니다");
  location.href = "index.html";
}

//이메일
inputEmail = document.getElementById("id");
currentEmailMessage = document.querySelector(".currentEmail");
inputEmail.addEventListener("input", isValidEmail);

//비밀번호
inputPassword = document.getElementById("password");
currentPasswordMessage = document.querySelector(".currentPassword");
inputPassword.addEventListener("input", isValidPassword);

//닉네임
inputNickname = document.getElementById("nickname");
currentNicknameMessage = document.querySelector(".currentNickname");
inputNickname.addEventListener("input", isValidNickname);

//이메일 형식 확인
function isValidEmail(e) {
  const currentEmail = inputEmail.value;
  const emailReg =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

  if (!emailReg.test(currentEmail)) {
    currentEmailMessage.style.display = "block";
    return false;
  }
  currentEmailMessage.style.display = "none";
  return true;
}

//비밀번호 형식 확인
function isValidPassword(e) {
  const currentpassword = inputPassword.value;
  const pwdReg = /^[A-Za-z0-9]{10,20}$/; //숫자와 문자 포함 형태의 10~20자리 이내의 암호 정규식

  if (!pwdReg.test(currentpassword)) {
    currentPasswordMessage.style.display = "block";
    return false;
  }
  currentPasswordMessage.style.display = "none";
  return true;
}

//닉네임 형식 확인
function isValidNickname(e) {
  const currentNickname = inputNickname.value;
  if (currentNickname.length < 2 || currentNickname.length > 10) {
    currentNicknameMessage.style.display = "block";
    return false;
  }
  currentNicknameMessage.style.display = "none";
  return true;
}

//###회원가입###
const signUpBtn = document.getElementById("signup");
inputPassword.addEventListener("keypress", (e) => {
  if (e.keyCode === 13) {
    signUp();
  }
});
signUpBtn.addEventListener("click", signUp);

async function signUp(e) {
  const isValidSignUp =
    isValidEmail() && isValidPassword() && isValidNickname();

  if (!isValidSignUp) {
    alert("누락된 입력정보가 있습니다.");
    return false;
  }

  const currentEmail = inputEmail.value;
  const currentPassword = inputPassword.value;
  const currentNickname = inputNickname.value;

  const config = {
    method: "post",
    url: url + "/user",
    data: {
      email: currentEmail,
      password: currentPassword,
      nickname: currentNickname,
    },
  };
  try {
    const res = await axios(config);
    if (res.data.code === 400) {
      alert(res.data.message);
      location.reload();
      return false;
    }
    if (res.data.code === 200) {
      alert(res.data.message);
      location.href = "signin.html";
      console.log(res);
      return true;
    }
  } catch (err) {
    console.error(err);
  }
}
