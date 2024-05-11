import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { SplitButtonModule } from 'primeng/splitbutton';
import { InputTextModule } from 'primeng/inputtext';
import { ClientService } from '../../shared/services/client.service';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    ToolbarModule,
    CommonModule,
    ButtonModule,
    SplitButtonModule,
    InputTextModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {

  ngOnInit() {}

  constructor(private clientService: ClientService){}

}
``;
