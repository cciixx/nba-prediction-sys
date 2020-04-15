$('document').ready(function() {
    $('.live').on('click',
    $.ajax({
        type: "GET",
        url: "/routes/live.js",
        dataType: "json",
        success: function(data) {
            var live = data.live
            $("#live_text").text(live);
        }
    })
    )
})