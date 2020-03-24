// $(document).ready(function(){
window.onload() = function(){
    $.ajax({
        url:'http://localhost:3000/teams',
        type:'get' ,
        dataType: 'json',
        success: function(data){
            // data = data[0]
            var team_logo = data['team_logo']
            var team_name = data["team_name"]
            var win = data["win"]
            var lose = data["lose"]
            var rank = data["rank"]
            var gm  = data["gm"] // general manager
            var hc = data["hc"] // head coach
            var pts = data["pts"] // 场均得分
            var pf = data["pf"] //场均犯规
            var ast = data["ast"] // 场均助攻
            var stl = data["stl"] // 场均抢断
            var reb = data["reb"] // 场均篮板
            var tov = data["tov"] // 场均失误
            var roster = data['roster'] //球员列表
        }
    })
    $('#img_logo').attr("src", data.team_logo);
    $("#t_name").text(team_name);
    $("#win").text("胜-"+ win +"&nbsp;&nbsp;负-"+lose);
    $("#rank").text("排名&nbsp;&nbsp;东部第"+rank + "名");
    $("#gm").text("经理&nbsp;&nbsp;" + gm);
    $("#hc").text("教练&nbsp;&nbsp;" + hc);

//  window.onload() = function(){
    // 指定图表的配置项和数据
    option = {
        // 标题	
        // title: {
            // text: '队伍数据'
        // },
        tooltip: {},
        grid: { position: 'center', },
        legend: { data: ['球队能力值','联盟平均值'] },
        radar: {
            shape: 'circle',
            name: {
                textStyle: {
                    color: 'white',
                    backgroundColor: 'orange',
                    borderRadius: 2,
                    padding: [3, 5]
               }
            },
            indicator: [
                {name: '场均得分', max:100},
                {name: '场均失分', max:100},
                {name: '场均篮板', max:100},
                {name: '场均抢断', max:100},
                {name: '场均助攻', max:100},
                {name: '场均失误', max:100},
            ]
        },
        series: [{
            name: '球队vs联盟均值（Team VS League）',
            type: 'radar',
            // areaStyle: {normal: {}},
            data : [
                {
                    value : [pts,pf,ast,stl,reb,tov],
                    name : '球队（Team）'
                },
                {
                value : [50, 50, 50, 50, 50, 50],
                name : '联盟均值（Average of League）'
            }
            ]
        }]
    };
    // 获取dom容器
    var myChart = echarts.init(document.getElementById('chartmain'));
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
 }
 
    // 队员列表
    for(var i=0;i<roster.length;i++){
        var tr = '<td><a href = "player.html?p_name='+roster[i].name+'">'+roster[i].name +'</td></a>' 
        + '<td>'+roster[i].birthday +'</td>' + '<td>'+roster[i].height 
        +'</td>' + '<td>'+roster[i].weight + '</td>' + '<td>'+roster[i].pos +'</td>' + '<td>'+roster[i].gp 
        +'</td>' + '<td>'+roster[i].pts +'</td>' + '<td>'+roster[i].reb +'</td>' + '<td>'+roster[i].ast +'</td>'
        + '<td>'+roster[i].fgp +'</td>'+ '<td>'+roster[i].tfgp +'</td>' + '<td>'+roster[i].ftfgp +'</td>'
        $("#player_list").append('<tr>'+tr+'</tr>')
    }
// })

// <a href = "player.html?p_name="></a>
