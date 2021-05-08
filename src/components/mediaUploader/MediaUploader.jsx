import React, { useState } from 'react'

export default function MediaUploader() {

    const [file, setFile] = useState('')
    const [selectedFile, setSelectedFile] = useState('')
    const [previewSource, setPreviewSource] = useState('')

    const handleFileInputChange = e => {
        const file = e.target.files[0];

        previewFile(file)
    }

    const previewFile = file => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result)
        }
    }


    const handleSubmitFile = e => {
        e.preventDefault()

        if (!previewSource) return

        uploadImage(previewSource)
    }

    const uploadImage = (base64EncodedImage) => {
        console.log(base64EncodedImage)
    }

    return (
        <div>
            <input type="file" name="file" onChange={handleFileInputChange} value={file} />

        </div>
    )
}
