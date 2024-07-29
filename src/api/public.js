// 时间戳转换
export const formatDate = (time) => {
  if (time !== 0) {
    let date = new Date(time * 1000)
    let Y = date.getFullYear() + '-'
    let M = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) + '-' : date.getMonth() + 1 + '-'
    let D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' '
    return Y + M + D
  } else {
    return ''
  }
}

// 时间戳转换到秒
export const formatDateToSecond = (time) => {
  if (time !== 0) {
    let date = new Date(time * 1000)
    let Y = date.getFullYear() + '-'
    let M = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) + '-' : date.getMonth() + 1 + '-'
    let D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' '
    let H = date.getHours() + ':'
    let m = date.getMinutes() + 1 < 10 ? '0' + (date.getMinutes()) + ':' : date.getMinutes() + ':'
    let S = date.getSeconds() < 10 ? '0' + date.getSeconds() + ' ' : date.getSeconds() + ' '
    return Y + M + D + H + m + S
  } else {
    return ''
  }
}
