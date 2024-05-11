import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layout/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ClientService } from './shared/services/client.service';
import { NgToastModule } from 'ng-angular-popup';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, HttpClientModule, CommonModule, NgToastModule],
  template: ' <app-header></app-header> <router-outlet></router-outlet> <ng-toast></ng-toast>',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'mySpace';

  constructor( private cltinet: ClientService){}
}
