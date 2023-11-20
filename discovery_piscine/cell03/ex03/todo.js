function addItem() {
    var text = prompt("Enter Text");

    if (text !== null) {
        setCookie(text);
        showTodo();
    }
}

function setCookie(value) {
    var expires = new Date();
    expires.setFullYear(expires.getFullYear() + 1);

    var encodedValue = encodeURIComponent(value);
    var todoArray = getCookie();

    todoArray.push(encodedValue);
    document.cookie = "ft_list=" + todoArray.join(",") + ";expires=" + expires.toUTCString() + ";";
}

function getCookie() {
    var cookies = document.cookie;
    if (cookies === "") {
        return [];
    }
    return cookies.split("=")[1].split(",").map(decodeURIComponent);
}

function showTodo() {
    var todoArray = getCookie();

    var todoList = document.getElementById("ft_list");
    todoList.innerHTML = "";

    todoArray.forEach(function (value, index) {
        var div = document.createElement("div");
        div.setAttribute("id", "todo_" + index);
        div.addEventListener("click", function () { deleteCookie(index); });
        div.style.whiteSpace = "pre";
        div.innerHTML = value;
        todoList.prepend(div);
    });
}

function deleteCookie(index) {
    if (confirm("Would you like to delete?")) {
        var todoArray = getCookie();
        todoArray.splice(index, 1);
        var expires = (todoArray.length === 0) ? "Thu, 14 Oct 1999 23:59:59" : new Date(new Date().getTime() + 30 * 60 * 1000).toUTCString();
        document.cookie = "ft_list=" + todoArray.join(",") + ";expires=" + expires + ";";
        showTodo();
    }
}

showTodo();
