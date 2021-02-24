import React from "react";
import Styles from './styles.module.scss'
import {classNames} from "../../utils";
import IconPlus from '../../assets/plus.svg'

interface IComponentProps {
    type?: 'icon-plus'
    text: string,
    onClick?:() => void
}

export default function Button({type = 'icon-plus', text, onClick}:IComponentProps) {
    return <button onClick={onClick} className={classNames({
        [Styles.button]: true,
        [Styles.button_iconPlus]: type ==='icon-plus'
    })}>
        {type==='icon-plus' && <img src={IconPlus}/>}
        <span>{text}</span>
    </button>
}