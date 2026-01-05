// popup.js: 할일 관리 동작 정의

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("todo-form");
  const input = document.getElementById("todo-input");
  const dateInput = document.getElementById("todo-date");
  const calendarButton = document.getElementById("calendar-button");
  const list = document.getElementById("todo-list");

  // 오늘 날짜를 기본값으로 설정
  const today = new Date().toISOString().split("T")[0];
  dateInput.value = today;

  // 캘린더 버튼 클릭 시 날짜 선택 창 열기
  calendarButton.addEventListener("click", () => {
    dateInput.showPicker();
  });

  // 저장된 할일 불러오기
  chrome.storage.local.get(["todos"], (result) => {
    const todos = result.todos || [];
    todos.forEach((todo) => addTodoToList(todo.text, todo.date));
  });

  // 할일 추가
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const todo = input.value.trim();
    const date = dateInput.value;
    if (!todo) return;

    addTodoToList(todo, date);

    // 저장
    chrome.storage.local.get(["todos"], (result) => {
      const todos = result.todos || [];
      todos.push({ text: todo, date });
      chrome.storage.local.set({ todos });
    });

    input.value = "";
    dateInput.value = today;
  });

  // 할일 목록에 추가
  function addTodoToList(todo, date) {
    const li = document.createElement("li");
    li.textContent = `${todo} (날짜: ${date})`;
    list.appendChild(li);
  }
});
