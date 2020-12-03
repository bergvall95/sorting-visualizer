import { DataService } from './../data.service';
import { ArrayBar } from './../interfaces';

export class SortingAlgorithms {
    array: ArrayBar[];

    constructor(public dataService: DataService) {
        this.array = this.dataService.array;
    }


}
