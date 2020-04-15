$('document').ready(function() {
    $('#pred').click(function(){
        var player1 = $("#player1").val();
        var player2 = $("#player2").val();
        $.ajax({
            type: "POST",
            url: "http://127.0.0.1:3000/live_1V1",
            data:{"player1":player1,
                  "player2":player2},
            dataType: "json",
            success: function(data) {
                var live = data.live
                $("#live_text").text(live);
            }
        })
    })
})