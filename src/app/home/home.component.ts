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

    this.httpClient.get<any[]>('http://api.danielancines.com/api/v1/product')
      .pipe(catchError(error => {
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
