import cloudinary from 'cloudinary';

const imageUploader = (req, res, next) => {
    cloudinary.v2.uploader.upload(req.files[0].path, (error, result) => {
        req.body.imageUrl = result.secure_url;
        return next();
    });
};

export default imageUploader;
