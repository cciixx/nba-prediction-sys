$('document').ready(function() {
    $('.live').on('click',
    $.ajax({
        type: "GET",
        url: "/routes/live_index.js",
        dataType: "json",
        success: function(data) {
            var live = data.live
            $("#live_text").text(live);
        }
    })
    )
})