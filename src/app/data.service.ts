import { ArrayBar } from './interfaces';
import { Injectable } from '@angular/core';
import { merge, Observable, of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  array: ArrayBar[] = [];
  algo: number;
  Red = '#ffcd82';
  Green = '#62bb57';
  Blue = '#3c79ac';
  isDone = false;
  constructor() {
    this.resetArray();
    this.algo = 1;
  }

  resetArray(): void {
    this.array = [];

    for (let i = 0; i < 100; i++) {
      let temp: ArrayBar = {
        value: (Math.floor(Math.random() * (500 - 4) + 5)),
        color: this.Blue
      };
      this.array.push(temp);
    }
  }

  setArray(array) {
    this.array = array;
  }
  getArray(): Observable<ArrayBar[]> {
    return of(this.array);
  }

  getAlgo() {
    return this.algo;
  }

  setAlgo(algo: number) {
    this.algo = algo;
  }
  async changeBarColor(array: ArrayBar[], index: number, color: string) {
    await sleep(25);
    array[index].color = color;
  }

  // sorting algorithms and helpers below
  async insertionSort() {
    let i = 1;
    while (i < this.array.length) {
      let j = i;
      while (j > 0 && this.array[j - 1].value > this.array[j].value) {
        await this.swapBar(this.array, j - 1, j);
        j--;
      }
      i++;
    }
    for (let i = 0; i < this.array.length; i++) {
      await this.changeBarColor(this.array, i, this.Green);
    }
  }

  async swapBar(array: ArrayBar[], i, j) {
    let temp = array[j];
    let temp2 = array[i];
    array.splice(i, 1);
    array.splice(i, 0, temp);
    array.splice(j, 1);
    array.splice(j, 0, temp2);
    await sleep(10);
    this.changeBarColor(this.array, i, this.Red);
    this.changeBarColor(this.array, j, this.Red);
  }

  mergeSort() {
    this.mergeSortHelper(0, this.array.length - 1);
  }

  async mergeSortHelper(l, r) {
    if (l < r) {
      let mid = l + Math.floor((r - l) / 2);
      console.log(mid);
      await this.mergeSortHelper(l, mid);
      await this.mergeSortHelper(mid + 1, r);
      await this.merge(l, mid, r);

    }
  }

  async merge(start, mid, end) {
    let tempStart = start;
    let tempEnd = end;
    let start2 = mid + 1;
    console.log(mid);
    if (this.array[mid].value <= this.array[start2].value) {
      return;
    }
    while (start <= mid && start2 <= end) {
      console.log('stuck outer');
      if (this.array[start].value <= this.array[start2].value) {
        start++;
      }
      else {
        let value = this.array[start2].value;
        let index = start2;

        while (index > start) {
          console.log("stuck inner");
          this.array[index].value = this.array[index - 1].value;
          this.changeBarColor(this.array, index, this.Red);
          index--;
        }
        this.array[start].value = value;
        this.changeBarColor(this.array, start, this.Red);
        start++;
        mid++;
        start2++;
        await sleep(30);
      }
    }
    for (let i = tempStart; i <= tempEnd; i++) {
      this.changeBarColor(this.array, i, this.Blue);
    }
  }
}

export function sleep(ms: number) {
  return new Promise(res => { setTimeout(() => res(), ms) });
}
