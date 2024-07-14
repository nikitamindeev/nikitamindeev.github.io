import { TagImage } from "../../models/image";
import { Tag } from "../../models/tag";
import Image from "../image/Image";
import style from './ImgList.module.css'

export default function ImgList({tags, images, onSelected, selected}: ImgListProps) {

    return <div className={style.imglist}>
        {
            images.map(img => (
                <div key={`${img.tag_id}_${img.url}`}>
                    <Image
                        img={img}
                        selected={selected.filter(s => s.tag_id == img.tag_id && s.url == img.url).length > 0}
                        onSelected={() => onSelected(img)}
                    />
                    <span>{tags.find(t => t.id == img.tag_id)!.text}</span>
                </div>
            ))
        }
    </div>

}

interface ImgListProps {
    tags: Tag[],
    images: TagImage[],
    selected: TagImage[],
    onSelected: (img: TagImage) => void
}