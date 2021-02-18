import React from "react";
import Styles from './styles.module.scss'
import {classNames} from '../../utils'


interface IComponentProps {
    date: Date,
    next: Function,
    prev: Function
}

export default function Navigation({date, next, prev}: IComponentProps) {
    return <div className={Styles.calendarBar}>
        <button onClick={() => prev()} className={classNames([Styles.calendarBar__nav, Styles.calendarBar__nav_prev])}></button>
        <span className={Styles.calendarBar__current}>{date.toLocaleDateString("en-US", { month: "long", year: "numeric" })}</span>
        <button onClick={() => next()} className={classNames([Styles.calendarBar__nav, Styles.calendarBar__nav_next])}></button>
    </div>

}