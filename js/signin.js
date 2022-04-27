// ######토큰 검사######
const token = localStorage.getItem("x-access-token");
if (token) {
  alert("로그인 상태에서는 이용하실 수 없는 서비스입니다");
  location.href = "index.html";
}

inputEmail = document.getElementById("id");
inputPassword = document.getElementById("password");
signInBtn = document.getElementById("signin");

inputPassword.addEventListener("keypress", (e) => {
  if (e.keyCode === 13) {
    signIn();
  }
});

signInBtn.addEventListener("click", signIn);

async function signIn(e) {
  const currentEmail = inputEmail.value;
  const currentPassword = inputPassword.value;
  if (!currentEmail || !currentPassword) {
    alert("잘못된 로그인 정보입니다.");
    return false;
  }

  const config = {
    method: "post",
    url: url + "/log-in",
    data: {
      email: currentEmail,
      password: currentPassword,
    },
  };

  try {
    const res = await axios(config);
    if (res.data.code === 400) {
      alert(res.data.message);
      location.reload();
    }
    if (res.data.code === 200) {
      alert(res.data.message);
      localStorage.setItem("x-access-token", res.data.result.token);
      window.close();
      window.open("index.html");
    }
  } catch (err) {
    console.error(err);
  }
}
