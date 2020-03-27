window.onload = function (){
    //指定图表的配置项和数据
    option = {
            //标题	
            // title: {
                // text: '队伍数据'
            // },
            tooltip: {},
            grid: { position: 'center', },
            legend: {
                data: ['球队能力值','联盟平均值']
            },
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
                        value : [40,60,20,80,30,80],
                        name : '球队（Team）'
                    },
                    {
                    value : [50, 50, 50, 50, 50, 50],
                    name : '联盟均值（Average of League）'
                }

                ]
            }]
        };
        //获取dom容器
        var myChart = echarts.init(document.getElementById('chartmain'));
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
}