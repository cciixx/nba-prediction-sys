$('document').ready(function() {
    $('#pred').click(function(){
        $.ajax({
            type: "GET",
            url: "/routes/predict.js",
            dataType: "json",
            success: function(data) {
                var win_p = data.home_p
                var lose_p = data.away_p
                $("#home_p").text(home_p);
                $("#away_p").text(away_p);
            }
        })
    })
})