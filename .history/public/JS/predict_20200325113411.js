$('document').ready(function() {
    $('#pred').click(function(){
        var home_n = $("#home_n").text();
        var away_n = $("away_n").text();
        $.ajax({
            type: "POST",
            url: "http://localhost/predict",
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