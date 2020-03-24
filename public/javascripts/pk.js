window.onload = function(){
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
                data: ['抢断','跑动', '弹跳', '身体对抗', '传球', '运球', '篮板', '盖帽']
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
                data: [220, 320, 302, 341, 374, 390, 450, 420]
            },
            {
                name: '支出',
                type: 'bar',
                stack: '总量',
                label: {
                    show: true,
                    position: 'left'
                },
                data: [-220, -120, -132, -101, -134, -190, -230, -210]
            }
        ]
    };

var myChart = echarts.init(document.getElementById('chartmain'));
// 使用刚指定的配置项和数据显示图表。
myChart.setOption(option);
}