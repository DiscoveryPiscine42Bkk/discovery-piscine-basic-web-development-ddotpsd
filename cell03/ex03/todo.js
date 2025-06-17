window.onload = function () {
  loadFromCookie();
};

function newTodo() {
  const task = prompt("Enter your new TO DO:");
  if (task && task.trim() !== "") {
    addTodo(task.trim());
    saveToCookie();
  }
}

function addTodo(text) {
  const list = document.getElementById("ft_list");
  const item = document.createElement("div");
  item.textContent = text;

  item.onclick = function () {
    if (confirm("Do you want to delete this TO DO?")) {
      list.removeChild(item);
      saveToCookie();
    }
  };

  list.insertBefore(item, list.firstChild);
}

function saveToCookie() {
  const items = [];
  const list = document.getElementById("ft_list").children;
  for (let i = 0; i < list.length; i++) {
    items.push(list[i].textContent);
  }
  document.cookie = "todo=" + encodeURIComponent(JSON.stringify(items)) + ";path=/";
}

function loadFromCookie() {
  const cookies = document.cookie.split("; ");
  for (const c of cookies) {
    const [key, value] = c.split("=");
    if (key === "todo" && value) {
      try {
        const items = JSON.parse(decodeURIComponent(value));
        for (let i = items.length - 1; i >= 0; i--) {
          addTodo(items[i]);
        }
      } catch (e) {
        console.error("Failed to parse cookie:", e);
      }
    }
  }
}
