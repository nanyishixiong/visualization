import { Navigate } from 'react-router-dom'

export default function index() {
  // 路由 '/' 重定向到 '/Coursedesign'
  return <Navigate to={'/Coursedesign'} replace={true} />
}
