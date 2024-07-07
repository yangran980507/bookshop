const KEY_TOKEN = 'book-shop-token'
const KEY_USER = 'book-shop-user'

// 1.获取token
export const getToken = () => {
  return sessionStorage.getItem(KEY_TOKEN)
}

// 2.删除token
export const delToken = () => {
  sessionStorage.removeItem(KEY_TOKEN)
}

// 3.获取user
export const getUser = () => {
  return JSON.parse(sessionStorage.getItem(KEY_USER))
}

// 2.删除user
export const delUser = () => {
  sessionStorage.removeItem(KEY_USER)
}
