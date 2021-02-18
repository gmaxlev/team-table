import React from 'react';
import {fetchCalendar} from "../../API";
import {ICalendar, IPeriodDay} from "../../types";
import Loading from '../Loading/Loading'
import Navigation from "../Navigation/Navigation";
import Calendar from "../Calendar/Calendar";

interface IState {
    activeDate: Date,
    calendarData: ICalendar | null
}

export default class App extends React.Component<{}, IState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            activeDate: new Date(),
            calendarData: null
        }
        this.nextMonth = this.nextMonth.bind(this)
        this.prevMonth = this.prevMonth.bind(this)
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

    render() {
        return <div className='container'>
            {this.state.calendarData===null &&  <Loading text="Loading..."/>}
            {this.state.calendarData!==null &&
                <>
                    <Navigation date={this.state.activeDate} next={this.nextMonth} prev={this.prevMonth}/>
                    <Calendar calendar={this.state.calendarData} activePeriod={this.state.activeDate} days={this.getDaysOfActivePeriod()}/>
                </>
            }
        </div>
    }
}