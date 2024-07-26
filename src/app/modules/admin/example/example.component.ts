import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { catchError, map } from 'rxjs/operators';

@Component({
    selector     : 'example',
    standalone   : true,
    templateUrl  : './example.component.html',
    encapsulation: ViewEncapsulation.None,
    imports: [MatButtonModule]
})
export class ExampleComponent implements OnInit
{
    products: any[];
    constructor(private httpClient: HttpClient, private router: Router)
    {
        console.log('Constructor');
    }

    loadData(): void {
        const headers = new HttpHeaders({
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6ImRhbmllbC5hbmNpbmVzQGdtYWlsLmNvbSIsIm5iZiI6MTcyMTg5ODYwMiwiZXhwIjoxNzIxOTA1ODAyLCJpYXQiOjE3MjE4OTg2MDJ9.Y35KsVJMnBvdpaAMm49A3S-DROFN4psl5znsSGuLCus'
        });

        const params = new HttpParams();
        params.append("orderBy", "name");

        this.httpClient.get<any[]>('http://api.danielancines.com/api/v1/product', {headers: headers, params: params})
        .pipe(
            catchError(error => {
                console.log(error);
                return [];
            }))
        .subscribe(data => {
            this.products = data;
            console.log(data);
        });
    }

    ngOnInit(): void {

    }
}
