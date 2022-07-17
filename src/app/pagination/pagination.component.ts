import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent
  implements OnInit, OnChanges {
  @Input()
   pages: number = 0;
  @Output()
   notify: EventEmitter<number> = new EventEmitter<number>();

   range: number = 0;
   pagesValues: Array<number> = [];

   ngOnChanges(changes: SimpleChanges) {
    const pages = changes["pages"].currentValue;
    this.range = (pages > 10) ? 10 : pages;
    this.pagesValues = new Array(this.range).fill(0).map(
      (item, index) => item + index + 1
    );
   }

  constructor() { }

  ngOnInit(): void {
    this.pagesValues = new Array(this.range).fill(0).map(
      (item, index) => item + index + 1
    );
  }

  getPage(page: number): void {
    this.notify.emit(page);
  }
  
  rightArrow(): void {
    let diff = this.pages - this.pagesValues[this.range - 1];

    if (diff < this.range) {
      this.pagesValues = this.pagesValues.map(
        (item) => item + diff
      );
      return
    }

    this.pagesValues = this.pagesValues.map(
      (item) => item + this.range
    );
  }

  leftArrow(): void {
    let diff = this.pagesValues[0] - this.range

    if (diff < 0) {
      this.pagesValues = this.pagesValues.map(
        (item) => item - this.pagesValues[0] + 1
      );
      return;
    }

    this.pagesValues = this.pagesValues.map(
      (item) => item - this.range
    );
  }
}
