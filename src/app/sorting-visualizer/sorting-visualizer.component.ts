import { ArrayBar } from './../interfaces';
import { DataService } from './../data.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

@Component({
  selector: 'app-sorting-visualizer',
  templateUrl: './sorting-visualizer.component.html',
  styleUrls: ['./sorting-visualizer.component.scss'],
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({ opacity: 0 }),
        animate('1000ms', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class SortingVisualizerComponent implements OnInit {
  array$: Observable<ArrayBar[]>;
  array: ArrayBar[];
  Red = '#b95252';
  Green = '#62bb57';
  Blue = '#3c79ac';
  isSorting = false;
  constructor(public dataService: DataService) {
  }

  ngOnInit(): void {
  }

  renderArray() {
    this.array = this.dataService.array;
  }
  resetArray() {
    this.isSorting = false;
    this.dataService.resetArray();
  }

  async sort() {
    this.isSorting = true;
    switch (this.dataService.getAlgo()) {
      case 1: {
        await this.dataService.mergeSort();
        break;
      }
      case 2: {
        await this.dataService.quickSortHelper();
        break;
      }
      case 3: {
        await this.dataService.radixSort();
        break;
      }
      case 4: {
        await this.dataService.insertionSort();
        break;
      }
      default: {
        await this.dataService.mergeSort();
      }
    }
    this.isSorting = false;

  }

}
