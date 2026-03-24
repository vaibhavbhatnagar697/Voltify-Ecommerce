import Cloudinary from "../Config/cloudinary.js";
import streamifier from "streamifier"
const fileUpload = async (files) => {
    const uploadSingleFile = (file) => {
        return new Promise((resolve, reject) => {
            let stream = Cloudinary.uploader.upload_stream({ folder: "ProductImages", width: 800, height: 800, crop: "limit" }, (error, result) => {

                if (error) {

                    return reject(error)
                } else {

                    resolve(result)
                }

            })


            streamifier.createReadStream(file.buffer).pipe(stream)


        })
    }

    const result = await Promise.all(files.map((v) => uploadSingleFile(v)))

    return result

}
const uploadImage = async (req, res) => {
    try {
        console.log(req.files)
        const upload = await fileUpload(req.files)
        if (!upload) {
            return res.status(400).json({
                success: false,
                msg: "image is not uploaded"
            })
        }
        console.log(upload)
        const images = upload.map((v) => (
            {
                "image_id": v.public_id,
                "image_url": v.secure_url
            }
        ))
        console.log(images)
        return res.status(200).json({
            success: true,
            msg: "Image uploaded successfully",
            images: images
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: error.message
        })
    }

}
export default uploadImage 