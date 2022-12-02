const express = require('express')
const path = require('path')
const fs = require("fs");
const xlsx = require('node-xlsx');
const Heap = require('./heap.js')

const app = express()

app.listen(80, () => {
  console.log("express running at port 80...");
})

//设置跨域请求
app.all('*', function (req, res, next) {
  //设置请求头
  //允许所有来源访问
  res.header('Access-Control-Allow-Origin', '*')
  //用于判断request来自ajax还是传统请求
  res.header("Access-Control-Allow-Headers", " Origin, X-Requested-With, Content-Type, Accept");
  //允许访问的方式
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  //修改程序信息与版本
  res.header('X-Powered-By', ' 3.2.1')
  //内容类型：如果是post请求必须指定这个属性
  res.header('Content-Type', 'application/json;charset=utf-8')
  next()
})


app.get('/data', function (req, res) {
  res.send({
    code: 200,
    success: true,
    data: getExcleData(),
  })
})

app.get('/profit', function (req, res) {
  res.send({
    code: 200,
    success: true,
    data: getExcleData1(),
  })
})

app.get('/genre', function (req, res) {
  res.send({
    code: 200,
    success: true,
    data: getExcleData2(),
  })
})

app.get('/abc', function (req, res) {
  res.send({
    code: 200,
    success: true,
    data: getExcleData3(),
  })
})

const data2007 = xlsx.parse(`${__dirname}/HollywoodMovie/2007.csv`)[0].data;
const data2008 = xlsx.parse(`${__dirname}/HollywoodMovie/2008.csv`)[0].data;
const data2009 = xlsx.parse(`${__dirname}/HollywoodMovie/2009.csv`)[0].data;
const data2010 = xlsx.parse(`${__dirname}/HollywoodMovie/2010.csv`)[0].data;
const data2011 = xlsx.parse(`${__dirname}/HollywoodMovie/2011.csv`)[0].data;
let data = data2007.concat(data2008, data2009, data2010, data2011)

// 取 0，3，20
function getExcleData() {
  let result = []
  data.forEach((item, index) => {
    if (index === 0) return;
    if (item[0] && item[2] && item[20]) {
      let a = item[20].replace('$', '')
      if (a > 1000000) {
        a = Math.round(a / 1000000)
      }
      result.push([item[2], a, item[0]])
    }
  })
  return result
}

function getExcleData1() {
  let result = []
  data.forEach((item, index) => {
    if (index === 0) return;
    if (item[0] && item[20] && item[22]) {
      let a = item[20].replace('$', '') * 1//票房
      let b = item[22].replace('$', '') * 1//预算
      if (a > 1000000) {
        a = Math.round(a / 1000000)
      }
      if (b > 1000000) {
        b = Math.round(b / 1000000)
      }
      result.push([b, a, item[0]])
    }
  })
  return result
}

function getExcleData2() {
  let result = {}
  data.forEach((item, index) => {
    if (index === 0) return;
    if (item[5]) {
      if (result[item[5]]) {
        result[item[5]]++;
      } else {
        result[item[5]] = 1
      }
    }
  })
  return result
}


function getExcleData3() {
  let heap = new Heap([], (a, b) => a[0] < b[0])
  data.forEach((item, index) => {
    if (index === 0) return;
    if (item[0] && item[20] && item[5]) {
      let a = item[20].replace('$', '') //票房
      if (a > 1000000) {
        a = Math.round(a / 1000000)
      }
      if (heap.size() < 20) {
        heap.push([a, item[5], item[0]])
      } else {
        heap.exchange([a, item[5], item[0]])
      }
    }
  })
  return heap.arr;
}