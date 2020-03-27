$(document).ready(function(){
    var searchURL = window.location.search;
    var player_id = searchURL.split("=")[1];
    $.ajax({
        url:'http://127.0.0.1:3000/players?player_id=' + player_id,
        type:'get' ,
        dataType: 'json',
        success: function(data){
            // data = data[0]
            var player_name = data['name']
            var pts = data["pts"]
            var reb = data["reb"] *10 // 篮板数
            var ast = data["ast"] * 10  // 助攻
            var fgp  = data["fgp"] // 投篮命中率 
            var ftp = data["ftp"]  // 罚球命中率 
            var tpp = data["tpp"]  // 三分命中率
            var efgp = data["efgp"] // 有效命中率
            var pef = data['pef'] / 10 // 球员效率指数
            var w_share = data['w_share'] * 100 // 胜利贡献率

            $("h3").text(player_name);
            $("#link").attr("href",'player_trans.html?p_id=' + player_id)
        option = {
                dataset: {
                    source: [
                        ['分数', '能力'],
                        [w_share, '胜利贡献率'],
                        [tpp, '三分命中率'],
                        [efgp, '有效命中率'],
                        [ftp, '罚球命中率'],
                        [fgp, '投篮命中率'],
                        [pef, '球员效率指数'],
                        [pts,  '场均得分'],
                        [reb,  '场均篮板'],
                        [ast,  '场均助攻'],
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
                    min: 0,
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