$('document').ready(function() {
    $('#pred').click(function(){
        alert("Hello word");
        console.log("hahahahh");
        var home_n = $("#home_n").text();
        var away_n = $("away_n").text();
        $.ajax({
            type: "GET",
            url: "https://localhost/players?home_n="+home_n+"&away_n="+away_n,
            // data:{"home_n":home_n;
                //   "away_n":away_n}
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