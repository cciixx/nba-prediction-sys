$(document).ready(function() {
  $.ajax({
    url: "http://127.0.0.1:3000/team_index",
    type: "get",
    dataType: "json",
    success: function(data) {
      for (var i = 0; i < data.length; i++) {
        var img_src;
        var team_name;
        img_src = data[i].logo_path;
        team_name = data[i].names;
        team_code = data[i].team_code;
        $("#title").append(
          "<a href = 'team.html?t_code=" +
            team_code +
            "' target='_blank'><div class='A_team' style='color: rgb(0, 0, 100); background-color: rgb(0, 0, 100)'><img src='" +
            img_src +
            "' alt = " +
            team_code +
            "> <div class='name_T'>" +
            team_name +
            "</div></div></a>"
        );
      }
    }
  });
});
