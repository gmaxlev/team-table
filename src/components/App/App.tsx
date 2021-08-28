import React from 'react';
import {fetchCalendar} from "../../API";
import {ICalendar, IPeriodDay} from "../../types";
import Loading from '../Loading/Loading'
import Navigation from "../Navigation/Navigation";
import Calendar from "../Calendar/Calendar";
import AddVacationModal from "../AddVacationModal/AddVacationModal";

interface IState {
    activeDate: Date,
    calendarData: ICalendar | null,
    isShowModal: boolean
}

export default class App extends React.Component<{}, IState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            activeDate: new Date(),
            calendarData: null,
            isShowModal: false,
        }
        this.nextMonth = this.nextMonth.bind(this)
        this.prevMonth = this.prevMonth.bind(this)
        this.addVacation = this.addVacation.bind(this)
    }
    nextMonth():void {
        this.setState({
            activeDate: new Date(this.state.activeDate.setMonth(this.state.activeDate.getMonth() + 1))
        })
    }
    prevMonth():void {
        this.setState({
            activeDate: new Date(this.state.activeDate.setMonth(this.state.activeDate.getMonth() - 1))
        })
    }
    addVacation(team: number, member: number, dateFrom: Date, dateTo: Date) {
        if (this.state.calendarData!==null) {
            const calendarData: ICalendar = JSON.parse(JSON.stringify(this.state.calendarData))
            const dateFromFix = new Date(dateFrom.setMonth(dateFrom.getMonth()+1));
            const dateToFix = new Date(dateTo.setMonth(dateTo.getMonth()+1));
            calendarData.teams[team].members[member].vacations.push({
                startDate: `${('0' + dateFromFix.getDate()).slice(-2)}.${('0' + dateFromFix.getMonth()).slice(-2)}.${dateFromFix.getFullYear()}`,
                endDate: `${('0' + dateToFix.getDate()).slice(-2)}.${('0' + dateToFix.getMonth()).slice(-2)}.${dateToFix.getFullYear()}`,
                type: 'Paid'
            })
            this.setState({
                ...this.state,
                calendarData: calendarData
            })
        }
    }
    getDaysOfActivePeriod(): IPeriodDay[] {
        const year = this.state.activeDate.getFullYear();
        const month = this.state.activeDate.getMonth();
        const date = new Date(year, month, 1);
        const days = [];
        while (date.getMonth() === month) {
            const item = new Date(date);
            days.push({
                isDayOff: item.getDay() === 0 || item.getDay() === 6,
                date: item,
            });
            date.setDate(date.getDate() + 1);
        }
        return days;
    }
    async componentDidMount() {
        try {
            const calendarData = await fetchCalendar();
            this.setState({
                calendarData: calendarData
            })
        } catch (e) {
            alert(e)
        }
    }
    toggleShowModal = (show: boolean) => {
        this.setState({
            isShowModal: show
        })
    }

    render() {
        let {calendarData, activeDate, isShowModal } = this.state;
        return <div className='container'>

            {calendarData && calendarData.teams && <AddVacationModal addVacations={this.addVacation} teams={calendarData?.teams} isShow={this.state.isShowModal} onCancel={() => this.toggleShowModal(false)} />}
            {calendarData===null &&  <Loading text="Loading..."/>}
            {calendarData!==null &&
                <>
                    <Navigation date={activeDate} next={this.nextMonth} prev={this.prevMonth}/>
                    <Calendar onAddVacation={() => this.toggleShowModal(true)} calendar={calendarData} activePeriod={activeDate} days={this.getDaysOfActivePeriod()}/>
                </>
            }
        </div>
    }
}