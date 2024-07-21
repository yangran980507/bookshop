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
export const clearCart = (uid, bookID, num) => {
  localStorage.clear()
}
