import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatMenuModule } from '@angular/material/menu';

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
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  queryParams = {
    page: 1,
  };

  onClick() {
    this.router.navigate(['/clients'], { queryParams: this.queryParams });
  }

  onAddClientClick() {
    this.router.navigate(['/add-client']);
  }

  ngOnInit() {
    console.log(this.activatedRoute);
  }
}
