import * as echarts from 'echarts';

var option;


option = {

  title: {
    text: '票房与评分',
    left: 'center'
  },
  xAxis: {
    name: '烂番茄评分',
    nameLocation: 'center',
    nameGap: 30,
    type: 'value',
    axisLabel: {
      formatter: '{value}'
    },
  },
  yAxis: {
    name: '票房(单位/百万美元)',
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
        烂番茄评分：${params.value[0]}<br/>
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
      colorBy: 'data',
      type: 'scatter'
    }
  ]
};

export default option
