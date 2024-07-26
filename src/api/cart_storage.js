// 存储购物车数据
export const setCart = (uid, bookID, amount) => {
  localStorage.setItem(uid + ':' + bookID, String(amount))
}

// 读取购物车数据
export const getCart = (uid, bookID) => {
  return Number(localStorage.getItem(uid + ':' + bookID))
}

// 删除购物车数据
export const delCart = (uid, bookID) => {
  localStorage.removeItem(uid + ':' + bookID)
}

// 清空购物车数量
export const clearCart = () => {
  localStorage.clear()
}

// 存储订单数据
export const setOrders = (uid, books) => {
  sessionStorage.setItem(uid, JSON.stringify(books))
}

// 获取订单数据
export const getOrders = (uid, books) => {
  return JSON.parse(sessionStorage.getItem(uid))
}

// 清空订单数据
export const flushOrders = (uid) => {
  sessionStorage.removeItem(uid)
}
