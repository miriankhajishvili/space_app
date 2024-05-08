import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ClientService } from '../../shared/services/client.service';
import { Observable } from 'rxjs';
import { IClient } from '../../shared/interfaces/client.interface';

@Component({
  selector: 'app-client-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './client-detail.component.html',
  styleUrl: './client-detail.component.scss',
})
export class ClientDetailComponent implements OnInit {
  activeId!: string;
  // currentClient$ : Observable<IClient> = this.clientService.getCurrentClient(this.activeId)

  currentClient!: IClient | undefined;

  constructor(
    private activateRoute: ActivatedRoute,
    private clientService: ClientService
  ) {}

  ngOnInit(): void {
    this.activeId = this.activateRoute.snapshot.params['id'];
    this.clientService
      .getCurrentClient(this.activeId)
      .subscribe((res) => (this.currentClient = res));

      console.log(this.currentClient)
  }
}
