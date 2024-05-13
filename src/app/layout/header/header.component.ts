import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { SplitButtonModule } from 'primeng/splitbutton';
import { InputTextModule } from 'primeng/inputtext';
import {
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    ToolbarModule,
    CommonModule,
    ButtonModule,
    SplitButtonModule,
    InputTextModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
