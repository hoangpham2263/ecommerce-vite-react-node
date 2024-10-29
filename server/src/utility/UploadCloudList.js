const cloudinary = require("cloudinary").v2;
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
});

const UploadCloudList = async (imageFileNames, valueImage, folderStorage) => {
    try {
        const uploadPromises = valueImage.map((image, index) => 
            cloudinary.uploader.upload(image, { 
                folder: folderStorage, 
                public_id: `${imageFileNames[index]}`
            }).catch(err => null)
        );

        const uploadResults = await Promise.all(uploadPromises);
        const uploadImageLists = uploadResults.filter(result => result !== null).map(item => item.secure_url);
        return uploadImageLists;
    } catch (error) {
        throw error;
    }
};

export { UploadCloudList };
