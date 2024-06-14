import { Component, Input, OnInit } from '@angular/core';
import * as FileSaver from 'file-saver';
import { ToastrService } from 'ngx-toastr';
import {Router} from '@angular/router'
import { NgxSpinnerService } from 'ngx-spinner';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import {StudyServiceService} from '../../../organization-module/services/study-service.service'

@Component({
  selector: 'app-transact-home',
  templateUrl: './transact-home.component.html',
  styleUrls: ['./transact-home.component.css']
})
export class TransactHomeComponent implements OnInit {
  @BlockUI('supTransact') loader: NgBlockUI;

  constructor(
    private toastr:ToastrService,
    private router:Router,
    private spinner:NgxSpinnerService,
    private studyService:StudyServiceService,

  ) { }

  ngOnInit(): void {
  }
  route(route){
    this.router.navigate(['supply/transactOrder/'+ route])
  }
}
