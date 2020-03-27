$(document).ready(function(){
    var searchURL = window.location.search;
    var player_id = searchURL.split("=")[1];
    $.ajax({
        url:'http://127.0.0.1:3000/player_trans?player_id=' + player_id,
        type:'get' ,
        dataType: 'json',
        success: function(data){
            // data = data[0]
            var player_name = data['player_name']
            var run = data["run"]
            var jump = data["jump"]
            var physical = data["phy"]
            var steal  = data["stl"] 
            var block = data["block"] 
            var drib = data["drib"] 
            var pass = data["pass"] 

            $("#p_name").text(player_name);
            $("#link").attr("href",'player.html?p_id=' + player_id)

        option = {
                dataset: {
                    source: [
                        ['分数', '能力'],
                        [run,  '跑动'],
                        [jump,  '弹跳'],
                        [physical,  '身体对抗'],
                        [pass, '传球'],
                        [drib, '运球'],
                        [block, '篮板'],
                        [steal, '抢断'],
                    ]
                },
                grid: {containLabel: true},
                xAxis: {name: '分数',
                        show:false,
                    },
                yAxis: {type: 'category',
                    axisTick:{show:false//不显示坐标轴刻度线
                    },
                axisLine: { show: false,//不显示坐标轴线
                },},
                visualMap: {
                    orient: 'horizontal',
                    left: 'center',
                    min: 10,
                    max: 100,
                    text: ['High Score', 'Low Score'],
                    // Map the score column to color
                    dimension: 0,
                    inRange: {
                        color: ['#D7DA8B', '#E15457']
                    }
                },
                series: [
                    {
                        type: 'bar',
                        encode: {
                            // Map the "amount" column to X axis.
                            x: '分数',
                            // Map the "product" column to Y axis
                            y: '能力'
                        }
                    }
                ]
            };
        var myChart = echarts.init(document.getElementById('chartmain'));
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
        }
    })
})