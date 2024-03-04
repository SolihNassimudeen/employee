import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterContentInit, Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { ChartEvent } from 'chart.js/dist/core/core.plugins';
import { ActiveElement } from 'chart.js/dist/plugins/plugin.tooltip';
import { Chart, registerables, TooltipItem } from 'node_modules/chart.js';
import { ServiceService } from 'src/app/service/employeeData.service';

Chart.register(...registerables);

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    animations: [
        trigger('fadeInOut', [
            state('void', style({ opacity: 0 })),
            transition(':enter, :leave', [
                animate(3000)
            ]),
        ]),
    ]
})

export class DashboardComponent implements OnInit, OnDestroy, AfterContentInit {

    isShowAlert = false;
    doughnutChart: any;
    completedProjectCount = 0;
    onProcessProjectCount = 0;
    pendingProjectCount = 0;
    projectlist: any[] = [];
    projectName: string = '';
    selectedProjectList: any[] = [];
    editedIndex: number | null = null;
    editedSlno: number | null = null;
    deleteItemSlno = -1;
    projectErrMsg: string = '';
    listedTable: string = 'Pending';
    isFilter = false;

    constructor(public serviceData: ServiceService) { }

    ngOnInit(): void {
        this.getProjectList();
        this.assignProjectCount();
        this.pendingProjects();
        this.projectErrMsg = '';
    }

    ngAfterContentInit(): void {
        this.semiCirclechart(this.completedProjectCount, this.onProcessProjectCount, this.pendingProjectCount);
    }

    showAlertMessage() {
        this.isShowAlert = true;
        setTimeout(() => {
            this.isShowAlert = false;
        }, 3000);
    }

    pendingProjects() {
        this.listedTable = 'Pending';
        this.serviceData.pendingProject().subscribe((data) => {
            if (data) {
                this.selectedProjectList = data;
            }
        })
    }

    completedProjects() {
        this.listedTable = 'Completed';
        this.serviceData.completedProject().subscribe((data) => {
            if (data) {
                this.selectedProjectList = data;
            }
        })
    }

    progressProjects() {
        this.listedTable = 'Progress';
        this.serviceData.progressProject().subscribe((data) => {
            if (data) {
                this.selectedProjectList = data;
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
                this.pendingProjects();
                this.showAlertMessage();
                this.projectName = '';
            })
        } else {
            this.projectErrMsg = 'Enter a project Names';
            setTimeout(() => {
                this.projectErrMsg = '';
            }, 2000);

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
                this.showAlertMessage();
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
                this.pendingProjects();
                this.showAlertMessage();
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
                onClick: (event: ChartEvent, elements: ActiveElement[], chart: Chart) => this.chartItemClicked(event, chart),
                aspectRatio: 2,
            }
        });
    }

    chartItemClicked(event: any, chart: Chart) {
        const activePoints = chart.getElementsAtEventForMode(event, 'nearest', { intersect: true }, true);
        if (activePoints && activePoints.length > 0) {
            const CLICKED_INDEX = activePoints[0]?.index;
            switch (CLICKED_INDEX) {
                case 0: this.completedProjects();
                    break;
                case 1: this.progressProjects();
                    break;
                case 2: this.pendingProjects();
                    break;
                default:
                    break;
            }
        }
    }

    filterOn() {
        this.isFilter = !this.isFilter
        if (this.isFilter) {
            this.projectlist.sort((a, b) => a.projectname.localeCompare(b.projectname));
        } else {
            this.getProjectList();
        }
    }

    ngOnDestroy(): void {
        this.doughnutChart.destroy();
    }
}