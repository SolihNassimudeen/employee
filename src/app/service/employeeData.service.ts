import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Employee } from '../shared/employeeData.interface';

@Injectable({
    providedIn: 'root'
})
export class ServiceService {

    public employeeData: Employee[] = [
        {
            "imgurl": "/assets/employeeProfile/default.png",
            "name": "solih",
            "position": "web developer",
            "tag": "developer",
            "management": "management",
            "emp_code": 1,
            "joiningdate": "01/02/2024",
            "email": "shijdf@gmail.com"
        },
        {
            "imgurl": "/assets/employeeProfile/default.png",
            "name": "john",
            "position": "software engineer",
            "tag": "developer",
            "management": "management",
            "emp_code": 2,
            "joiningdate": "05/03/2023",
            "email": "john@gmail.com"
        },
        {
            "imgurl": "/assets/employeeProfile/default.png",
            "name": "emma",
            "position": "data analyst",
            "tag": "developer",
            "management": "management",
            "emp_code": 3,
            "joiningdate": "12/10/2022",
            "email": "emma@gmail.com"
        },
        {
            "imgurl": "/assets/employeeProfile/default.png",
            "name": "alex",
            "position": "frontend developer",
            "tag": "developer",
            "management": "management",
            "emp_code": 4,
            "joiningdate": "09/05/2021",
            "email": "alex@gmail.com"
        },
        {
            "imgurl": "/assets/employeeProfile/default.png",
            "name": "sara",
            "position": "UI/UX designer",
            "tag": "developer",
            "management": "management",
            "emp_code": 5,
            "joiningdate": "03/07/2020",
            "email": "sara@gmail.com"
        },
        {
            "imgurl": "/assets/employeeProfile/default.png",
            "name": "michael",
            "position": "backend developer",
            "tag": "developer",
            "management": "management",
            "emp_code": 6,
            "joiningdate": "11/11/2019",
            "email": "michael@gmail.com"
        },
        {
            "imgurl": "/assets/employeeProfile/default.png",
            "name": "olivia",
            "position": "project manager",
            "tag": "developer",
            "management": "management",
            "emp_code": 7,
            "joiningdate": "08/04/2018",
            "email": "olivia@gmail.com"
        },
        {
            "imgurl": "/assets/employeeProfile/default.png",
            "name": "william",
            "position": "quality assurance",
            "tag": "developer",
            "management": "management",
            "emp_code": 8,
            "joiningdate": "02/12/2017",
            "email": "william@gmail.com"
        },
        {
            "imgurl": "/assets/employeeProfile/default.png",
            "name": "emily",
            "position": "systems analyst",
            "tag": "developer",
            "management": "management",
            "emp_code": 9,
            "joiningdate": "06/06/2016",
            "email": "emily@gmail.com"
        },
        {
            "imgurl": "/assets/employeeProfile/default.png",
            "name": "daniel",
            "position": "network administrator",
            "tag": "developer",
            "management": "management",
            "emp_code": 10,
            "joiningdate": "10/09/2015",
            "email": "daniel@gmail.com"
        },
        {
            "imgurl": "/assets/employeeProfile/default.png",
            "name": "ava",
            "position": "database administrator",
            "tag": "developer",
            "management": "management",
            "emp_code": 11,
            "joiningdate": "07/03/2014",
            "email": "ava@gmail.com"
        },
        {
            "imgurl": "/assets/employeeProfile/default.png",
            "name": "james",
            "position": "business analyst",
            "tag": "developer",
            "management": "management",
            "emp_code": 12,
            "joiningdate": "04/08/2013",
            "email": "james@gmail.com"
        },
        {
            "imgurl": "/assets/employeeProfile/default.png",
            "name": "mia",
            "position": "software tester",
            "tag": "developer",
            "management": "management",
            "emp_code": 13,
            "joiningdate": "01/01/2012",
            "email": "mia@gmail.com"
        },
        {
            "imgurl": "/assets/employeeProfile/default.png",
            "name": "ethan",
            "position": "IT support specialist",
            "tag": "developer",
            "management": "management",
            "emp_code": 14,
            "joiningdate": "09/11/2011",
            "email": "ethan@gmail.com"
        },
        {
            "imgurl": "/assets/employeeProfile/default.png",
            "name": "ava",
            "position": "business intelligence analyst",
            "tag": "developer",
            "management": "management",
            "emp_code": 15,
            "joiningdate": "05/05/2010",
            "email": "ava@gmail.com"
        },
        {
            "imgurl": "/assets/employeeProfile/default.png",
            "name": "mason",
            "position": "software developer",
            "tag": "developer",
            "management": "management",
            "emp_code": 16,
            "joiningdate": "03/02/2009",
            "email": "mason@gmail.com"
        },
        {
            "imgurl": "/assets/employeeProfile/default.png",
            "name": "harper",
            "position": "technical support engineer",
            "tag": "developer",
            "management": "management",
            "emp_code": 17,
            "joiningdate": "07/09/2008",
            "email": "harper@gmail.com"
        },
        {
            "imgurl": "/assets/employeeProfile/default.png",
            "name": "logan",
            "position": "data scientist",
            "tag": "developer",
            "management": "management",
            "emp_code": 18,
            "joiningdate": "12/12/2007",
            "email": "logan@gmail.com"
        },
        {
            "imgurl": "/assets/employeeProfile/default.png",
            "name": "amelia",
            "position": "IT consultant",
            "tag": "developer",
            "management": "management",
            "emp_code": 19,
            "joiningdate": "08/06/2006",
            "email": "amelia@gmail.com"
        },
        {
            "imgurl": "/assets/employeeProfile/default.png",
            "name": "lucas",
            "position": "software engineer",
            "tag": "developer",
            "management": "management",
            "emp_code": 20,
            "joiningdate": "02/01/2005",
            "email": "lucas@gmail.com"
        }
    ]

    constructor() { }

    getEmployeedata(): Observable<any[]> {
        return of(this.employeeData);
    }
    empCodeValidation(IdCode: any) {
        return this.employeeData.filter((data) => data.emp_code === IdCode)
    }
    deleteEmployee(emp_code: any) {
        const index = this.employeeData.findIndex(obj => obj.emp_code === emp_code);
        this.employeeData.splice(index, 1)
    }
    getCountOfEmployees() {
        return this.employeeData.length
    }
    getDataForUpdation(emp_code: any) {
        return this.employeeData.find(data => data.emp_code === emp_code)
    }
    searchAnEmployee(name: string) {
        return this.employeeData.filter((data) => data.name.includes(name))
    }
}
