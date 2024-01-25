import { useState } from "react"
import srcDefault from '../assets/imgs/no-pic.jpeg'

interface useReadFile{
    srcCustom? : string
}

export default function useReadFile({srcCustom} : useReadFile){
    const defaultImg = srcCustom ? srcCustom : srcDefault
    const [imgSrc, setImgSrc] = useState(defaultImg)

    const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>): void => {
        if (e.target.files != null && e.target.files.length > 0) {
          const reader = new FileReader()
          reader.addEventListener('load', () => {
            setImgSrc(reader.result?.toString() ?? '')
          })
          reader.readAsDataURL(e.target.files[0])
        }
    }

    const quitImage = ( cb : Function ): void => {
        setImgSrc(defaultImg)
        cb()
    }

    return { imgSrc, onSelectFile, quitImage }
}