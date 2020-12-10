import { DataService } from './../data.service';
import { SortingVisualizerComponent } from './../sorting-visualizer/sorting-visualizer.component';
import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  animations: [
    trigger('fade', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-50px)' }),
        animate('1700ms ease-out')
      ])
    ])
  ]
})
export class NavbarComponent implements OnInit {

  constructor(public dataService: DataService) { }

  ngOnInit(): void {
  }
  resetArray() {
    this.dataService.resetArray();
  }
}
