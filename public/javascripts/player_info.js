window.onload = function(){
    option = {
            dataset: {
                source: [
                    ['分数', '能力'],
                    [89.3,  '跑动'],
                    [57.1,  '弹跳'],
                    [74.4,  '身体对抗'],
                    [50.1, '传球'],
                    [89.7, '运球'],
                    [68.1, '篮板'],
                    [19.6, '盖帽'],
                    [10.6, '抢断'],
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
