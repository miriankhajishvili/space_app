import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Observable, Subject, debounceTime, map, takeUntil, tap } from 'rxjs';
import { IClient, pageRequest } from '../../shared/interfaces/client.interface';

import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { Store } from '@ngrx/store';
import { getAllClients } from '../../store/action';
import { selectClients, selectItems } from '../../store/reducer';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialog } from '@angular/material/dialog';
import { SortingComponent } from '../../shared/components/sorting/sorting.component';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { DeleteConfirmDialogComponent } from '../../shared/components/delete-confirm-dialog/delete-confirm-dialog.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [
    CommonModule,

    HttpClientModule,
    RouterModule,

    ReactiveFormsModule,

    AsyncPipe,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    SortingComponent,
    MatPaginatorModule,
    MatIconModule,
  ],
  templateUrl: './clients-list.component.html',
  styleUrl: './clients-list.component.scss',
  providers: [MatButtonModule],
})
export class ClientComponent implements OnInit, OnDestroy {
  mySub$ = new Subject();
  allClients$: Observable<IClient[]> = this.store.select(selectClients);
  items$: Observable<any> = this.store.select(selectItems);

  totalRecords?: number;

  form = new FormGroup({
    searchinput: new FormControl(null),
  });

  page: number = +this.activatedRouter.snapshot.queryParams['page'] || 1;
  first: number = this.page * 10 - 10;

  pagination: pageRequest = {
    page: this.page,
    row: 10,
    search: '',
    sort: '',
  };

  visible = {
    value: false,
  };

  count$!: Observable<any>;

  constructor(
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private store: Store,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getAllClientts();
    this.inputValueChange();
    console.log(this.page);
  }

  getAllClientts() {
    this.store.dispatch(
      getAllClients.getAllClientsAction({ pageRequest: this.pagination })
    );
  }

  inputValueChange() {
    this.form.valueChanges
      .pipe(takeUntil(this.mySub$), debounceTime(1000))
      .subscribe((value) => {
        this.pagination = {
          ...this.pagination,
          page: 1,
          search: value.searchinput,
        };
        this.store.dispatch(
          getAllClients.getAllClientsAction({ pageRequest: this.pagination })
        );
      });
  }

  onDelete(id: number, event: Event) {
    this.dialog.open(DeleteConfirmDialogComponent, {
      data: {
        id: id,
      },
    });
  }

  receiveValue($event: string) {
    this.pagination = {
      ...this.pagination,
      sort: $event,
    };

    this.store.dispatch(
      getAllClients.getAllClientsAction({ pageRequest: this.pagination })
    );
    console.log($event);
  }

  openSortDialog() {
    this.dialog.open(SortingComponent);
  }

  handlePageEvent($event: PageEvent) {
    console.log($event);
    this.pagination = {
      ...this.pagination,
      page: $event.pageIndex + 1,
    };
    this.router.navigate([], {
      relativeTo: this.activatedRouter,
      queryParams: { page: $event.pageIndex + 1 },
      queryParamsHandling: 'merge',
    });

    this.store.dispatch(
      getAllClients.getAllClientsAction({ pageRequest: this.pagination })
    );
  }

  ngOnDestroy(): void {
    this.mySub$.next(null);
    this.mySub$.complete();
  }
}
