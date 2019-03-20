const getNowTime = () => {
  const date = new Date()
  const year = setZero(date.getFullYear())
  const month = setZero(date.getMonth() + 1)
  const day = setZero(date.getDate())
  const hour = setZero(date.getHours())
  const minute = setZero(date.getMinutes())
  const second = setZero(date.getSeconds())
  return `${year}-${month}-${day} ${hour}:${minute}:${second}`
}

const setZero = (num) => {
  num < 10 ? num = '0' + num : num = "" + num
  return num
}

export {
  getNowTime
}
