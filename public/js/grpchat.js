

var socket = io();
socket.emit('creategrp', $('#roomname').val()); //expects supplying room name from server to form
console.log($('#roomname').val());

$("form").submit(function (e) {
    e.preventDefault(); // prevents page reloading
    socket.emit('creategrp', $('#roomname').val());
    console.log($('#roomname').val());

    socket.emit("grpchat message", { username: $("#from").html(), id:  $("#grpid").html(), message: $("#message").val() });

    $("#message").val("");
});

socket.on('grpreceived', function (data) {
    let li = document.createElement("li");
    let messages = document.getElementById("messagelist")
    let span = document.createElement("span");
    messages.appendChild(li).append(data.message)
    messages.appendChild(span)
        .append("by " + data.from);

});





