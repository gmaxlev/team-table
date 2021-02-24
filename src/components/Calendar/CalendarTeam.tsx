import React from "react";
import Styles from './styles.module.scss'
import {IPeriodDay, ITeam} from "../../types";
import IconTeam from '../../assets/team.svg'
import IconToggle from '../../assets/toggle.svg'
import {classNames, checkVacationsDate} from "../../utils";

interface IComponentProps {
    team: ITeam,
    activePeriod: Date,
    days: IPeriodDay[],
}

interface IComponentState {
    isOpen: boolean
}

export default class CalendarTeam extends React.Component<IComponentProps, IComponentState> {
    constructor(props: IComponentProps) {
        super(props);
        this.state = {
            isOpen: true
        }
        this.toggleShow = this.toggleShow.bind(this)
    }
    toggleShow(): void {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }
    render() {
        return <tbody>
            <tr className={Styles.calendarTable__teamHeader}>
                <td>
                    <div className={Styles.calendarTable__teamTitle}>
                        <span className={Styles.calendarTable__teamName}>{this.props.team.name}</span>
                        <span className={Styles.calendarTable__teamCount}>
                            <img src={IconTeam}/>
                            <span>{this.props.team.members.length}</span>
                        </span>
                        <span className={Styles.calendarTable__percentage}>{this.props.team.percentageOfAbsent[this.props.activePeriod.getMonth()]}%</span>
                        <button onClick={this.toggleShow} className={classNames({
                            [Styles.calendarTable__teamToogle]: true,
                            [Styles.calendarTable__teamToogle_open]: this.state.isOpen
                        })}>
                            <img src={IconToggle} />
                        </button>
                    </div>
                </td>
                {this.props.days.map((day, key) => <td key={key} className={classNames({
                    [Styles.calendarTable__dayOff]: day.isDayOff,
                })}></td>)}
            </tr>
            {this.state.isOpen && this.props.team.members.map((member, key) => <tr key={key}>
                <td>
                    <div className={Styles.calendarTable__teamTitle}>{member.name}</div>
                </td>
                {this.props.days.map((day, key) => <td key={key} className={classNames({
                    [Styles.calendarTable__dayOff]: day.isDayOff,
                    [Styles.calendarTable__vacations]: checkVacationsDate(member.vacations, day.date)
                })}></td>)}
            </tr>)}
        </tbody>;
    }
}