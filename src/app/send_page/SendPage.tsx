import { FormEvent, useState } from 'react'
import { TagImage } from '../../models/image'
import SmallImgList from '../imglist/small/SmallImgList'
import style from './SendPage.module.css'
import { Api } from '../../api/Api'

export default function SendPage({images}: SendPageProps) {

    const [text, setText] = useState<string>("")
    const [name, setName] = useState<string>("")
    const [email, setEmail] = useState<string>("")

    const [names, setNames] = useState<string[]>([])
    const [emailes, setEmailes] = useState<string[]>([])

    function onName(name: string) {
        setName(name)
        if (name.length >= 1) Api.searchName(name).then(setNames)
        else setNames([])
    }
    
    function onEmail(email: string) {
        setEmail(email)
        if (email.length >= 1) Api.searchEmail(email).then(setEmailes)
        else setEmailes([])
    }

    function sendData(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        
        Api.send(name, email, text, images.map(img => img.url), window.Telegram.WebApp.initData).then(() => {
            window.Telegram.WebApp.showPopup({
                title: "Сообщение отправлено",
                message: "Ваше сообщение было успешно доставлено"
            }, () => window.Telegram.WebApp.close())
        }).catch((err: {res: Response, err: Error}) => {
            window.Telegram.WebApp.showPopup({
                title: "Ошибка",
                message: err.res.status == 404 ? "Получатель не найден" : "Неизвестная ошибка при отправке"
            })
        })
    }

    return <div className={style['send-page']}>
        <SmallImgList images={images} selected={[]} onSelected={() => {}} />
        <form className={style.form} onSubmit={sendData} >
            <span style={{marginTop: "10px"}}>Ваше признание</span>
            <textarea
                className={style.text}
                placeholder='Я давно хотел тебе сказать...'
                value={text}
                onChange={e => setText(e.target.value)}
                required
            />
            <input
                className={style.input}
                placeholder='Имя получателя'
                value={name}
                onChange={e => onName(e.target.value)}
                list='names'
                required
            />
            <input
                className={style.input}
                placeholder='Email получателя'
                value={email}
                onChange={e => onEmail(e.target.value)}
                list='emailes'
            />
            <button className="button" style={{height: "32px", "marginTop": "auto"}}>Отправить</button>
        </form>
        <datalist id="names">
            {names.map(n => (
                <option>{n}</option>
            ))}
        </datalist>
        <datalist id="emailes">
            {emailes.map(e => (
                <option>{e}</option>
            ))}
        </datalist>
    </div>
}

interface SendPageProps {
    images: TagImage[]
}