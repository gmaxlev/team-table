import React from "react";
import Styles from './styles.module.scss'
import {ICalendar, IPeriodDay} from "../../types";
import Button from "../Button/Button";
import {classNames} from "../../utils";
import CalendarTeam from "./CalendarTeam";

interface IComponentProps {
    calendar: ICalendar,
    days: IPeriodDay[],
    activePeriod: Date
}

export default function Calendar({calendar, days, activePeriod}: IComponentProps) {
    return <table className={Styles.calendarTable}>
        <thead>
            <tr>
                <td className={Styles.calendarTable__addVocation}>
                    <Button text={'Add Vacation'}/>
                </td>
                {days.map(day => <td className={classNames({
                    [Styles.calendarTable__dayOff]: day.isDayOff
                })}>
                    <span>{day.date.toLocaleDateString("en-US", { weekday: "short" }).substr(0, 2)}</span>
                    <span>{day.date.getDate()}</span>
                </td>)}
            </tr>
        </thead>
        {calendar.teams.map(team => <CalendarTeam days={days} team={team} activePeriod={activePeriod}/>)}
    </table>
}