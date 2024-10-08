import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';
import { pageRequest } from '../../shared/interfaces/client.interface';
import { getAllClients } from '../../store/action';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatMenuModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  constructor(private store: Store, private router: Router, private activatedRoute: ActivatedRoute) {}

  queryParams = {
    page: 1,
  }

  pagination: pageRequest = {
    page: 1,
    row: 10,
    search: '',
    sort: '',
  };

  onClick() {
    this.router.navigate(['/clients'], { queryParams: this.queryParams });
    this.store.dispatch(
      getAllClients.getAllClientsAction({ pageRequest: this.pagination })
    );
  }

  onAddClientClick() {
    this.router.navigate(['/add-client']);
  }

  ngOnInit() {
  }
}
