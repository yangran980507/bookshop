// 存储购物车数据
export const setCart = (uid, bookID) => {
  localStorage.setItem(uid + ':' + bookID, '1')
}

// 读取购物车数据
export const getCart = (uid, bookID) => {
  return localStorage.getItem(uid + ':' + bookID)
}

// 删除购物车数据
export const delCart = (uid, bookID) => {
  localStorage.removeItem(uid + ':' + bookID)
}

// 增减购物车数量
export const subCart = (uid, bookID, num) => {
  localStorage.setItem(uid + ':' + bookID, num)
}

// 清空购物车数量
export const clearCart = (uid, bookID, num) => {
  localStorage.clear()
}
