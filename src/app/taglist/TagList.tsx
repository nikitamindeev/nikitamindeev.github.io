import { Tag } from '../../models/tag'
import style from './TagList.module.css'

export default function TagList({tags, selected, onSelected}: TagListProps) {

    return <div className={style.tags}>
        <div className={style['tag-row']}>
            {
                tags.filter((_, index, arr) => index < Math.floor(arr.length / 2)).map(tag => (
                    <span
                        key={tag.id}
                        className={`${style.tag} ${selected && selected.id == tag.id ? style['tag-selected'] : ""}`}
                        onClick={() => onSelected(tag)}
                    >
                        {tag.text}
                    </span>
                ))
            }
        </div>
        <div className={style['tag-row']}>
            {
                tags.filter((_, index, arr) => index >= Math.floor(arr.length / 2) + arr.length % 2).map(tag => (
                    <span
                        key={tag.id}
                        className={`${style.tag} ${selected && selected.id == tag.id ? style['tag-selected'] : ""}`}
                        onClick={() => onSelected(tag)}
                    >
                        {tag.text}
                    </span>
                ))
            }
        </div>
    </div> 

}

interface TagListProps {
    tags: Tag[],
    onSelected: (tag: Tag) => void,
    selected?: Tag
}