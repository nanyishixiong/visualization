import { Suspense, lazy, useContext, useLayoutEffect } from 'react';
import { Route, Routes } from 'react-router-dom'
import { Permission } from '@/App'
import Loding from '@/component/Loading';

/**
 * 自动获取pages目录下的 文件名字
 * 规则每个页面放在一个文件夹中的index.jsx文件
 * @author NanYi
 */
function getCompomentPath() {
  let getCompoment = require.context('@/pages', true, /index\.jsx$/)
  return getCompoment.keys().map(src => {
    let path = src.match(/\/.*?(?=\/)/) || { 0: '/' }// 取出文件路径, './DocList/index.jsx'  经过正则得到 /DocList || 默认根路径
    // path 正常情况下就是一个对象，如果取不到就用pages下的index页面代替
    return path[0]
  })
}

/**
 * 鉴权函数，判断此组件是否在权限范围内 (不同的鉴权方式可在此函数中修改)
 * @param {Array} permissionList
 * @param {string} componentName
 */
function authentication(permissionList, componentName) {
  // return true
  return permissionList.indexOf(componentName) >= 0
}

/**
 * 创建一个懒加载组件
 * @param {string} path
 * @returns
 */
function creatLazyComponent(path) {
  let Component = lazy(() => import(`@/pages${path}`))
  return function LazyComponent(props) {
    return (
      <Suspense fallback={<Loding />}>
        <Component {...props} />
      </Suspense>
    )
  }
}

/**
 * 路由拦截
 * @param {*} Component
 * @param {*} config
 * @returns
 */
function RouteInterception(Component, config) {
  const { before, after } = config || {}
  return function ProRouteComponent(props) {
    // const ref = useRef()
    // 进入路由前触发
    before && before()
    // 路由挂载之后触发
    useLayoutEffect(() => {
      after && after()
    }, [])

    return <Component {...(props || {})} />
  }
}

export default function RouteRouter(props) {
  // 获取目录下文件路径
  let paths = getCompomentPath('pages')
  // 获取权限数组
  const permissionList = useContext(Permission)

  let routes = paths.map(path => {
    // 判断是否有权限
    const isMatch = authentication(permissionList, path)
    // 创建懒加载组件
    let Component = creatLazyComponent(isMatch ? path : '/NoPermission')
    // 路由拦截
    let RouteComponent = RouteInterception(Component, props.config)
    return (
      <Route
        key={path}
        path={path}
        element={<RouteComponent />}
      />
    )
  })
  return (
    <Routes>
      {routes}
    </Routes>
  )
}