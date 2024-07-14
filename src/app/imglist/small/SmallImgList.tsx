import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { TagImage } from '../../../models/image'
import Image from '../../image/Image'
import style from './SmallImgList.module.css'

function useWindowSize() {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
      function updateSize() {
        setSize([window.innerWidth, window.innerHeight]);
      }
      window.addEventListener('resize', updateSize);
      updateSize();
      return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
}

export default function SmallImgList({images, selected, onSelected}: SmallImgListProps) {

    const imagesRef = useRef<HTMLDivElement>(null)
    const [width, height] = useWindowSize()

    function updateSizes() {
        const children = Array.from(imagesRef.current!.children) as HTMLDivElement[]
        children.forEach(img => img.style.height = "")
        const smaller = children.sort((a, b) => a.offsetHeight - b.offsetHeight)[0]
        children.forEach(img => img.style.height = smaller.offsetHeight.toString() + "px")
    }

    useEffect(updateSizes, [width, height])

    return <div className={style['tag-images']} ref={imagesRef}>
        {images.map(img => (
            <Image
                key={`${img.tag_id}_${img.url}`}
                img={img}
                selected={selected.filter(s => s.tag_id == img.tag_id && s.url == img.url).length > 0}
                onSelected={() => onSelected(img)}
                onLoad={updateSizes}
                is_small={true}
            />
        ))}
    </div>
}

interface SmallImgListProps {
    images: TagImage[],
    selected: TagImage[],
    onSelected: (img: TagImage) => void
}