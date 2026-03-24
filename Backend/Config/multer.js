import multer from "multer"
const multerConfig = multer({ storage: multer.memoryStorage() }).array("images", 10)

export default multerConfig