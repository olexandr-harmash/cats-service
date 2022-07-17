import { FormControl } from '@angular/forms';
import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-seach',
  templateUrl: './seach.component.html',
  styleUrls: ['./seach.component.css']
})
export class SeachComponent implements OnInit {
  @Input()
   breeds: Array<any> = [];

  find: Array<any> = [];

  count = new FormControl('10');
  breed = new FormControl('');

  @Output()
    notify: EventEmitter<SeachEvent> = new EventEmitter<SeachEvent>();

  getBreeds(breed: string) {
    const breedId = (breed === "") ? "" : this.breeds.find(b => b.name === breed).id;
    this.notify.emit(
      new SeachEvent(
        breedId,
        parseInt(
          <string>this.count.value, 10)
      )
    );
  }

  ngOnInit(): void {
    this.breed.valueChanges.subscribe(val => {
      this.find = this.seachBreeds(val);
    });
    this.count.valueChanges.subscribe(val => {
      if (parseInt(<string>val) > 25) {
        this.count.setValue('25');
      }
    });
  }

  seachBreeds(val: string | null): Array<string> {
    if (val) {
      return this.breeds.filter(b => b.name.includes(val));
    }
    return [];
  }
}

export class SeachEvent {
  breed: string;
  perPage: number;

  constructor(__breed: string, __perPage: number) {
    this.breed = __breed;
    this.perPage = __perPage;
  }
}
