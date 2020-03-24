$(document).ready(function(){
    var searchURL = window.location.search;
    var team_code = searchURL.split("=")[1];
    $.ajax({
        url:'http://localhost:3000/teams?t_code=' + team_code,
        type:'get' ,
        dataType: 'json',
        success: function(data){
            var data = data[0]
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

            $('#img_logo').attr("src", team_logo);
            $("#t_name").text(team_name);
            $("#win").text("胜-"+ win +"&nbsp;&nbsp;负-"+lose);
            $("#rank").text("排名&nbsp;&nbsp;东部第"+rank + "名");
            $("#gm").text("经理&nbsp;&nbsp;" + gm);
            $("#hc").text("教练&nbsp;&nbsp;" + hc);   
            
                // 队员列表
        for(var i=0; i<roster.length; i++){
            var tr = '<td><a href = "player.html?p_name='+roster[i].name+'">'+roster[i].name +'</td></a>' 
            + '<td>'+roster[i].birthday +'</td>' + '<td>'+roster[i].height 
            +'</td>' + '<td>'+roster[i].weight + '</td>' + '<td>'+roster[i].pos +'</td>' + '<td>'+roster[i].gp 
            +'</td>' + '<td>'+roster[i].pts +'</td>' + '<td>'+roster[i].reb +'</td>' + '<td>'+roster[i].ast +'</td>'
            + '<td>'+roster[i].fgp +'</td>'+ '<td>'+roster[i].tfgp +'</td>' + '<td>'+roster[i].ftfgp +'</td>'
            $("#player_list").append('<tr>'+tr+'</tr>')
    }
        }
    })
})

