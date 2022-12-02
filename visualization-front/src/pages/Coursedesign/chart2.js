import * as echarts from 'echarts';

var option;


option = {

  title: {
    text: '预算与票房',
    left: 'center'
  },
  xAxis: {
    name: '预算(百万美元)',
    nameLocation: 'center',
    nameGap: 30,
    type: 'value',
  },
  yAxis: {
    name: '票房(百万美元)',
    nameGap: 30, // 与坐标轴距离
    nameLocation: 'center', // 位置
    type: 'value',
  },
  tooltip: {
    trigger: 'item',
    formatter: function (params) {
      return (
        `
        《${params.value[2]}》<br/>
        预算：${params.value[0]}百万美元<br/>
        票房：${params.value[1]}百万美元
        `
      )
    }
  },
  series: [
    {
      symbolSize: 10,
      data: [
        ["44", "269.1", "10,000 B.C."],
        ["73", "157.9", "21"]
      ],
      // colorBy: 'data',
      type: 'scatter',
      itemStyle: {
        color: function (params) {
          if (1 * params.value[0] > 1 * params.value[1]) {
            return 'red';
          }
          return '#5470c6';
        },
      }
    }
  ]
};

export default option
