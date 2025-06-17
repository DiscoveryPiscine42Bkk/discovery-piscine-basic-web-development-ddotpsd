$(document).ready(function () {
  loadFromCookie();

  $("#newBtn").on("click", function () {
    const task = prompt("Enter your new TO DO:");
    if (task && task.trim() !== "") {
      addTodo(task.trim());
      saveToCookie();
    }
  });

  function addTodo(text) {
    const $item = $("<div>").text(text);

    $item.on("click", function () {
      if (confirm("Do you want to delete this TO DO?")) {
        $(this).remove();
        saveToCookie();
      }
    });

    $("#ft_list").prepend($item);
  }

  function saveToCookie() {
    const items = [];
    $("#ft_list div").each(function () {
      items.push($(this).text());
    });
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
});
