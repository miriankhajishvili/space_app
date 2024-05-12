import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ClientService } from '../../shared/services/client.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import {
  Observable,
  Subject,
  debounceTime,
  map,
  switchMap,
  takeUntil,
} from 'rxjs';
import { IClient, pageRequest } from '../../shared/interfaces/client.interface';
import { PaginatorModule } from 'primeng/paginator';
import { LazyLoadEvent } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { SortComponent } from '../../shared/components/sort/sort/sort.component';

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
    DialogModule,
    SortComponent,
  ],
  templateUrl: './client.component.html',
  styleUrl: './client.component.scss',
  providers: [],
})
export class ClientComponent implements OnInit, OnDestroy {
  mySub$ = new Subject<null>();
  allClients$!: IClient[];
  totalRecords?: number;

  allcients!: Observable<any>;
  form = new FormGroup({
    searchinput: new FormControl(null),
  });

  first: number = 0;
  rows: number = 10;

  pagination: pageRequest = {
    first: 0,
    rows: 10,
    search: '',
    sort: '',
  };

  constructor(private clientService: ClientService) {}

  ngOnInit(): void {
    this.allcients = this.clientService.updatedClientLis$.pipe(
      switchMap(() => {
        return this.clientService.getClients(this.pagination).pipe(
          map((res) => {
            this.totalRecords = res.items
           return res.data;

           
            
          })
        );
      })
    );

    // this.clientService
    //   .getClients(this.pagination)
    //   .pipe(takeUntil(this.mySub$))
    //   .subscribe((res) => {
    //     this.allClients$ = res.data;
    //     this.totalRecords = res.items;
    //   });

    this.clientService.updatedClientLis$.next(null);

    this.inputValueChange();
  }

  inputValueChange() {
    this.form.valueChanges.pipe(debounceTime(1000)).subscribe((value) => {
      this.pagination = {
        ...this.pagination,
        first: 0,
        search: value.searchinput,
      };

      this.clientService.updatedClientLis$.next(null);
    });
  }

  onPageChange(event: LazyLoadEvent) {
    this.inputValueChange();

    this.pagination.first = event.first || 0;
    this.clientService.updatedClientLis$.next(null);
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
        this.clientService.updatedClientLis$.next(null);
      });
  }
  ngOnDestroy(): void {
    this.mySub$.next(null);
    this.mySub$.complete();
  }
}
