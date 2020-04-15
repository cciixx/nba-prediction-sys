$(document).ready(function(){
    $('#PK').click(function(){
        var player1 = $("#player1_name").val();
        var player2 = $("#player2_name").val();
        window.location.href = "player_PK.html";
        $.ajax({
            url:'http://127.0.0.1:3000/pk',
            type:'POST' ,
            data:{"player1":player1,
                "player2":player2},
            dataType: 'json',
            success: function(data){
                // data = data[0]
                window.location.href="./player_PK.html";
                var player1_name = data['player_name1']
                var pts1 = data["pts1"]
                var reb1 = data["reb1"]  // 篮板数
                var ast1 = data["ast1"]  // 助攻
                var fgp1  = data["fgp1"] // 投篮命中率 
                var ftp1 = data["ftp1"]  // 罚球命中率 
                var tpp1 = data["tpp1"]  // 三分命中率
                var efgp1 = data["efgp1"] // 有效命中率
                var pef1 = data['pef1'] // 球员效率指数
                var w_share1 = data['w_share1'] // 胜利贡献率

                var player2_name = data['player_name2']
                var pts2 = data["pts2"]
                var reb2 = data["reb2"]  // 篮板数
                var ast2 = data["ast2"]  // 助攻
                var fgp2  = data["fgp2"] // 投篮命中率 
                var ftp2 = data["ftp2"]  // 罚球命中率 
                var tpp2 = data["tpp2"]  // 三分命中率
                var efgp2 = data["efgp2"] // 有效命中率
                var pef2 = data['pef2'] // 球员效率指数
                var w_share2 = data['w_share2'] // 胜利贡献率

                $("#p_name").text(player_name);

                option = {
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    legend: {
                        data: [ '球员甲', '球员乙']
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: {
                            show:false,
                        },
                    yAxis: [
                        {
                            type: 'category',
                            axisTick: {
                                show: false
                            },
                            data: ['得分','篮板', '助攻', '投篮命中率', '罚球命中率', '三分命中率', '有效命中率', '球员效率指数', '胜利贡献率']
                        }
                    ],
                    series: [
                        {
                            name: '收入',
                            type: 'bar',
                            stack: '总量',
                            label: {
                                show: true
                            },
                            data: [pts1, reb1, ast1, fgp1, ftp1, tpp1, efgp1,pef1, w_share1]
                        },
                        {
                            name: '支出',
                            type: 'bar',
                            stack: '总量',
                            label: {
                                show: true,
                                position: 'left'
                            },
                            data: [-pts2, -reb2, -ast2, -fgp2, -ftp2, -tpp2, -efgp2, -pef2, -w_share2]
                        }
                    ]
                };

        var myChart = echarts.init(document.getElementById('chartmain'));
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        }
    })
    })
})