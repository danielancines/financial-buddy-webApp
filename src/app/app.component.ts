import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'my-angular18-app';
  products: any[] = [];

  constructor(private httpClient: HttpClient){

  }
  ngOnInit(): void {
    //this.httpClient.get<any>('https://dummyjson.com/products')
    const headers = new HttpHeaders({
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6ImRhbmllbC5hbmNpbmVzQGdtYWlsLmNvbSIsIm5iZiI6MTcyMjY5NTAwMCwiZXhwIjoxNzIyNzAyMjAwLCJpYXQiOjE3MjI2OTUwMDB9.cJsG8bEcYT5t_IZWx1vPMJTddfHzSFZIgTnartXhOMU'
    });
    this.httpClient.get<any[]>('http://api.danielancines.com/api/v1/product', { headers: headers })
    .pipe(catchError(error => {
      //console.log(error);
      return [];
    }))
    .subscribe(products => {
      this.products = products;
    });
  }
}
