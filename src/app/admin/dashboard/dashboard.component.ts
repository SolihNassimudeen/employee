import { AfterContentInit, Component, OnInit } from '@angular/core';
import { Chart, registerables, TooltipItem } from 'node_modules/chart.js';
import { ServiceService } from 'src/app/service/employeeData.service';
Chart.register(...registerables);

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterContentInit {

    doughnutChart: any;
    completedProjectCount: number = 0;
    onProcessProjectCount: number = 0;
    pendingProjectCount: number = 0;
    projectlist: any[] = [];
    projectName: string = '';
    pendingProjectArray: any[] = [];
    editedIndex: number | null = null;
    deleteItemIndex: number | null = null;

    constructor(public serviceData: ServiceService) { }

    ngOnInit(): void {
        this.assignProjectCount();
        this.getProjectList();
        this.pendingProjects();
    }
    ngAfterContentInit(): void {
        this.semiCirclechart(this.completedProjectCount, this.onProcessProjectCount, this.pendingProjectCount)
    }
    pendingProjects() {
        this.pendingProjectArray = this.serviceData.pendingProject()
    }
    assignProjectCount() {
        this.completedProjectCount = this.serviceData.completedProjectCount();
        this.onProcessProjectCount = this.serviceData.onProcessProjectCount();
        this.pendingProjectCount = this.serviceData.pendingProjectCount();
    }
    getProjectList() {
        this.projectlist = this.serviceData.projectList
    }
    addNewProject() {
        if (this.projectName.trim()) {
            const message = this.serviceData.addProject(this.projectName)
            alert(message)
            this.assignProjectCount();
            this.getProjectList();
            this.doughnutChart.destroy();
            this.semiCirclechart(this.completedProjectCount, this.onProcessProjectCount, this.pendingProjectCount)
            this.pendingProjects()
        }
    }
    totalProjectEdit(editIndex: number) {
        this.editedIndex = editIndex;
    }
    submitAfterEdit() {
        if (this.editedIndex != null) {
            const editedData = this.projectlist[this.editedIndex]
            this.editedIndex = this.serviceData.editProjectList(editedData, this.editedIndex)
            this.assignProjectCount();
            this.doughnutChart.destroy();
            this.semiCirclechart(this.completedProjectCount, this.onProcessProjectCount, this.pendingProjectCount)
            this.pendingProjects();
        }
    }
    deleteTotalProjectItem(deleteItemIndex: number) {
        this.deleteItemIndex = deleteItemIndex;
    }
    afterDeleteGranted() {
        if (this.deleteItemIndex !== null) {
            this.serviceData.deletitemfromProjectlist(this.deleteItemIndex)
            this.assignProjectCount();
            this.getProjectList();
            this.doughnutChart.destroy();
            this.semiCirclechart(this.completedProjectCount, this.onProcessProjectCount, this.pendingProjectCount)
            this.pendingProjects()
        }
    }

    semiCirclechart(completedCount: number, progressCount: number, pendingCount: number) {
        this.doughnutChart = new Chart('semiCircleDoughnut', {
            type: 'doughnut',
            data: {
                datasets: [{
                    label: 'Project Count',
                    data: [completedCount, progressCount, pendingCount],
                    backgroundColor: [
                        '#845ef7',
                        'rgba(153, 102, 255, 0.2)',
                        '#f03e3e'
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                cutout: '75%',
                rotation: 89 * Math.PI,
                circumference: 51.2 * Math.PI,
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function (tooltipItem: TooltipItem<'bar'>) {
                                return `Project Count: ${tooltipItem.formattedValue}`;
                            }
                        }
                    }
                },
                aspectRatio: 2,
            }
        });
    }
}