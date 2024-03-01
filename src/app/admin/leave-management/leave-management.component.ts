import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ServiceService } from 'src/app/service/employeeData.service';

@Component({
  selector: 'app-leave-management',
  templateUrl: './leave-management.component.html',
  styleUrls: ['./leave-management.component.scss']
})
export class LeaveManagementComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  holidayList: any[] = [];
  pageSize: number = 15;
  pageIndex: number = 0;
  totalItems: number = 0;
  itemsPerPage = 15;
  paginatedItems: any[] = [];

  constructor(private dataService: ServiceService) { }

  ngOnInit(): void {
    this.getHolidays();
  }

  loadData(page: number): void {
    const startIndex = (page - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedItems = this.holidayList.slice(startIndex, endIndex);
  }

  handlePageEvent(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  getHolidays() {
    this.dataService.getHolidays().subscribe((data) => {
      this.holidayList = data.items;
      const itemDate = new Date().toISOString();
      this.holidayList = this.holidayList.filter((item: any) => {
        const itemStartDate = new Date(item.start.date).toISOString();
        return itemStartDate >= itemDate;
      });
      this.loadData(1);
      this.totalItems = this.holidayList.length;

    })
  }
}
