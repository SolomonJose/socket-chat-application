

    var  socket  =  io();
    $("form").submit(function(e) {
        e.preventDefault(); // prevents page reloading
        socket.emit("chat message",{username :  $("#user").html(), message:  $("#message").val()});
        $("#message").val("");
    });

    socket.on('received',function(data){
        let li = document.createElement("li");
        let messages = document.getElementById("messagelist")
        let span = document.createElement("span");
        messages.appendChild(li).append(data.message)
        messages.appendChild(span)
        .append("by "  +  data.from );

    });
    


