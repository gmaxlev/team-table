import React, { useRef, FunctionComponent } from "react";
import Styles from './styles.module.scss';
import {classNames} from "../../utils";

export interface IModalWindowProps{
    onCancel: () =>void,
    isShow: boolean
}

const ModalWindow:FunctionComponent<IModalWindowProps> = ({onCancel, isShow, children}) =>{

    const modalContainerRef = useRef<HTMLInputElement>(null);
    const [isAnimationClose, setIsAnimationClose] = React.useState(false);
    const closeModalWindow = React.useCallback(() => {
        setIsAnimationClose(true)
        setTimeout(() => {
            setIsAnimationClose(false)
            onCancel();
        }, 500)
    }, [])
    const clickOnOutside = React.useCallback((event: React.MouseEvent) => {
        if (event.target === modalContainerRef.current) {
            closeModalWindow()
        }
    }, [])

    if (!isShow) {
        return null
    }
    return <>
        <div className={classNames({
            [Styles.modalWindow]: true,
            [Styles.modalWindow_animationClose]:isAnimationClose
        })} ref={modalContainerRef} onClick={clickOnOutside}>
            <div className={Styles.modalWindow__content}>
                {children}
            </div>
        </div>
    </>
}

export default ModalWindow