import { Component, Input } from '@angular/core';
import { CommonService } from 'src/app/service/common.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {
  // @Input() isLoading!: boolean;
  constructor(public commonsService: CommonService) {

  }
}
