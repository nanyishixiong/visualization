let option
option = {
  title: {
    text: '南丁格尔玫瑰图',
    subtext: '南丁格尔玫瑰图'
  },
  legend: {
    top: 'bottom'
  },
  series: [
    {
      name: 'Nightingale Chart',
      type: 'pie', // 饼图
      radius: [50, 250], // 饼图的半径：内半径50 外半径250
      center: ['50%', '50%'], // 圆心坐标
      roseType: 'area', // 展示成南丁格尔玫瑰图，扇区圆心角相同
      itemStyle: { // 图形样式
        borderRadius: 8 // 圆角8
      },
      data: [
        { value: 40, name: 'rose 1' },
        { value: 38, name: 'rose 2' },
        { value: 32, name: 'rose 3' },
        { value: 30, name: 'rose 4' },
        { value: 28, name: 'rose 5' },
        { value: 26, name: 'rose 6' },
        { value: 22, name: 'rose 7' },
        { value: 18, name: 'rose 8' }
      ]
    }
  ]
};

export default option