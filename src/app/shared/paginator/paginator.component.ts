import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent {

  @Input() totalItems!: number;
  @Input() itemsPerPage!: number;
  @Output() pageChange = new EventEmitter<number>();

  currentPage = 1;
  firstButton = this.currentPage - 2;
  secondButton = this.currentPage - 1;
  activeButton = this.currentPage;
  fourthButton = this.currentPage + 1;
  fifthButton = this.currentPage + 2;

  constructor() { }

  goToFirstPage(): void {
    console.log('first page call');

    this.currentPage = 1;
    this.emitPageChanges();
  }

  goToLastPage(): void {
    console.log('last page call');

    this.currentPage = this.getTotalPages();
    this.emitPageChanges();
  }

  previousPage(): void {
    console.log('previous page call');
    if (this.currentPage > 1) {
      this.currentPage--;
      this.emitPageChanges();
    }
  }

  nextPage(): void {
    console.log('next page call');

    if (this.currentPage < this.getTotalPages()) {
      this.currentPage++;
      this.emitPageChanges();
    }
  }

  goToPage(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.emitPageChanges();
  }

  getPageNumbers(): number[] {
    const totalPages = this.getTotalPages();
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  getTotalPages(): number {
    const TOTAL_PAGE = Math.ceil(this.totalItems / this.itemsPerPage);
    console.log('totalItems' + this.totalItems + 'itemsPerPage' + this.itemsPerPage + 'total page' + TOTAL_PAGE);
    return TOTAL_PAGE;
  }

  emitPageChanges() {
    this.firstButton = this.currentPage - 2;
    this.secondButton = this.currentPage - 1;
    this.activeButton = this.currentPage;
    this.fourthButton = this.currentPage + 1;
    this.fifthButton = this.currentPage + 2;
    this.pageChange.emit(this.currentPage);
  }

}
