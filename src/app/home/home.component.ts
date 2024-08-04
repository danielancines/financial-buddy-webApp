import { CommonModule, Location } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  products: any[] = [];

  constructor(private httpClient: HttpClient,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    //this.httpClient.get<any>('https://dummyjson.com/products')
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem("token")}`
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

  addPrice() {
    this.router.navigate(['login']);
  }
}
