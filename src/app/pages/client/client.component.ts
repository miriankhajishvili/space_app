import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ClientService } from '../../shared/services/client.service';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
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
import { InputTextModule } from 'primeng/inputtext';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { SortComponent } from '../../shared/components/sort/sort/sort.component';
import { CardService } from '../../shared/services/card.service';

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

  page: number = +this.activatedRouter.snapshot.queryParams['page'] + 1 || 0;
  first: number = 10


  pagination: pageRequest = {
    page: +this.activatedRouter.snapshot.queryParams['page'] || 0,
    row : 10,
    search: '',
    sort: '',
  };

  visible = {
    value: false,
  };

  constructor(
    private clientService: ClientService,
    private cardService: CardService,
    private router: Router,
    private activatedRouter: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.allcients = this.clientService.updatedClientLis$.pipe(
      switchMap(() => {
       
        return this.clientService.getClients(this.pagination);
      }),
      map((res) => {
        this.totalRecords = res.items;
        return res.data;
      })
    );

    this.inputValueChange();
  }

  inputValueChange() {
    this.form.valueChanges
      .pipe(takeUntil(this.mySub$), debounceTime(1000))
      .subscribe((value) => {
        this.pagination = {
          ...this.pagination,
          page: 0,
          search: value.searchinput,
        };

        this.clientService.updatedClientLis$.next(true);
      });
  }

  onPageChange(event: any) {
    this.inputValueChange();

    this.pagination.page = event.page  || 0;
    this.clientService.updatedClientLis$.next(true);

    this.router.navigate([], {
      relativeTo: this.activatedRouter,
      queryParams: { page: event.page + 1 },
      queryParamsHandling: 'merge',
    });

    console.log(event.first);
    console.log(event.row);
  }

  onDelete(id: number) {
    this.cardService
      .deleteClient(id)
      .pipe(
        takeUntil(this.mySub$),
        switchMap((res) => {
          return this.clientService.getClients(this.pagination);
        })
      )
      .subscribe((res) => {
        this.clientService.updatedClientLis$.next(true);
      });
  }

  receiveValue($event: string) {
    this.pagination.sort = $event;
    this.clientService.updatedClientLis$.next(true);
  }
  ngOnDestroy(): void {
    this.mySub$.next(null);
    this.mySub$.complete();
  }
}
