import React from "react";
import ModalWindow from "../ModalWindow/ModalWindow";
import {IModalWindowProps} from "../ModalWindow/ModalWindow";
import {validDateString, getDateFromString} from "../../utils";
import Styles from './styles.module.scss';
import {ITeam} from "../../types";
import Button from "../Button/Button";

export interface AddVacationModalProps extends IModalWindowProps{
    teams: ITeam[],
    addVacations: (team: number, member: number, dateFrom: Date, dateTo: Date) => void
}

export default function AddVacationModal(props:AddVacationModalProps) {

    const [errors, setErrors] = React.useState<string[]>([])
    const [dateFrom, setDateFrom] = React.useState<string>('')
    const [dateTo, setDateTo] = React.useState<string>('')
    const [hasAdded, setHasAdded] = React.useState<boolean>(false)
    const [selectedTeam, setSelectedTeam] = React.useState<string>('0')
    const [selectedMember, setSelectedMember] = React.useState<string>('0')

    const countDaysBetweenDates = React.useMemo<number | boolean>(() => {
        if (!validDateString(new Date(), dateFrom) || !validDateString(new Date(), dateTo)) {
            return false
        }
        const dateFromDate = getDateFromString(dateFrom)
        const dateToDate = getDateFromString(dateTo)
        if (dateFromDate>=dateToDate) {
            return false
        }
        return Math.round((dateToDate.getTime()-dateFromDate.getTime())/(1000*60*60*24));
    }, [dateFrom, dateTo])

    React.useEffect(() => {
        setSelectedTeam('0')
        setSelectedMember('0')
        setDateTo('')
        setDateFrom('')
        setHasAdded(false)
    }, [props.isShow])


    const sendForm = React.useCallback(() => {
        setErrors([])
        let errorsForm = []
        const validStartDate = validDateString(new Date(), dateFrom)
        const validEndDate = validDateString(new Date(), dateTo)
        if (!validStartDate) {
            errorsForm.push('Invalid start date')
        }
        if (!validEndDate) {
            errorsForm.push('Invalid end date')
        }
        if (validEndDate && validStartDate) {
            if (getDateFromString(dateFrom) >= getDateFromString(dateTo)){
                errorsForm.push('End date must be greater than start date')
            }
        }
        if (selectedTeam===null) {
            errorsForm.push('Please, select team')
        }
        if (selectedMember===null && selectedTeam!==null) {
            errorsForm.push('Please, select member')
        }
        if (errorsForm.length) {
            setErrors(errorsForm)
        } else {
            props.addVacations(Number(selectedTeam), Number(selectedMember), getDateFromString(dateFrom), getDateFromString(dateTo))
            setHasAdded(true)
        }
    }, [dateFrom, dateTo, selectedTeam, selectedMember])

    return <ModalWindow {...props}><div className={Styles.addVacationModal}>
        <h3 className={Styles.addVacationModal__header}>
            <span>Vacation Request</span>
            {countDaysBetweenDates!==false && <span>{countDaysBetweenDates} Days</span>}
        </h3>
        <div className={Styles.addVacationModal__content}>
            {hasAdded && <div className={Styles.addVacationModal__added}>Added</div>}
            {errors.length ? <ul className={Styles.addVacationModal__errors}>
                {errors.map((item, index) => {
                    return <li key={index}>{item}</li>
                })}
            </ul> : null}
            <div className={Styles.addVacationModal__formGroup}>
                <p className={Styles.addVacationModal__formGroupHeader}>Dates</p>
                <div className={Styles.addVacationModal__inputs}>
                    <label>
                        <span>From</span>
                        <input placeholder={'DD.MM.YYYY'} type="text" value={dateFrom} onChange={e => setDateFrom(e.target.value)}/>
                    </label>
                    <label>
                        <span>To</span>
                        <input placeholder={'DD.MM.YYYY'} type="text" value={dateTo} onChange={e => setDateTo(e.target.value)}/>
                    </label>
                </div>
            </div>
            <div className={Styles.addVacationModal__formGroup}>
                <p className={Styles.addVacationModal__formGroupHeader}>Teams</p>
                <select  className={Styles.addVacationModal__select} onChange={e => {
                    setSelectedTeam(e.target.value)
                }
                } value={selectedTeam}>
                    <option disabled>Team</option>
                    {props.teams.map((team, index) => {
                        return <option key={index} value={index}>{team.name}</option>
                    })}

                </select>
            </div>
            {selectedTeam!==null && <div className={Styles.addVacationModal__formGroup}>
                <p className={Styles.addVacationModal__formGroupHeader}>Members</p>
                <select className={Styles.addVacationModal__select} onChange={e => {
                    setSelectedMember(e.target.value)
                }
                } value={selectedMember}>
                    <option disabled>Members</option>
                    {props.teams[Number(selectedTeam)].members.map((member, index) => {
                        return <option key={index} value={index}>{member.name}</option>

                    })}

                </select>
            </div>}
            <Button onClick={sendForm} type={'default'} text={'Send'}/>
        </div>
    </div></ModalWindow>
}