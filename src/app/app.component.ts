import { Component } from '@angular/core';
import { SeachEvent } from './seach/seach.component';

import { from, switchMap, of, catchError } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  maxPages = 0;
  maxImages = 10;
  maxIcons = 10;

  breed = "";
  limit = 10;
  page = 0;

  images: Array<any> = [];
  breeds: Array<any> = [];

  ngOnInit(): void {
    this.ftch();
    this.ftchBreeds();
  }

  onSeachNotify(event: SeachEvent) {
    this.limit = event.perPage;
    this.breed = event.breed;
    this.page = 0;
    this.ftch();
  }

  onGetPage(page: number) {
    this.page = page - 1;
    this.ftch();
  }

  ftchBreeds() {
    const fetch = new Request("https://api.thecatapi.com/v1/breeds",{
      method: "GET",
      headers: {
        "x-api-key": "c14a13dd-d2e2-420a-9daf-4c08caac526f"
      }
    });
    let response = (response: any) => {
      if (response.ok) {
        return response.json();
      } else {
        return of({ error: true, message: `Error ${response.status}` });
      }
    }
    let result = (result: any) => {
       console.log(result);
       this.breeds = result
    }
    fetch.on(response, result);
  }

  ftch() {
    const fetch = new Request(`https://api.thecatapi.com/v1/images/search?breed_ids=${this.breed}&limit=${this.limit}&page=${this.page}&order=desc`,{
      method: "GET",
      headers: {
        "x-api-key": "c14a13dd-d2e2-420a-9daf-4c08caac526f"
      }
    });
    let response = (response: any) => {
      if (response.ok) {
        this.maxPages = Math.ceil(
          parseInt(<string>response.headers.get("pagination-count")) / this.limit
        );
        return response.json();
      } else {
        return of({ error: true, message: `Error ${response.status}` });
      }
    }
    let result = (result: any) => {
       console.log(result);
       this.images = result
    }
    fetch.on(response, result);
  }
}

class Request {
  url: string;
  req: RequestInit;

  constructor(__url: string, __req: RequestInit) {
    this.url = __url;
    this.req = __req;
  }

  on(callback: any, subscribe: any) {
    const data = from(fetch(this.url, this.req))
      .pipe(
        switchMap(callback),
        catchError(err => {
          console.error(err);
          return of({ error: true, message: err.message })
        })
      );
    data.subscribe({
      next: subscribe,
      complete: () => console.log('done')
    });
  }
}
