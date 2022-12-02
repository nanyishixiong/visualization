let option
option = {
  title: {  // 主标题和副标题
    text: '雷达图',
    subtext: 'NBA球员得分雷达图',
  },
  legend: { // 图例的数据数组
    data: ['Giannis Antetokounmpo', 'Nikola Jokic']
  },
  radar: {
    // shape: 'circle',
    indicator: [ //雷达图的指示器，用来指定雷达图中的多个变量（维度）
      { name: '投篮', max: 100 },
      { name: '三分球', max: 100 },
      { name: '罚球', max: 100 },
      { name: '进攻篮板', max: 10 },
      { name: '防守篮板', max: 20 },
      { name: '抢断', max: 10 },
      { name: '盖帽', max: 10 },
      { name: '失误', max: 10 },
      { name: '犯规', max: 10 },
    ]
  },
  series: [
    {
      name: 'Giannis Antetokounmpo vs Nikola Jokic',
      type: 'radar', // 雷达图
      data: [
        {
          value: [49.1, 22, 67.9, 2.2, 12, 0.7, 1.3, 4.5, 3.6],
          name: 'Giannis Antetokounmpo'
        },
        {
          value: [57.5, 27.8, 84.8, 3.4, 9.8, 1.6, 1, 4.8, 4],
          name: 'Nikola Jokic'
        }
      ]
    }
  ]
};

export default option