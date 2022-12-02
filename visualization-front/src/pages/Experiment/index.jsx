import React, { useLayoutEffect, useEffect, useState } from 'react'
import * as echarts from 'echarts';
import Loading from '@/component/Loading'


export async function getOptions() {
  let arr = []
  let paths = require.context('@/pages/Experiment', true, /\.js$/) // 获取所有图表配置文件的路径
  for (let path of paths.keys()) {
    let option = await import(`@/pages/Experiment${path.match(/\/.*?(?=\.)/)[0]}`) // 读取文件数据
    arr.push(option.default)
  }
  return arr
}

export default function Chart() {
  const [option, changeOption] = useState()
  const [arr, setArr] = useState([])
  useLayoutEffect(() => {
    getOptions().then((arr) => {
      setArr(arr)
      changeOption(arr[0])
    })
  }, [])
  useEffect(() => {
    var chartDom = document.getElementById('main'); // 获取容器
    var myChart = echarts.init(chartDom); // 初始化图表
    option && myChart.setOption(option); // 导入图表配置
    return () => {
      myChart.dispose()
    }
  }, [option])
  return <div>
    {
      arr.length
        ? arr.map((option, index) => {
          return <button key={index} onClick={() => { changeOption(option) }}>图表{index + 1}</button>
        })
        : <Loading />
    }
    <div id="main" style={{ width: '90vw', height: '90vh' }}>
    </div>
  </div>
}