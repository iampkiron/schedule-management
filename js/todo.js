readTodo();
async function readTodo() {
  const token = localStorage.getItem("x-access-token");
  if (!token) {
    return;
  }

  const config = {
    method: "get",
    url: url + "/todos",
    headers: {
      "x-access-token": token,
    },
  };

  const res = await axios(config);
  // if (res.data.code !== 200) {
  //   alert(res.data.message);
  //   return;
  // }
  const todoDataSet = res.data.result;
  for (let section in todoDataSet) {
    const sectionUl = document.querySelector(`#${section} ul`);
    const arrayForEachSection = todoDataSet[section];

    let result = "";
    for (let todo of arrayForEachSection) {
      let element = `<li id="${todo.todoIdx}"class="list_item">
      <div class="done-text-container">
        <input type ="checkbox" class="todo_status" ${
          todo.status === "C" ? "checked" : ""
        }/>
        <p class="todo_text">${todo.contents}</p>
      </div>
      <div class="update-delete-container">
        <span class="todo-update material-icons-outlined">edit_note</span>
        <span class="todo-delete material-icons-outlined">delete</span>
      </div>
    </li>
    `;
      result += element;
    }

    sectionUl.innerHTML = result;
  }
}

const matrixContainer = document.querySelector(".matrix_container");
matrixContainer.addEventListener("keypress", cudController);
matrixContainer.addEventListener("click", cudController);

function cudController(e) {
  const token = localStorage.getItem("x-access-token");
  if (!token) {
    return;
  }

  const target = e.target;
  const targetTagName = target.tagName;
  const eventType = e.type;
  const key = e.key;

  if (targetTagName === "INPUT" && key === "Enter") {
    createTodo(e, token);
    return;
  }
  if (target.className === "todo_status" && eventType === "click") {
    updateTodoDone(e, token);
    return;
  }
  const firstClassName = target.className.split(" ")[0];
  if (firstClassName === "todo-update" && eventType === "click") {
    updateTodoContents(e, token);
    return;
  }
  if (firstClassName === "todo-delete" && eventType === "click") {
    deleteTodo(e, token);
    return;
  }
}

async function createTodo(e, token) {
  const contents = e.target.value;
  const type = e.target.closest(".matrix_item").id;

  if (!contents) {
    alert("????????? ????????? ????????????.");
    return false;
  }

  const config = {
    method: "post",
    url: url + "/todo",
    headers: {
      "x-access-token": token,
    },
    data: {
      contents: contents,
      type: type,
    },
  };
  try {
    const res = await axios(config);
    console.log(res);
    if (res.data.code !== 200) {
      alert(res.data.message);
      return false;
    }

    readTodo();
    e.target.value = "";
  } catch (err) {
    console.error(err);
  }
}

//????????????
async function updateTodoDone(e, token) {
  const status = e.target.checked == true ? "C" : "A";
  const todoIdx = e.target.closest(".list_item").id;

  const config = {
    method: "patch",
    url: url + "/todo",
    headers: {
      "x-access-token": token,
    },
    data: {
      todoIdx: todoIdx,
      status: status,
    },
  };
  try {
    const res = await axios(config);
    if (res.data.code !== 200) {
      alert(res.data.message);
      return false;
    }

    readTodo();
  } catch (err) {
    console.error(err);
  }
}

//?????????
async function updateTodoContents(e, token) {
  const contents = prompt("????????? ????????? ??????????????????.");
  const todoIdx = e.target.closest(".list_item").id;

  const config = {
    method: "patch",
    url: url + "/todo",
    headers: {
      "x-access-token": token,
    },
    data: {
      todoIdx: todoIdx,
      contents: contents,
    },
  };
  try {
    const res = await axios(config);
    if (res.data.code !== 200) {
      alert(res.data.message);
      return false;
    }

    readTodo();
  } catch (err) {
    console.error(err);
  }
}

//??????
async function deleteTodo(e, token) {
  const isValidReq = confirm("?????? ??????????????????????");
  if (!isValidReq) {
    return;
  }

  const todoIdx = e.target.closest(".list_item").id;

  const config = {
    method: "delete",
    url: url + "/todo/" + todoIdx,
    headers: {
      "x-access-token": token,
    },
  };
  try {
    const res = await axios(config);
    if (res.data.code !== 200) {
      alert(res.data.message);
      return false;
    }

    readTodo();
  } catch (err) {
    console.error(err);
  }
}
