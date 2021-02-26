export interface ICalendar {
    id: number,
    teams: ITeam[]
}

export interface ITeam {
    name: string,
    percentageOfAbsent: [number,number,number,number,number,number,number,number,number,number,number,number],
    members: ITeamMember[]
    id: number
}

export interface ITeamMember {
    name: string,
    vacations: IVacation[]
}

export interface IVacation {
    endDate: string,
    startDate: string,
    type: string
}

export interface IPeriodDay {
    isDayOff: boolean,
    date: Date
}
