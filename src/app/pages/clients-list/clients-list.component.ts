import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ClientService } from '../../shared/services/client.service';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Observable, Subject, debounceTime, takeUntil } from 'rxjs';
import { IClient, pageRequest } from '../../shared/interfaces/client.interface';
import { PaginatorModule } from 'primeng/paginator';
import { InputTextModule } from 'primeng/inputtext';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { SortComponent } from '../../shared/components/sort/sort/sort.component';
import { CardService } from '../../shared/services/card.service';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { Store } from '@ngrx/store';
import { deleteClient, getAllClients } from '../../store/action';
import { selectClients, selectItems } from '../../store/reducer';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';

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
    ConfirmDialogModule,
    ToastModule,
    AsyncPipe,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule
  ],
  templateUrl: './clients-list.component.html',
  styleUrl: './clients-list.component.scss',
  providers: [ConfirmationService, MessageService, MatButtonModule],
})
export class ClientComponent implements OnInit, OnDestroy {
  mySub$ = new Subject();
  allClients$: Observable<IClient[]> = this.store.select(selectClients);
  items$: Observable<number> = this.store.select(selectItems);
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
    private clientService: ClientService,
    private cardService: CardService,
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.getAllClientts();

    // this.router.navigate([], {
    //   relativeTo: this.activatedRouter,
    //   queryParams: { page: this.page },
    //   queryParamsHandling: 'merge',
    // });

    this.inputValueChange();
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

  onPageChange(event: any) {
    if (event.page + 1 == this.pagination.page) return;

    this.inputValueChange();

    this.pagination = {
      ...this.pagination,
      page: event.page + 1,
    };

    this.getAllClientts();

    this.router.navigate([], {
      relativeTo: this.activatedRouter,
      queryParams: { page: event.page + 1 },
      queryParamsHandling: 'merge',
    });
  }

  onDelete(id: number, event: Event) {
    this.confirmationService.confirm({
      message: 'Are you sure to delete client?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      target: event.target as EventTarget,

      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      acceptIcon: 'none',
      rejectIcon: 'none',
      accept: () => {
        this.store.dispatch(deleteClient.deleteClientAction({ id: id }));
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
  ngOnDestroy(): void {
    this.mySub$.next(null);
    this.mySub$.complete();
  }
}
