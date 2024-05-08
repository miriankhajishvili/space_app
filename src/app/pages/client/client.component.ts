import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ClientService } from '../../shared/services/client.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BaseService } from '../../shared/services/base.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    HttpClientModule,
    RouterModule,
  ],
  templateUrl: './client.component.html',
  styleUrl: './client.component.scss',
  providers: [],
})
export class ClientComponent implements OnInit {
  allClients$!: any[] 

  constructor(private clientService: ClientService) {}

  ngOnInit(): void {
    this.clientService
      .getClients()
      .subscribe((res) => (this.allClients$ = res));
    console.log(this.allClients$);
  }
}
