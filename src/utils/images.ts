
export async function uploadImage(file) {
    
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', process.env.CLOUDINARY_UPLOAD_PRESET)

    const res = await fetch(`https://api.Cloudinary.com/v1_1/${process.env.CLOUDINARY_NAME}/image/upload`, {
        method: 'POST',
        body: formData
    })
    const json = await res.json()

    return <string>json.secure_url
}