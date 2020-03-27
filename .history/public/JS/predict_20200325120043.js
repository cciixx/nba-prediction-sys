$('document').ready(function() {
    $('#pred').click(function(){
        var home_n = $("#home_n").val();
        var away_n = $("#away_n").val();
        $.ajax({
            type: "POST",
            url: "http://127.0.0.1:3000/predict",
            data:{"home":home_n,
                  "away":away_n},
            dataType: "json",
            success: function(data) {
                var home_winp = data.home_winp
                var away_winp = data.away_winp
                $("#home_p").text(home_winp);
                $("#away_p").text(away_winp);
            }
        })
    })
})