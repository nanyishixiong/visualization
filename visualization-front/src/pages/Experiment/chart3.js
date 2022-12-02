
var option;

option = {
  title: { // 主标题和副标题。
    text: '降雨量 vs 蒸发量',
    subtext: '柱状图'
  },
  tooltip: { // 提示框
    trigger: 'axis' // 触发类型：坐标轴触发
  },
  legend: {
    data: ['降雨量', '蒸发量'] // 图例的数据数组
  },
  calculable: true,
  xAxis: [ // X轴配置
    {
      type: 'category', // 坐标轴类型：类目轴
      // prettier-ignore
      data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '冬月', '腊月']
    }
  ],
  yAxis: [ // y轴配置
    {
      type: 'value' // 坐标轴类型：数值轴
    }
  ],
  series: [
    {
      name: '降雨量',
      type: 'bar', // 柱状图
      data: [
        2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3
      ],
      markPoint: { // 图表标注
        data: [
          { type: 'max', name: 'Max' },
          { type: 'min', name: 'Min' }
        ]
      },
      markLine: {  // 图表标线
        data: [{ type: 'average', name: '平均降雨量' }]
      }
    },
    {
      name: '蒸发量',
      type: 'bar',
      data: [
        2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3
      ],
      markPoint: {
        data: [
          { name: 'Max', value: 182.2, xAxis: 7, yAxis: 183 },
          { name: 'Min', value: 2.3, xAxis: 11, yAxis: 3 }
        ]
      },
      markLine: {
        data: [{ type: 'average', name: '平均蒸发量' }]
      }
    }
  ]
};


export default option