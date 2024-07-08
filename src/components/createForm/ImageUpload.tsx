import { useCallback, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FileRejection, useDropzone } from 'react-dropzone'

type FileWithPreview = File & {
    preview: string;
};

type ImageHandlerProps = {
    imageHandler: (img: File[]) => void
}


const ImageUpload = ({ imageHandler = () => { } }: ImageHandlerProps) => {
    const [files, setFiles] = useState<FileWithPreview[]>([])
    const [rejectionErr, setRejectionErr] = useState<string>('')
    const onDrop = useCallback((acceptedFiles: File[], fileRejections: FileRejection[]) => {

        if (fileRejections.length > 0) {
            let errMessage = fileRejections[0].errors[0].message
            switch (errMessage) {
                case 'Too many files':
                    errMessage = `Максималният брой снимки е 4, Вие сте качили ${fileRejections.length}`
                    break;
                case 'File type must be image/png,.png,image/jpeg,.jpeg':
                    errMessage = `Позволените файлови формати са jpeg или png`
                    break
            }
            setRejectionErr(errMessage)
        } else {
            setRejectionErr('')
        }
        const filePreviews = acceptedFiles.map(file => {
            const preview = URL.createObjectURL(file);
            return { ...file, preview };
        });
        
        setFiles(filePreviews);
        imageHandler(acceptedFiles)
    }, [])

    const handleDelete = (e: React.MouseEvent<HTMLButtonElement>, index: number) => {
        e.stopPropagation();
        e.preventDefault();
        setFiles(files => files.filter((_, i) => i !== index));
    }
    const { getRootProps, getInputProps, } = useDropzone({
        onDrop,
        accept: {
            'image/png': ['.png'],
            'image/jpeg': ['.jpeg']
        },
        maxFiles: 4
    })

    return (
        <div className='bg-slate-200 min-h-96 p-3 flex items-center flex-col  text-slate-800 rounded-md shadow-inner' {...getRootProps()}>
            <input {...getInputProps()} />
            <p className='pb-4 text-2xl'>Добавете снимки</p>
            <p className='text-2xl'>Позволените формати са jpeg и png и максималният брой на снимките е 4</p>
            <p className='text-2xl'>Drag'n'Drop</p>
            {rejectionErr && (<p className='text-red-600'>{rejectionErr}</p>)}
            <div className='flex flex-wrap gap-5'>
                {files.map((file, index) => (
                    <div key={index} className='relative flex justify-center items-center group'>
                        <div className='group-hover:opacity-35' >
                            <img src={file.preview} alt={file.name} className='w-[220px] aspect-square rounded-sm' />
                        </div>
                        <button onClick={(e) => handleDelete(e, index)} className='absolute w-14 h-14 right-20 hidden group-hover:inline bg-slate-200 p-4 rounded-full text-slate-800'>
                            <FontAwesomeIcon className='text-2xl' icon={faTrash} />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ImageUpload