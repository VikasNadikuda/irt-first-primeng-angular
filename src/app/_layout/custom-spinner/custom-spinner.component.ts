import { Component, Input, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-custom-spinner',
  templateUrl: './custom-spinner.component.html',
  styleUrls: ['./custom-spinner.component.css']
})
export class CustomSpinnerComponent implements OnInit {
  @Input() fullscreen:boolean
  constructor(
    private spinner:NgxSpinnerService
  ) { }

  ngOnInit(): void {
    console.log(this.fullscreen)
    this.spinner.show('customSpinner')
  }

}
