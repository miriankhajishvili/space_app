import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ClientService } from '../../shared/services/client.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { switchMap } from 'rxjs';
import { IClient, pageRequest } from '../../shared/interfaces/client.interface';
import { PaginatorModule } from 'primeng/paginator';
import { LazyLoadEvent } from 'primeng/api';

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
  ],
  templateUrl: './client.component.html',
  styleUrl: './client.component.scss',
  providers: [],
})
export class ClientComponent implements OnInit {
  allClients$!: IClient[];
  totalRecords?: number;

  first: number = 0;
  rows: number = 10;

  pagination: pageRequest = {
    first: 0,
    rows: 10,
  };

  constructor(private clientService: ClientService) {}

  ngOnInit(): void {
    this.clientService.getClients(this.pagination).subscribe((res) => {
      this.allClients$ = res.data;
      this.totalRecords = res.items;
    });
  }

  onPageChange(event: LazyLoadEvent) {


    this.clientService.getClients(this.pagination).subscribe((res) => {
      this.allClients$ = res.data;
      this.totalRecords = res.items;
    });
    

    this.pagination.first = event.first || 0;
    let newRequest = { ...this.pagination };
    this.clientService
      .getClients(newRequest)
      .subscribe((res) => (this.allClients$ = res.data));
  }

  onDelete(id: string) {
    this.clientService
      .deleteClient(id)
      .pipe(
        switchMap((res) => {
          return this.clientService.getClients(this.pagination);
        })
      )
      .subscribe(
         res => {
          this.allClients$ = res.data
         }
      );
  }
}
