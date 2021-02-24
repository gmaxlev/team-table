import React from 'react';
import {fetchCalendar} from "../../API";
import {ICalendar, IPeriodDay} from "../../types";
import Loading from '../Loading/Loading'
import Navigation from "../Navigation/Navigation";
import Calendar from "../Calendar/Calendar";
import ModalWindow from '../ModalWindow/ModalWindow';
import {dateInKebabCase} from '../../utils/index'

interface IState {
    activeDate: Date,
    calendarData: ICalendar | null,
    modal: {
        isShowModal: boolean
        startDate: string,
        endDate: string
    }
}

export default class App extends React.Component<{}, IState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            activeDate: new Date(),
            calendarData: null,
            modal: {
                isShowModal: false,
                startDate: dateInKebabCase(new Date()),
                endDate: dateInKebabCase(new Date())
            }
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
    showModalWindow = () => {
        this.setState({
            modal:{...this.state.modal, isShowModal: true }
        })
    }

    hideModalWindow = () => {
        this.setState({
            modal:{...this.state.modal, isShowModal: false}
        })
    }

    changeDate = (event: React.ChangeEvent<HTMLInputElement>) => {
        let value = event.target.value;
        let copyModal = Object.assign({}, this.state.modal);

        if(Date.parse(value) < Date.parse(this.state.modal.startDate)) {
            console.log("!@#");
        }
        this.setState({
            modal: {...copyModal, [event.target.name]: value}
        })
    }

    render() {
        let {calendarData, activeDate, modal: {startDate, endDate, isShowModal}} = this.state;
        return <div className='container'>
            {calendarData===null &&  <Loading text="Loading..."/>}
            {isShowModal && <ModalWindow onChangeInput={this.changeDate} startDate={startDate} endDate={endDate} onCancel={this.hideModalWindow} onSend={() =>{}} />}
            {calendarData!==null &&
                <>
                    <Navigation date={activeDate} next={this.nextMonth} prev={this.prevMonth}/>
                    <Calendar onClick={this.showModalWindow} calendar={calendarData} activePeriod={activeDate} days={this.getDaysOfActivePeriod()}/>
                </>
            }
        </div>
    }
}