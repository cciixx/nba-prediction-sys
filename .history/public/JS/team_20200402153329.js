$(document).ready(function() {
  var searchURL = window.location.search;
  var team_code = searchURL.split("=")[1];
  $.ajax({
    url: "http://127.0.0.1:3000/teams?t_code=" + team_code,
    type: "get",
    dataType: "json",
    success: function(data) {
      var data = data[0];
      var team_logo = data["name"];
      var team_name = data["team_name"];
      var win = data["win"];
      var lose = data["lose"];
      var rank = data["rank"];
      var gm = data["gm"]; // general manager
      var hc = data["hc"]; // head coach
      var pts = data["pts"]; // 场均得分
      var pf = data["pf"]; //场均犯规
      var ast = data["ast"]; // 场均助攻
      var stl = data["stl"]; // 场均抢断
      var reb = data["reb"]; // 场均篮板
      var tov = data["tov"]; // 场均失误
      var roster = data["roster"]; //球员列表

      $("#img_logo").attr("src", team_logo);
      $("#t_name").text(team_name);
      $("#win").text("胜-" + win + "  ;负-" + lose);
      $("#rank").text("排名  ;东部第" + rank + "名");
      $("#gm").text("经理  " + gm);
      $("#hc").text("教练  " + hc);

      // 队员列表
      for (var i = 0; i < roster.length; i++) {
        var tr =
          '<td><a href = "player.html?p_id=' +
          roster[i].id +
          '">' +
          roster[i].name +
          "</td></a>" +
          "<td>" +
          roster[i].birthday +
          "</td>" +
          "<td>" +
          roster[i].height +
          "</td>" +
          "<td>" +
          roster[i].weight +
          "</td>" +
          "<td>" +
          roster[i].pos +
          "</td>" +
          "<td>" +
          roster[i].gp +
          "</td>" +
          "<td>" +
          roster[i].pts +
          "</td>" +
          "<td>" +
          roster[i].reb +
          "</td>" +
          "<td>" +
          roster[i].ast +
          "</td>" +
          "<td>" +
          roster[i].fgp +
          "</td>" +
          "<td>" +
          roster[i].tfgp +
          "</td>" +
          "<td>" +
          roster[i].ftfgp +
          "</td>";
        $("#player_table").append("<tr>" + tr + "</tr>");
      }

      window.onload = function() {
        // 指定图表的配置项和数据
        option = {
          // 标题
          // title: {
          // text: '队伍数据'
          // },
          tooltip: {},
          grid: { position: "center" },
          legend: { data: ["球队能力值", "联盟平均值"] },
          radar: {
            shape: "circle",
            name: {
              textStyle: {
                color: "white",
                backgroundColor: "orange",
                borderRadius: 2,
                padding: [3, 5]
              }
            },
            indicator: [
              { name: "场均得分", max: 120 },
              { name: "场均犯规", max: 25 },
              { name: "场均篮板", max: 52 },
              { name: "场均抢断", max: 10 },
              { name: "场均助攻", max: 30 },
              { name: "场均失误", max: 18 }
            ]
          },
          series: [
            {
              name: "球队vs联盟均值（Team VS League）",
              type: "radar",
              // areaStyle: {normal: {}},
              data: [
                {
                  value: [pts, pf, ast, stl, reb, tov],
                  name: "球队（Team）"
                },
                {
                  value: [111.4, 20.6, 44.9, 7.7, 24.3, 14.5],
                  name: "联盟均值（Average of League）"
                }
              ]
            }
          ]
        };
        // 获取dom容器
        var myChart = echarts.init(document.getElementById("chartmain"));
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      };
    }
  });
});
