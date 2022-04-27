// Send a POST request
axios({
  method: "post",
  url: "http://127.0.0.1:3000/user",
  data: {
    email: "js25@smtown.com",
    password: "a123123",
    nickname: "js25",
  },
})
  .then((res) => {
    console.log(res);
  })
  .catch((res) => {
    console.log(res);
  });
