const required = {
  DB_HOST: 'DB_HOST',
  DB_USER: 'DB_USER',
  DB_PASSWORD: 'DB_PASSWORD',
  DB_NAME: 'DB_NAME',
  JWT_SECRET: 'JWT_SECRET',
}
export function validateEnv(keys = Object.keys(required)) {
  const missing = keys.filter((key) => {
    if (key === 'DB_PASSWORD' && process.env.DB_PASSWORD === '') {
      return false
    }

    return !process.env[key] || !String(process.env[key]).trim()
  })

  if (missing.length > 0) {
    throw new Error(`Thiếu biến môi trường bắt buộc: ${missing.join(', ')}`)
  }

  return true
}

export function ensureRequiredEnv() {
  return validateEnv(Object.keys(required))
}
