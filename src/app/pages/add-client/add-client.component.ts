import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-add-client',
  standalone: true,
  imports: [CommonModule, InputTextModule, ReactiveFormsModule, ButtonModule],
  templateUrl: './add-client.component.html',
  styleUrl: './add-client.component.scss',
})
export class AddClientComponent {
  form: FormGroup = new FormGroup({
    firstname: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(50),
    ]),
    lastname: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(50),
    ]),
    personalid: new FormControl('', [
      Validators.required,
      Validators.minLength(11),
      Validators.maxLength(11),
    ]),
    gender: new FormControl('', [Validators.required]),
    phonenumber: new FormControl('', [
      Validators.required,
      Validators.minLength(9),
      Validators.maxLength(9),
    ]),
    legaladdress: new FormControl('', [Validators.required]),
    currentaddress: new FormControl('', [Validators.required]),
    legalcity: new FormControl('', [Validators.required]),
    currentcity: new FormControl('', [Validators.required]),
    legalcountry: new FormControl('', [Validators.required]),
    currentcountry: new FormControl('', [Validators.required]),
  });

  myGender: string[] = ['Male', 'Female'];

  radioChangeHandler(value: any) {
    console.log(value.target.value);
  }

  get firstname() {
    return this.form.controls['firstname'];
  }
  get lastname() {
    return this.form.controls['lastname'];
  }
  get personalid() {
    return this.form.controls['personalid'];
  }
  get phonenumber() {
    return this.form.controls['phonenumber'];
  }
  get legaladdress() {
    return this.form.controls['legaladdress'];
  }
  get currentaddress() {
    return this.form.controls['currentaddress'];
  }
  get legalcity() {
    return this.form.controls['legalcity'];
  }
  get currentcity() {
    return this.form.controls['currentcity'];
  }
  get legalcountry() {
    return this.form.controls['legalcountry'];
  }
  get currentcountry() {
    return this.form.controls['currentcountry'];
  }


  onSubmit() {
    // console.log(this.form.value);

    console.log(this.firstname.value);
  }
}
