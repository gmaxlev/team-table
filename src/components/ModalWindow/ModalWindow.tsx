import React, { ChangeEvent } from "react";
import Styles from './styles.module.scss';

interface  IModalWindow{
    onSend?:() => void,
    onCancel?:() =>void,
    startDate: string,
    endDate: string,
    onChangeInput: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export default function ModalWindow({onSend, onCancel, startDate, endDate, onChangeInput}: IModalWindow) {

    return <>
        <span className={Styles.backgroundModal}>1</span>
        <div className={Styles.modalWindow}>
            <header className={Styles.modalWindow__header}>
                <h3>Vacation Request</h3>
                <span>8 Days</span>
            </header>
            <div className={Styles.modalWindow__body}>
                <div className={Styles.choose}>
                    <span className={Styles.headText}>Dates</span>
                    <input onChange={onChangeInput} name="startDate" value={startDate} type="date"/>
                    <input onChange={onChangeInput} name="endDate" value={endDate} type="date"/>
                </div>
                <div className={Styles.choose}>
                    <span className={Styles.headText}>Team</span>
                    <select name="Team" id="">
                        <option value="">Team name</option>
                    </select>
                </div>
                <div className={Styles.choose}>
                    <span className={Styles.headText}>User</span>
                    <select name="User" id="">
                        <option value="">User name</option>
                    </select>
                </div>
                <div className={Styles.choose}>
                    <span className={Styles.headText}>Vac Type</span>
                    <select name="Vac" id="">
                        <option value="">Paid Day Off (PD)</option>
                    </select>
                </div>
                <hr/>
                <div className={Styles.buttonsBlock}>
                    <button onClick={onCancel} className={Styles.buttonsBlock__Cancel}>Cancel</button>
                    <button className={Styles.buttonsBlock__Send}>Send</button>
                </div>
            </div>
        </div>
    </>
}