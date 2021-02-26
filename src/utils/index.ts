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

export function getCountDaysOfMonth(year: number, month: number): number {
    const date = new Date(year, month - 1, 1)
    let days = 0
    while (date.getMonth() === month - 1) {
        days++
        date.setDate(date.getDate() + 1)
    }
    return days
}

export function validDateString(
    currentDate: Date,
    date: string,
): boolean {
    if (date.match(/^\d\d\.[0-9][1-9]\.\d\d\d\d$/) === null) {
        return false
    }

    const year = Number(date.substr(6, 4))
    const month = Number(date.substr(3, 2))
    const day = Number(date.substr(0,2))
    if (
        year > currentDate.getFullYear() ||
        year < currentDate.getFullYear() - 100
    ) {
        return false
    }

    if (month > 12 || month < 1) {
        return false
    }
    if (day < 1 || day > getCountDaysOfMonth(year, month)) {
        return false
    }
    return new Date(year, month - 1, day) <= new Date()
}

export function getDateFromString(dateString: string): Date {
    const year = Number(dateString.substr(6, 4))
    const month = Number(dateString.substr(3, 2))
    const day = Number(dateString.substr(0,2))
    return new Date(year, month - 1, day)
}