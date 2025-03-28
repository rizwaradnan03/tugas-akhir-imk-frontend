import { IFEssayQuestionModules } from '@/interfaces/form-interface'
import { UseEncodeFileToBase64 } from '@/lib/base64'
import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

const EssayDropzone = ({ setFiles, files, maximumFiles, indexParent }: { setFiles: (files: IFEssayQuestionModules[]) => void, files: IFEssayQuestionModules[], maximumFiles: number, indexParent: number }) => {

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

        setFiles((prevFiles) => {
            let duplicateFiles = [...prevFiles]
            duplicateFiles[indexParent].files = base64Files

            return duplicateFiles
        })
    }, [])
    // console.log("files dari dropzone ", files)

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    return (
        <>
            <div className='flex shadow-md p-8 rounded-md border-dashed border-2 justify-center' {...getRootProps()}>
                <input {...getInputProps()} />
                {isDragActive ? (
                    <h1>Drop Files Kesini</h1>
                ) : (
                    files[indexParent] && files[indexParent].files.length > 0 ? (
                        <div className='grid grid-cols-4 gap-2'>
                            {
                                files[indexParent].files.map((file, index) => (
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

export default EssayDropzone