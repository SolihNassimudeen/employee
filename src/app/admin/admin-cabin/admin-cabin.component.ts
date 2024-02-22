import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/service/employeeData.service';

@Component({
  selector: 'app-admin-cabin',
  templateUrl: './admin-cabin.component.html',
  styleUrls: ['./admin-cabin.component.scss']
})
export class AdminCabinComponent implements OnInit {

  adminCount: number = 0;
  adminDetailsArray: any[] = []

  constructor(private dataService: ServiceService) { }

  ngOnInit(): void {
    this.getAdminCount();
    this.dataService.getAdminDetails().subscribe(data => {
      this.adminDetailsArray = data;
    })
  }
  getAdminCount() {
    this.adminCount = this.dataService.adminsCount()
  }
}
