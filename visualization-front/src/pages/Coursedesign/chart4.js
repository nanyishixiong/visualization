
var option;
option = {
  title: {
    text: '票房前20的电影类型统计堆叠图',
    left: 'center'
  },
  xAxis: {
    name: '类型',
    type: 'category',
  },
  yAxis: {
    name: '票房',
    type: 'value',
  },
  series: [
    {
      name: '南丁格尔玫瑰图',
      type: 'bar',
    }
  ]
};

export default option
