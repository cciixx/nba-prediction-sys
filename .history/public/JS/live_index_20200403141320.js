$('document').ready(function() {
    $('.live').on('click',
    $.ajax({
        type: "GET",
        // url: "/routes/predict.js",
        dataType: "json",
        success: function(data) {
            var live = "比赛开始</br>金州勇士队 拿到球权</br>球传到了鲁尼的手里"
            $("#live_text").text(live);
        }
    })
    )
})