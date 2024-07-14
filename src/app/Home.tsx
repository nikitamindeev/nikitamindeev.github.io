import { useEffect, useMemo, useState } from 'react'
import style from './Home.module.css'
import TagList from './taglist/TagList'
import { Tag } from '../models/tag';
import { TagImage } from '../models/image';
import ImgList from './imglist/ImgList';
import SendPage from './send_page/SendPage';
import { Telegram } from '../models/telegram';
import SmallImgList from './imglist/small/SmallImgList';
import { Api } from '../api/Api';

declare global {
    interface Window {
        Telegram: Telegram
    }
}

export default function App() {

    const [isSend, setIsSend] = useState<boolean>(false)
    const [selectedTag, setSelectedTag] = useState<Tag>()
    const [imagesSelected, setImagesSelected] = useState<TagImage[]>([])
    const [tags, setTags] = useState<Tag[]>([])
    const randomImages = useMemo(() => {
        const res: TagImage[] = []
        randomChoice(tags, 3).map(tag => {
            res.push({
                tag_id: tag.id,
                url: randomChoice(tag.images, 1)[0]
            })
        })
        return res
    }, [tags])

    useEffect(() => {
        async function getData() {
            Api.getTags().then(res => {
                setTags(res)
                window.Telegram.WebApp.ready()
            })
        }
        window.Telegram.WebApp.BackButton.onClick(() => SetSendPage(false))
        getData()
    }, [])

    function randomChoice<T>(arr: T[], count: number): T[] {
        const res: T[] = []
        arr = arr.slice()
        for (let i = 0; i < count; i++) {
            if (arr.length == 0) break
            const index = Math.floor(Math.random() * arr.length)
            res.push(arr.splice(index, 1)[0])
        }
        return res
    }

    function onSelectedTag(tag: Tag) {
        if (selectedTag && selectedTag.id == tag.id) setSelectedTag(undefined)
        else setSelectedTag(tag)
        setImagesSelected([])
    }

    function onSelectedImage(img: TagImage) {
        if (imagesSelected.filter(im => im.tag_id == img.tag_id && im.url == img.url).length == 0) setImagesSelected(prevSel => {
            return [...prevSel, img]
        })
        else setImagesSelected(prevSel => {
            return [...prevSel.filter(im => im.tag_id != img.tag_id || im.url != img.url)]
        })
    }

    function SetSendPage(show: boolean) {
        if (show) window.Telegram.WebApp.BackButton.show()
        else window.Telegram.WebApp.BackButton.hide()
        setIsSend(show)
    }

    if (tags.length == 0) return <></>
    return <div className={style.page}>
        {
        isSend
            ? <SendPage images={imagesSelected} />
            : <>
                <div className={style.header}>
                    <span className={style.title}><b>За что говорим спасибо ?</b></span>
                    <TagList tags={tags} selected={selectedTag} onSelected={onSelectedTag} />
                </div>
                <div className={style.content}>
                {
                    !selectedTag 
                        ? <ImgList tags={tags} images={randomImages} selected={imagesSelected} onSelected={onSelectedImage} />
                        : <>
                            <span className={style.title} style={{fontSize: "16px"}}><b>Выберите наиболее подходящее фото</b></span>
                            <span className={style.desc}>Не забудьте написать свое пожелание в поле, чтобы поделиться своим признанием</span>
                            <SmallImgList
                                images={selectedTag.images.map(img => ({tag_id: selectedTag.id, url: img}))}
                                selected={imagesSelected}
                                onSelected={onSelectedImage}
                            />
                        </>
                }
                </div>
                <div className={style.footer}>
                    <button className="button" onClick={() => SetSendPage(true)}>Продолжить</button>
                </div>
            </>
        }
    </div>

}