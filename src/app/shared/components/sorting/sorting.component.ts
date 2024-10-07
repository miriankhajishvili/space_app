import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute } from '@angular/router';
import { pageRequest } from '../../interfaces/client.interface';
import { Store } from '@ngrx/store';
import { getAllClients } from '../../../store/action';

interface sortProp {
  name: string;
  key: string;
}

@Component({
  selector: 'app-sorting',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: './sorting.component.html',
  styleUrl: './sorting.component.scss',
})
export class SortingComponent implements OnInit {
  page: number = +this.activatedRouter.snapshot.queryParams['page'] || 1;
  first: number = this.page * 10 - 10;

  pagination: pageRequest = {
    page: this.page,
    row: 10,
    search: '',
    sort: '',
  };

  @Output() sortValue = new EventEmitter<string>();

  sortProperties: sortProp[] = [
    { name: 'First Name', key: 'firstname' },
    { name: 'Last Name', key: 'lastname' },
    { name: 'Gender', key: 'gender' },
    { name: 'Phone Number', key: 'phonenumber' },
  ];
  selectedProperty!: string;
  constructor(
    private dialog: MatDialog,
    private activatedRouter: ActivatedRoute,
    private store: Store
  ) {}
  ngOnInit(): void {}
  onCancelClick() {
    this.dialog.closeAll();
  }

  onSaveClick() {
    this.pagination = {
      ...this.pagination,
      sort: this.selectedProperty,
    };

    this.store.dispatch(
      getAllClients.getAllClientsAction({ pageRequest: this.pagination })
    );

    this.dialog.closeAll();
  }
}
