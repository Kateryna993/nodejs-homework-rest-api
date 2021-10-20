const multer = require('multer')
const path = require('path')

const tempDir = path.join(__dirname, 'temp')
console.log(tempDir)

const uploadSetting = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir) // cb - аналог next, первый аргумент ошибка или null, второй - путь к папке
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname) // начальное имя файла
  },
  limits: {
    fileSize: 2048,
  },
})

const upload = multer({
  storage: uploadSetting,
})

module.exports = upload
