import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterModule } from '@angular/router';
import { ClientService } from '../../shared/services/client.service';
import { Observable } from 'rxjs';
import { IClient } from '../../shared/interfaces/client.interface';

@Component({
  selector: 'app-client-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './client-detail.component.html',
  styleUrl: './client-detail.component.scss',
})
export class ClientDetailComponent implements OnInit {
  activeId!: string;
  // currentClient$ : Observable<IClient> = this.clientService.getCurrentClient(this.activeId)

  currentClient!: IClient | undefined;

  constructor(
    private activateRoute: ActivatedRoute,
    private clientService: ClientService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.activeId = this.activateRoute.snapshot.params['id'];
    this.clientService
      .getCurrentClient(this.activeId)
      .subscribe((res) => (this.currentClient = res));


  }

  onEdit(client: IClient | undefined ){

    this.clientService.currentClient$.next(client)
    this.router.navigate(['/add-client'])
  }
}
