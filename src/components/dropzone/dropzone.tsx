import { UseEncodeFileToBase64 } from '@/lib/base64'
import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

const Dropzone = ({ setFiles, files, maximumFiles }: { setFiles: (files: string[]) => void, files?: string[], maximumFiles: number }) => {

    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        let filesArray: File[] | undefined = undefined

        if (acceptedFiles.length > maximumFiles) {
            filesArray = acceptedFiles.slice(0, maximumFiles)
        } else {
            filesArray = acceptedFiles
        }

        if (!filesArray) {
            return
        }

        let base64Files: string[] = []

        for (let i = 0; i < filesArray.length; i++) {
            const encodedFile = await UseEncodeFileToBase64({ file: filesArray[i] })

            base64Files.push(encodedFile)
        }

        setFiles(base64Files)
    }, [])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    return (
        <>
            <div className='flex shadow-md p-8 rounded-md border-dashed border-2 justify-center' {...getRootProps()}>
                <input {...getInputProps()} />
                {isDragActive ? (
                    <h1>Drop Files Kesini</h1>
                ) : (
                    files ? (
                        <div className='grid grid-cols-4 gap-4'>
                            {
                                files.map((file, index) => (
                                    <img key={index} src={file} width={300} alt="Gambar Preview" />
                                ))
                            }
                        </div>
                    ) : (
                        <div>
                            <h1>Drag & Drop File / Klik Zona Drop</h1>
                        </div>
                    )
                )}
            </div>
        </>
    )
}

export default Dropzone