import { createBrowserHistory } from '@remix-run/router'
import { Suspense, lazy, useContext } from 'react';
import { BrowserRouter as Router, Link, Route, Routes, Navigate, useRoutes } from 'react-router-dom'
import { Permission } from '@/App'
import { Outlet } from "react-router-dom"
import NoPermission from '@/pages/NoPermission'

/**
 * 自动获取pages目录下的 文件名字
 * 规则每个页面放在一个文件夹中的index.jsx文件
 * @author NanYi
 */
function getCompomentPath() {
  let getCompoment = require.context('@/pages', true, /index\.jsx$/)
  console.log(getCompoment.keys());
  return getCompoment.keys().map(src => {
    console.log(src);
    let path = src.match(/(?<=\/).*?(?=\/)/) || { 0: '/' }// 取出文件路径, './DocList/index.jsx'  经过正则得到 DocList || 默认根路径
    // path 正常情况下就是一个对象，如果取不到就用pages下的index页面代替
    console.log(path);
    return path[0]
  })
}

export default function UseRoutesRouter(props) {
  // 路由配置
  const config = []
  // 获取权限数组
  const permissionList = useContext(Permission)
  // 获取目录下文件路径
  let paths = getCompomentPath('pages')
  // 创建路由映射表
  paths.forEach(path => {
    if (path === '/') {
      config.push({
        path,
        element: <Navigate to={'/Home'} />
      })
      return;
    }
    const isMatch = authentication(permissionList, path)
    if (isMatch) {
      let LazyComponent = lazy(() => import(`@/pages/${path}`))
      config.push({
        path,
        element: <Suspense>
          <LazyComponent />
        </Suspense>
      })
    } else {
      config.push({
        path,
        element: <NoPermission />
      })
    }
  });

  return useRoutes(config);
}

/**
 * 鉴权函数，判断此组件是否在权限范围内 (不同的鉴权方式可在此函数中修改)
 * @param {Array} permissionList
 * @param {string} componentName
 */
function authentication(permissionList, componentName) {
  return permissionList.indexOf(componentName) >= 0
}

/**
 * 鉴权高阶组件
 * @param {authorization}
 * @author NanYi
 */
function PermissionHOC(authorization) {
  return function (Component) {
    return function App(props) {
      const permissionList = useContext(Permission)
      console.log(permissionList);
      const isMatch = permissionList.indexOf(authorization) >= 0
      return isMatch
        ? <Component {...props} />
        : <NoPermission />
    }
  }
}



