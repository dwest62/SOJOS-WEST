const info = (...params) => {
  // eslint-disable-next-line no-undef
  if (process.env.NODE_ENV !== 'development') {
    console.log(...params)
  }
}

const error = (...params) => {
  // eslint-disable-next-line no-undef
  if (process.env.NODE_ENV !== 'development') {
    console.error(...params)
  }
}
module.exports ={
  info, error
}