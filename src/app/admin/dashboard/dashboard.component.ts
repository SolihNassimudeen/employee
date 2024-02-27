import { AfterContentInit, AfterViewChecked, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Chart, registerables, TooltipItem } from 'node_modules/chart.js';
import { ServiceService } from 'src/app/service/employeeData.service';

Chart.register(...registerables);

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy, AfterContentInit {

    doughnutChart: any;
    completedProjectCount = 0;
    onProcessProjectCount = 0;
    pendingProjectCount = 0;
    projectlist: any[] = [];
    projectName: string = '';
    pendingProjectList: any[] = [];
    editedIndex: number | null = null;
    editedSlno: number | null = null;
    deleteItemSlno = -1;

    constructor(public serviceData: ServiceService, private route: Router) { }

    ngOnInit(): void {
        this.getProjectList();
        this.assignProjectCount();
        this.pendingProjects();
    }

    ngOnDestroy(): void {
        this.doughnutChart.destroy();
    }

    ngAfterContentInit(): void {
        this.semiCirclechart(this.completedProjectCount, this.onProcessProjectCount, this.pendingProjectCount);
    }

    pendingProjects() {
        this.serviceData.pendingProject().subscribe((data) => {
            if (data) {
                this.pendingProjectList = data;
            }
        })
    }

    assignProjectCount() {
        this.completeProjectCount();
        this.progressProjectCount();
        this.pendingProjectCounts();
    }

    completeProjectCount() {
        this.serviceData.completedProjectCount().subscribe((count) => {
            this.completedProjectCount = count;
            this.doughnutChart.destroy();
            this.semiCirclechart(this.completedProjectCount, this.onProcessProjectCount, this.pendingProjectCount);
        })
    }

    progressProjectCount() {
        this.serviceData.onProcessProjectCount().subscribe((count) => {
            this.onProcessProjectCount = count;
            this.doughnutChart.destroy();
            this.semiCirclechart(this.completedProjectCount, this.onProcessProjectCount, this.pendingProjectCount);
        })
    }

    pendingProjectCounts() {
        this.serviceData.pendingProjectCount().subscribe((count) => {
            this.pendingProjectCount = count;
            this.doughnutChart.destroy();
            this.semiCirclechart(this.completedProjectCount, this.onProcessProjectCount, this.pendingProjectCount);
        })
    }

    getProjectList() {
        this.serviceData.getAllprojectList().subscribe((data) => {
            this.projectlist = data;
        })
    }

    addNewProject() {
        if (this.projectName.trim()) {
            this.serviceData.addProject(this.projectName).subscribe(() => {
                this.assignProjectCount();
                this.getProjectList();
                this.doughnutChart.destroy();
                this.semiCirclechart(this.completedProjectCount, this.onProcessProjectCount, this.pendingProjectCount)
                this.pendingProjects()
            })
        }
    }

    totalProjectEdit(editIndex: number, slno: number) {
        this.editedIndex = editIndex;
        this.editedSlno = slno;
    }

    submitEdit() {
        if (this.editedIndex != null) {
            const editedData = this.projectlist[this.editedIndex];
            this.serviceData.editProjectList(editedData, this.editedSlno).subscribe(() => {
                this.editedIndex = null;
                this.editedSlno = null;
                this.assignProjectCount();
                this.doughnutChart.destroy();
                this.semiCirclechart(this.completedProjectCount, this.onProcessProjectCount, this.pendingProjectCount);
                this.pendingProjects();
            })
        }
    }

    deleteTotalProjectItem(deleteItemSlno: number) {
        this.deleteItemSlno = deleteItemSlno;
    }

    afterDeleteGranted() {
        if (this.deleteItemSlno > -1) {
            this.serviceData.deletitemfromProjectlist(this.deleteItemSlno).subscribe(() => {
                this.assignProjectCount();
                this.getProjectList();
                this.doughnutChart.destroy();
                this.semiCirclechart(this.completedProjectCount, this.onProcessProjectCount, this.pendingProjectCount)
                this.pendingProjects()
            })
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