import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { catchError, map } from 'rxjs/operators';
import {MatTableModule} from '@angular/material/table';
import { CommonModule } from '@angular/common';

@Component({
    selector     : 'example',
    standalone   : true,
    templateUrl  : './example.component.html',
    encapsulation: ViewEncapsulation.None,
    imports: [CommonModule, MatButtonModule, MatTableModule]
})
export class ExampleComponent implements OnInit
{
    products: IProduct[] = [];
    displayedColumns: string[] = ['Name', 'Price'];

    constructor(private httpClient: HttpClient, private router: Router)
    {
        console.log('Constructor');
    }

    loadData(): void {
        const params = new HttpParams();
        params.set("orderBy", "name");

        this.httpClient.get<any[]>('http://api.danielancines.com/api/v1/product?orderBy=name', {params: params})
        .pipe(
            catchError(error => {
                console.log(error);
                return [];
            }))
        .subscribe(data => {
            data.forEach(product => {
                this.products = this.products.concat({
                    Name: product.name,
                    Price: product.prices.pop().price
                });
            });
        });
    }

    ngOnInit(): void {
        this.loadData();
    }
}

interface IProduct {
    Name: string,
    Price: number
}
