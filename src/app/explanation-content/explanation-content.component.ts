import { DataService } from './../data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-explanation-content',
  templateUrl: './explanation-content.component.html',
  styleUrls: ['./explanation-content.component.scss']
})
export class ExplanationContentComponent implements OnInit {

  constructor(public dataService: DataService) {
  }

  ngOnInit(): void {
  }



}
