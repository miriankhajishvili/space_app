import { Component } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { IClient } from '../../../interfaces/client.interface';

interface City {
  name: string;
  key: string
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
  visible: boolean = false;

  sortClient!: IClient

  showDialog() {
    this.visible = true;
  }

  properties: City[] | undefined;

  selectedProperty: City | undefined;

  ngOnInit() {
    this.properties = [
      { name: 'First Name',key: 'firstname'  },
      { name: 'Last Name', key: 'lastname' },
      { name: 'Gender', key: 'gender' },
      { name: 'Phone Number' , key: 'phonenumber' },

    ];
  }

  onSaveClick(){

    this.visible = false
    console.log(this.selectedProperty?.key)
    
  }
}
