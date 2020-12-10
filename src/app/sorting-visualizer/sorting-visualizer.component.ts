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
  constructor(public dataService: DataService) {
  }

  ngOnInit(): void {
  }

  renderArray() {
    this.array = this.dataService.array;
  }
  resetArray() {
    this.dataService.resetArray();
  }

  sort() {
    switch (this.dataService.getAlgo()) {
      case 1: {
        this.dataService.mergeSort();
        break;
      }
      case 2: {
        this.dataService.quickSort(0, this.dataService.array.length - 1);
        break;
      }
      case 3: {
        this.dataService.radixSort();
        break;
      }
      case 4: {
        this.dataService.insertionSort();
        break;
      }
      default: {
        this.dataService.mergeSort();
      }
    }

  }


  quickSort(array: ArrayBar[]) {

  }
  selectionSort(array: ArrayBar[]) {

  }


}
