
import { ArrayBar } from './interfaces';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  array: ArrayBar[] = [];
  algo: number;
  Red = '#f8e9a1';
  Green = '#62bb57';
  Blue = '#374785';
  isDone = true;
  reset = false;
  constructor() {
    this.resetArray();
    this.algo = 1;
  }

  async resetArray(): Promise<void> {
    this.reset = true; // making algorithms stop if array is reset
    this.array = [];
    await sleep(150);
    this.reset = false;
    this.isDone = true;
    this.array = [];
    for (let i = 0; i < 150; i++) {
      const temp: ArrayBar = {
        value: (Math.floor(Math.random() * (500 - 4) + 5)),
        color: this.Blue
      };
      this.array.push(temp);
    }
  }

  setArray(array): void {
    this.array = array;
  }
  getArray(): Observable<ArrayBar[]> {
    return of(this.array);
  }

  getAlgo(): number {
    return this.algo;
  }

  setAlgo(algo: number): void {

    this.algo = algo;
    this.resetArray();
  }

  async changeBarColor(array: ArrayBar[], index: number, color: string): Promise<void> {
    if (this.reset) {
      return;
    }
    if (this.algo === 4) {
      await sleep(5);
    }
    array[index].color = color;
  }

  async swapBar(i, j): Promise<void> {
    if (this.reset) {
      return;
    }
    let temp = this.array[i];
    this.array[i] = this.array[j];
    this.array[j] = temp;
    await sleep(1);
  }


  // MERGE SORT /////////////////////////////////////////////////////////////////
  mergeSort(): void {
    if (this.isDone) {
      this.isDone = false;
      this.mergeSortHelper(0, this.array.length - 1);

    }
    else {
      return;
    }
    this.isDone = true;
  }

  async mergeSortHelper(l, r): Promise<void> {
    if (this.reset) {
      return;
    }
    if (l < r) {
      const mid = l + Math.floor((r - l) / 2);
      await this.mergeSortHelper(l, mid);
      if (this.reset) {
        return;
      }
      await this.mergeSortHelper(mid + 1, r);
      if (this.reset) {
        return;
      }
      await this.merge(l, mid, r);

    }
  }

  async merge(start, mid, end): Promise<void> {
    if (this.reset) {
      return;
    }
    const tempStart = start;
    const tempEnd = end;
    let start2 = mid + 1;
    if (this.array[mid].value <= this.array[start2].value) {
      return;
    }

    while (start <= mid && start2 <= end) {
      if (this.reset) {
        return;
      }
      if (this.array[start].value <= this.array[start2].value) {
        start++;
      }
      else {
        const value = this.array[start2].value;
        let index = start2;

        while (index > start) {
          this.array[index].value = this.array[index - 1].value;
          this.changeBarColor(this.array, index, this.Red);
          index--;
        }
        this.array[start].value = value;
        this.changeBarColor(this.array, start, this.Red);
        start++;
        mid++;
        start2++;
        await sleep(10);
      }
    }
    for (let i = tempStart; i <= tempEnd; i++) {
      await sleep(3);
      this.changeBarColor(this.array, i, this.Blue);
    }
  }
  // QUICKSORT /////////////////////////////////////////////////////////////////
  quickSortHelper() {
    this.quickSort(0, this.array.length - 1)
  }
  async quickSort(low, high): Promise<void> {
    if (low < high) {
      const pi = await this.partition(low, high);
      await this.quickSort(low, pi - 1);
      await this.quickSort(pi + 1, high);
    }
    for (let i = low; i <= high; i++) {
      this.changeBarColor(this.array, i, this.Blue);
    }
  }

  async partition(low, high): Promise<number> {
    const pivot = this.array[high].value;
    let i = low - 1;

    for (let j = low; j < high; j++) {
      if (this.array[j].value < pivot) {
        i++;
        await this.changeBarColor(this.array, i, this.Red);
        await this.changeBarColor(this.array, j, this.Red);
        await sleep(10);
        await this.swapBar(i, j);
        await sleep(10);
        await this.changeBarColor(this.array, i, this.Blue);
        await this.changeBarColor(this.array, j, this.Blue);
      }
    }
    await this.swapBar(i + 1, high);
    return i + 1;
  }

  // RADIX SORT/////////////////////////////////////////////////////////////
  async radixSort(): Promise<void> {
    let max = 0
    for (let i = 0; i < this.array.length; i++) {
      if (this.array[i].value > max) {
        max = this.array[i].value;
      }
    }
    for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
      await this.countSort(this.array, exp);
      if (this.reset) {
        return;
      }
    }
  }

  async countSort(array, exp): Promise<void> {
    let n = array.length;
    let count = new Array(10).fill(0);
    let output = new Array(n).fill(0);

    for (let i = 0; i < n; ++i) {
      this.changeBarColor(this.array, i, this.Red);
      await sleep(7);
      count[Math.floor(array[i].value / exp) % 10]++;
    }

    for (let i = 1; i < 10; ++i) {
      count[i] += count[i - 1];
    }

    for (let i = n - 1; i >= 0; i--) {
      output[count[Math.floor(array[i].value / exp) % 10] - 1] = array[i].value;
      --count[Math.floor(array[i].value / exp) % 10];
    }

    for (let i = 0; i < n; ++i) {
      await sleep(30);
      if (this.reset) {
        return;
      }
      array[i].value = output[i];
      this.changeBarColor(this.array, i, this.Blue);
    }

    this.array = array;
  }
  // INSERTION SORT/////////////////////////////////////////////////////////////

  async insertionSort(): Promise<void> {
    if (!this.isDone) {
      return;
    }
    this.isDone = false;
    let i = 1;
    while (i < this.array.length) {
      let j = i;
      if (this.reset) {
        return;
      }
      while (j > 0 && this.array[j - 1].value > this.array[j].value) {
        if (this.reset) {
          return;
        }
        await this.swapBar(j - 1, j);
        this.changeBarColor(this.array, j - 1, this.Red);
        this.changeBarColor(this.array, j, this.Red);
        j--;
      }
      i++;
    }
    for (i = 0; i < this.array.length; i++) {
      await sleep(3);
      this.changeBarColor(this.array, i, this.Blue);
    }
    this.isDone = true;
  }
}

export function sleep(ms: number): Promise<void> {
  return new Promise(res => { setTimeout(() => res(), ms) });
}
