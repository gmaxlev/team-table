import {IVacation} from "../types";

interface IClassNamesObject {
    [key: string]: boolean
}

type IClassNamesArray = string[]

type IClassNames = IClassNamesObject | IClassNamesArray

export function classNames(classes: IClassNames) {
    let classList = '';
    if (Array.isArray(classes)) {
        classList = classes.join(' ')
    } else {
        for (const [key, value] of Object.entries(classes)) {
            if (value) {
                classList += ' '+key
            }
        }
    }
    return classList
}
export function checkVacationsDate(vacations:IVacation[], date: Date) {
    let result = false;
    vacations.forEach((item) => {
        const startDateNumbers = item.startDate.split(".");
        const startDate = `${startDateNumbers[2]}/${startDateNumbers[1]}/${startDateNumbers[0]}`;
        const endDateNumbers = item.endDate.split(".");
        const endDate = `${endDateNumbers[2]}/${endDateNumbers[1]}/${endDateNumbers[0]}`;
        if (date >= new Date(startDate) && date <= new Date(endDate)) {
            result = true;
        }
    });
    return result;
}

export function dateInKebabCase(date: Date): string {
    return `${date.getFullYear()}-${(date.getMonth() + 1) < 9  ? `0${date.getMonth() + 1}` : date.getMonth() + 1}-${date.getDate()}`
}