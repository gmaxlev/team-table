import React from "react";
import Styles from './styles.module.scss'
import {ICalendar, IPeriodDay} from "../../types";
import Button from "../Button/Button";
import {classNames} from "../../utils";
import CalendarTeam from "./CalendarTeam";

interface IComponentProps {
    calendar: ICalendar,
    days: IPeriodDay[],
    activePeriod: Date,
    onAddVacation?: () => void
}

export default function Calendar({calendar, days, activePeriod, onAddVacation}: IComponentProps) {
    return <table className={classNames({
        [Styles.calendarTable]: true,
    })}>
        <thead>
            <tr>
                <td className={Styles.calendarTable__addVacation}>
                    <Button onClick={onAddVacation} text={'Add Vacation'}/>
                </td>
                {days.map((day, key) => <td key={key} className={classNames({
                    [Styles.calendarTable__dayOff]: day.isDayOff
                })}>
                    <span>{day.date.toLocaleDateString("en-US", { weekday: "short" }).substr(0, 2)}</span>
                    <span>{day.date.getDate()}</span>
                </td>)}
            </tr>
        </thead>
        {calendar.teams.map((team, key) => <CalendarTeam days={days} key={key} team={team} activePeriod={activePeriod}/>)}
    </table>
}