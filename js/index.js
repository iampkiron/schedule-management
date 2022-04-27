setHeader();
async function setHeader() {
  const token = localStorage.getItem("x-access-token");
  if (!token) {
    const signed = document.querySelector(".signed");
    signed.classList.add("hide");
    return false;
  }

  const config = {
    method: "get",
    url: url + "/jwt",
    headers: {
      "x-access-token": token,
    },
  };
  const res = await axios(config);

  if (res.data.code !== 200) {
    console.log("잘못된 토큰입니다.");
    return;
  }

  const nickname = res.data.result.nickname;
  const spanNickname = document.getElementById("username");
  spanNickname.innerHTML = nickname;

  const matrixInput = document.querySelectorAll(".matrix-input");
  matrixInput.forEach((el) => {
    el.placeholder = "새로운 할 일 추가하기";
    el.style.cursor = "auto";
  });

  const unsignedCover = document.querySelectorAll(".unsigned_cover");
  unsignedCover.forEach((el) => {
    el.style.display = "none";
  });

  const unsigned = document.querySelector(".unsigned");
  unsigned.classList.add("hide");
}

// ######로그아웃######
const signOutBtn = document.getElementById("sign-out");
signOutBtn.addEventListener("click", signOut);

function signOut(e) {
  localStorage.removeItem("x-access-token");
  alert("로그아웃되었습니다.");
  location.reload();
}
