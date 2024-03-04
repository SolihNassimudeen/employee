import { Injectable } from '@angular/core';
import { Observable, catchError, of, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

declare var gapi: any;

@Injectable({
    providedIn: 'root'
})
export class ServiceService {

    public adminList: any[] = [
        { name: 'solih', position: 'Employee', username: 'solih', password: 1234 },
        { name: 'admin 1', position: 'Employee', username: 'user1', password: 1234 },
        { name: 'admin 2', position: 'Employee', username: 'user2', password: 1234 },
        { name: 'admin 3', position: 'Employee', username: 'user3', password: 1234 },
        { name: 'admin 4', position: 'Manager', username: 'user4', password: 1234 },
    ]

    constructor(private http: HttpClient) { }
    // dashboard
    getAllprojectList(): Observable<any> {
        return this.http.get('/project/projects')
    }
    addProject(projectName: any): Observable<any> {
        const NEW_OBJECT = { projectname: projectName, status: 'pending' }
        return this.http.post('/project/addProject', NEW_OBJECT)
    }
    completedProjectCount(): Observable<any> {
        return this.http.get('/project/completeCount')
    }
    onProcessProjectCount(): Observable<any> {
        return this.http.get('/project/progressCount')
    }
    pendingProjectCount(): Observable<any> {
        return this.http.get('/project/pendingCount')
    }
    pendingProject(): Observable<any> {
        return this.http.get('/project/pendingProject')
    }
    completedProject(): Observable<any> {
        return this.http.get('/project/completeProject')
    }
    progressProject(): Observable<any> {
        return this.http.get('/project/progressProject')
    }
    deletitemfromProjectlist(deleteslno: number): Observable<any> {
        return this.http.delete(`/project/deleteItem/${deleteslno}`)
    }
    editProjectList(data: any, editIndex: any): Observable<any> {
        return this.http.put(`/project/updateProject/${editIndex}`, data);
    }

    // employee
    getEmployeedata(): Observable<any> {
        return this.http.get('employee/employees')
    }
    empCodeValidation(IdCode: any): Observable<any> {
        return this.http.get(`employee/empCode/${IdCode}`);
    }
    deleteEmployee(empCode: number): Observable<any> {
        return this.http.delete(`employee/employeeDelete/${empCode}`)
    }
    addEmployeedata(data: any): Observable<any> {
        return this.http.post(`employee/addEmployee`, data)
    }
    getDataForUpdation(emp_code: any): Observable<any> {
        return this.http.get(`employee/empCode/${emp_code}`);
    }
    setupdateEmployeedata(emp_code: number, data: any): Observable<any> {
        return this.http.put(`/employee/updateEmployee/${emp_code}`, data)
    }
    searchAnEmployee(searchTerm: string): Observable<any> {
        return this.http.get<any>('/employee/searchName', { params: { searchTerm } })
    }

    // admin
    loginConformation(username: string, password: string): Observable<any> {
        const LOGINDATA: any = {
            username: username,
            password: password
        }
        return this.http.post('/adminpanel/login', LOGINDATA);
    }
    forgetPassword(verificationData: any): Observable<any> {
        return this.http.post('/adminpanel/verification', verificationData)
    }
    adminsCount(): Observable<any> {
        return this.http.get("/adminpanel/adminCount");
    }
    getAdminDetails(): Observable<any> {
        return this.http.get("/adminpanel/adminList");
    }
    adminDelete(slno: number): Observable<any> {
        return this.http.delete(`/adminpanel/deleteAdmin/${slno}`);
    }
    addAdmin(data: any): Observable<any> {
        return this.http.post('/adminpanel/addAdmin', data);
    }
    getAnAdmin(slno: number): Observable<any> {
        return this.http.get(`/adminpanel/adminData/${slno}`);
    }
    updateAnAdmin(slno: number, data: any): Observable<any> {
        return this.http.put(`/adminpanel/updateAdmin/${slno}`, data);
    }

    //leave management

    getHolidays(): Observable<any> {
        return this.http.get('https://www.googleapis.com/calendar/v3/calendars/en.indian%23holiday%40group.v.calendar.google.com/events?key=AIzaSyCJr-6IzjWAhQg0bhLvl3-L1kdJfqI34lI');
    }
}
