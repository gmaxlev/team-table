import React from "react";
import Styles from './styles.module.scss'

interface IComponentProps {
    text: string
}

export default function Loading({text}: IComponentProps) {
    return <div className={Styles.loading}>{text}</div>
}