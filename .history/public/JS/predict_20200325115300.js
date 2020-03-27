$('document').ready(function() {
    $('#pred').click(function(){
        var home_n = $("#home_n").value();
        var away_n = $("#away_n").value();
        $.ajax({
            type: "POST",
            url: "http://127.0.0.1/predict",
            data:{"home":home_n,
                  "away":away_n},
            dataType: "json",
            success: function(data) {
                var win_p = data.home_winp
                var lose_p = data.away_winp
                $("#home_p").text(home_winp);
                $("#away_p").text(away_winp);
            }
        })
    })
})