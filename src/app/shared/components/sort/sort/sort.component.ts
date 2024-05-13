import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { IClient } from '../../../interfaces/client.interface';
import { Router } from '@angular/router';


interface sortProp {
  name: string;
  key: string;
}

@Component({
  selector: 'app-sort',
  standalone: true,
  imports: [
    CommonModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    DropdownModule,
  ],
  templateUrl: './sort.component.html',
  styleUrl: './sort.component.scss',
})
export class SortComponent {
  @Input() visible = {
    value: false,
  };

  @Output() sortValue = new EventEmitter<string>();

  sortClient!: IClient;

   myQueryParams = {
    param1: 'value1',
    param2: 'value2'
  };

  constructor(private router: Router) { }

  sortProperties: sortProp[] | undefined = [
    { name: 'First Name', key: 'firstname' },
    { name: 'Last Name', key: 'lastname' },
    { name: 'Gender', key: 'gender' },
    { name: 'Phone Number', key: 'phonenumber' },
  ];

  selectedProperty: sortProp | undefined;

  ngOnInit() {}



  onSaveClick() {
    this.visible.value = false;
 
    this.sortValue.emit(this.selectedProperty?.key);

    this.router.navigate(['/home', , { queryParams: this.myQueryParams.param1 }])
  }
}
