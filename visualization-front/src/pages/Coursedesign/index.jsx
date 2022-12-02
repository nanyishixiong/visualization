import axios from 'axios'
import { useLayoutEffect, useState } from 'react'
import * as echarts from 'echarts';

// 数据来自，最赚钱的好莱坞故事2007-2011，5年的数据

function Com() {
  const [option, changeOption] = useState({})
  const [chartKey, changeChartKey] = useState(0)

  const getChart1 = function () {
    changeChartKey(0)
    axios.get('http://localhost:80/data').then(function (res) {
      let a = [
        {
          symbolSize: 10,
          data: res.data.data,
          colorBy: 'data',
          type: 'scatter'
        }
      ]

      changeOption(option => {
        option.series = a
        return { ...option }
      })
    })
  }

  const getChart2 = function () {
    changeChartKey(1)
    axios.get('http://localhost:80/profit').then(function (res) {
      changeOption(option => {
        option.series[0].data = res.data.data
        return { ...option }
      })
    })
  }

  // 最多的是Action(动作),Comedy(喜剧),Drama(戏剧)
  const getChart3 = function () {
    changeChartKey(2)
    axios.get('http://localhost:80/genre').then(function (res) {
      let obj = res.data.data

      changeOption(option => {
        option.series[0].data = Object.keys(obj).map((key) => {
          return { name: key, value: obj[key] }
        })
        return { ...option }
      })
    })
  }

  // 最多的是Action(动作),Comedy(喜剧),Drama(戏剧)
  const getChart4 = function () {
    changeChartKey(3)
    axios.get('http://localhost:80/abc').then(function (res) {
      let obj = res.data.data
      changeOption(option => {
        option.series = obj.map(item => {
          return {
            type: 'bar',
            stack: item[1],
            label: {
              show: true,
              formatter: '{@[2]}'
            },
            emphasis: {
              focus: 'series'
            },
            data: [
              [item[1], item[0], item[2]]
            ]
          }
        })
        return { ...option }
      })
    })
  }

  useLayoutEffect(() => {
    console.log(chartKey);
    let path = require.context('./', true, /\.js$/).keys()[chartKey]
    import(`@/pages/Coursedesign${path.match(/\/.*?(?=\.)/)[0]}`).then((option) => {
      option = option.default
      changeOption({ ...option })
    })
  }, [chartKey])

  useLayoutEffect(() => {
    console.log(11);
    console.log(option);
    var chartDom = document.getElementById('main'); // 获取容器
    var myChart = echarts.init(chartDom); // 初始化图表
    option && myChart.setOption(option); // 导入图表配置
    return () => {
      myChart.dispose()
    }
  }, [option])

  return <div>
    <button onClick={getChart1}>票房与评分</button>
    <button onClick={getChart2}>预算与票房</button>
    <button onClick={getChart3}>题材频率</button>
    <button onClick={getChart4}>题材与票房</button>
    <div id="main" style={{ width: '90vw', height: '90vh' }}>
    </div>
  </div>
}

export default Com