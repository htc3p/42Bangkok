$(document).ready(function () {
    
    showTodo();

    $("#btn").on("click", function () {
        var text = prompt("Enter Text");

        if (text !== null) {
            setCookie(text);
            showTodo();
        }
    });

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
        return cookies.split("=")[1].split(",");
    }

    function showTodo() {
        var todoArray = getCookie().map(decodeURIComponent);
        var $todoList = $("#ft_list");
        $todoList.empty();

        $.each(todoArray, function (index, value) {
            var $div = $("<div>", {
                id: "todo" + index,
                click: function () { deleteCookie(index); },
                css: { whiteSpace: "pre" },
                html: value
            });
            $todoList.prepend($div);
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
});