import { TagImage } from '../../models/image'
import style from './Image.module.css'

export default function Image({img, selected, onSelected, onLoad, is_small}: ImageProps) {
    return <div className={style['img-container']}>
        <img
            src={img.url}
            className={`${style.img}
            ${selected ? style['img-selected'] : ''}`}
            style={(selected && is_small) ? {height: "calc(100% - 7px)"} : {}}
            onClick={onSelected}
            onLoad={onLoad}
        />
        {/* {selected && <img src="/img/mark.png" className={style.mark} />} */}
    </div>
}

interface ImageProps {
    img: TagImage,
    selected: boolean,
    onSelected: () => void
    onLoad?: () => void,
    is_small?: boolean,
}