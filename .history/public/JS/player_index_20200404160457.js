$('#PK').click(function(){
    var player1 = $("#p1").val();
    var player2 = $("#p2").val();
    var url = "player_PK.html?p1="+player1+"&p2="+player2;
    $("#tag").attr("href", url);
    window.location.href=url;
})