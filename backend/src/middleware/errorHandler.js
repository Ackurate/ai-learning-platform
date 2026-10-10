export function notFound(req, res) {
  res.status(404).json({ message: 'Không tìm thấy đường dẫn' })
}

// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  const status = err.status || 500
  if (status >= 500) console.error(err)
  res.status(status).json({
    message: status >= 500 && !err.status ? 'Lỗi máy chủ' : err.message,
  })
}
