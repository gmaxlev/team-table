import {ICalendar} from "../types";

const departmentTeams: ICalendar = {
    id: 1,
    teams: [
        {
            name: "Frontend Team",
            percentageOfAbsent: [0, 2, 0, 0, 1, 22, 2, 2, 2, 2, 11, 1],
            id: 1,
            members: [
                {
                    name: "FE_Team_User1",
                    vacations: [
                        { startDate: "20.02.2021", endDate: "22.03.2021", type: "Paid" },
                        { startDate: "20.11.2020", endDate: "22.11.2020", type: "Paid" },
                    ],
                },
                {
                    name: "FE_Team_User2",
                    vacations: [
                        { startDate: "20.02.2020", endDate: "22.02.2020", type: "UnPaid" },
                        { startDate: "20.03.2020", endDate: "22.03.2020", type: "UnPaid" },
                    ],
                },
            ],
        },
        {
            name: "Backend Team",
            percentageOfAbsent: [0, 2, 0, 0, 1, 2, 2, 2, 2, 2, 1, 1],
            id: 2,
            members: [
                {
                    name: "FE_Team_User3",
                    vacations: [
                        { startDate: "15.02.2020", endDate: "22.02.2020", type: "UnPaid" },
                        { startDate: "20.03.2020", endDate: "22.03.2020", type: "UnPaid" },
                    ],
                },
                {
                    name: "FE_Team_User4",
                    vacations: [
                        { startDate: "20.02.2020", endDate: "22.02.2020", type: "UnPaid" },
                        { startDate: "20.03.2020", endDate: "22.03.2020", type: "UnPaid" },
                    ],
                },
            ],
        },
        {
            name: "C++ Team",
            percentageOfAbsent: [0, 2, 0, 0, 1, 2, 2, 2, 2, 2, 1, 1],
            id: 3,
            members: [
                {
                    name: "FE_Team_User5",
                    vacations: [
                        { startDate: "15.02.2020", endDate: "22.02.2020", type: "UnPaid" },
                        { startDate: "20.03.2020", endDate: "22.03.2020", type: "UnPaid" },
                    ],
                },
                {
                    name: "FE_Team_User6",
                    vacations: [
                        { startDate: "20.02.2020", endDate: "22.02.2020", type: "UnPaid" },
                        { startDate: "20.03.2020", endDate: "22.03.2020", type: "UnPaid" },
                    ],
                },
            ],
        },
        {
            name: "Java Team",
            percentageOfAbsent: [0, 2, 0, 0, 1, 2, 2, 2, 2, 2, 1, 1],
            id: 4,
            members: [
                {
                    name: "FE_Team_User7",
                    vacations: [
                        { startDate: "15.02.2020", endDate: "22.02.2020", type: "UnPaid" },
                        { startDate: "20.03.2020", endDate: "22.03.2020", type: "UnPaid" },
                    ],
                },
                {
                    name: "FE_Team_User8",
                    vacations: [
                        { startDate: "20.02.2020", endDate: "22.02.2020", type: "UnPaid" },
                        { startDate: "20.03.2020", endDate: "22.03.2020", type: "UnPaid" },
                    ],
                },
            ],
        },
    ],
};

export function fetchCalendar(): Promise<ICalendar> {
    return fetch("https://jsonplaceholder.typicode.com/posts/1", {
        method: "PUT",
        body: JSON.stringify(departmentTeams),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        },
    }).then((response) => response.json())
}