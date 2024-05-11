import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ClientService } from '../../shared/services/client.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { Subject, debounceTime, switchMap, takeUntil } from 'rxjs';
import { IClient, pageRequest } from '../../shared/interfaces/client.interface';
import { PaginatorModule } from 'primeng/paginator';
import { LazyLoadEvent } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-client',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    HttpClientModule,
    RouterModule,
    PaginatorModule,
    InputTextModule,
    ReactiveFormsModule,
  
  ],
  templateUrl: './client.component.html',
  styleUrl: './client.component.scss',
  providers: [],
})
export class ClientComponent implements OnInit, OnDestroy {
  mySub$ = new Subject<null>();
  allClients$!: IClient[];
  totalRecords?: number;

  form = new FormGroup({
    searchinput: new FormControl(null),
  });

  first: number = 0;
  rows: number = 10;

  pagination: pageRequest = {
    first: 0,
    rows: 10,
    search: '',
  };

  constructor(private clientService: ClientService) {}

  ngOnInit(): void {
    this.clientService
      .getClients(this.pagination)
      .pipe(takeUntil(this.mySub$))
      .subscribe((res) => {
        this.allClients$ = res.data;
        this.totalRecords = res.items;
      });

      this.form.valueChanges.pipe(
        debounceTime(500)
      ).subscribe((value)=> {
        this.pagination = {
          ...this.pagination,
          first:0,
          search: value.searchinput
        };
        this.clientService.getClients(this.pagination).subscribe(
          res => {
           console.log(res)
           this.allClients$ = res.data
          }
        )
      })
  }

  onPageChange(event: LazyLoadEvent) {
    this.pagination.first = event.first || 0;
    let newRequest = { ...this.pagination };
    this.clientService
      .getClients(newRequest)
      .pipe(takeUntil(this.mySub$))
      .subscribe((res) => (this.allClients$ = res.data));


  }

  onDelete(id: string) {
    this.clientService
      .deleteClient(id)
      .pipe(
        takeUntil(this.mySub$),
        switchMap((res) => {
          return this.clientService.getClients(this.pagination);
        })
      )
      .subscribe((res) => {

        this.allClients$ = res.data
      }
      )
      
  }
  ngOnDestroy(): void {
    this.mySub$.next(null);
    this.mySub$.complete();
  }
}
