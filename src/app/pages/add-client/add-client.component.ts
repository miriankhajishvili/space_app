import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ClientService } from '../../shared/services/client.service';
import { Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-client',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.Default,
  imports: [
    CommonModule,
    InputTextModule,
    ReactiveFormsModule,
    ButtonModule,
    RouterModule,
  ],
  templateUrl: './add-client.component.html',
  styleUrl: './add-client.component.scss',
})
export class AddClientComponent implements OnInit {
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
    img: new FormControl('', [Validators.required]),
  });

  myGender: string[] = ['Male', 'Female'];

  radioChangeHandler(value: any) {
    this.form.controls['gender'].setValue(value.target.value);
  }

  // currentClient$ = this.clientService.currentClient$;

  get firstname() {
    return this.form.controls['firstname'];
  }
  get lastname() {
    return this.form.controls['lastname'];
  }
  get personalid() {
    return this.form.controls['personalid'];
  }
  get gender() {
    return this.form.controls['gender'];
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
  get img() {
    return this.form.controls['img'];
  }

  constructor(
    private clientService: ClientService,
    private Router: Router,
    private changeDetRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.clientService.currentClient$.subscribe((res) => {
      console.log(res)
      this.form.patchValue({firstname: res?.firstname});
      this.form.updateValueAndValidity();
      this.changeDetRef.detectChanges
      console.log(res);
      console.log(this.form);
    });
  }

  onSubmit() {
    this.clientService.addClient(this.form.value).subscribe();
    this.Router.navigate(['/']);
  }
}
