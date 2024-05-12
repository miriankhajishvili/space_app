import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ClientService } from '../../shared/services/client.service';
import { ActivatedRoute, Route, Router, RouterModule } from '@angular/router';
import { map, mergeMap, of, switchMap } from 'rxjs';
import { singleLanguageValidator } from '../../shared/regex/georgianLettersValidator';
import { NgToastService } from 'ng-angular-popup';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { phoneNumberValidator } from '../../shared/regex/phoneNumberValidator';

@Component({
  selector: 'app-add-client',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    RouterModule,
    HttpClientModule,
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
      singleLanguageValidator(),
      Validators.pattern(/^\S+$/),
    ]),
    lastname: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(50),
      singleLanguageValidator(),
      Validators.pattern(/^\S+$/),
    ]),
    personalid: new FormControl('', [
      Validators.required,
      Validators.minLength(11),
      Validators.maxLength(11),
    ]),
    gender: new FormControl('', [Validators.required]),
    phonenumber: new FormControl('', [
      Validators.required,
      // Validators.pattern(/^5\d{8}$/),
      // Validators.pattern(/^5\d{8}$/)
      Validators.pattern(/^\S+$/),
      phoneNumberValidator(),
    ]),
    address: new FormGroup({
      address: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
    }),
    currentAddress: new FormGroup({
      currentAddress: new FormControl('', Validators.required),
      currentCity: new FormControl('', Validators.required),
      currentCountry: new FormControl('', Validators.required),
    }),
    img: new FormControl('', [Validators.required]),
  });

  clientId?: string;
  isEdit: boolean = this.ActivatedRoute.snapshot.url[0].path === 'edit-client';

  radioChangeHandler(value: any) {
    if (value.target.value) {
      this.form.controls['gender'].setValue(value.target.value);
    }
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
  get gender() {
    return this.form.controls['gender'];
  }
  get phonenumber() {
    return this.form.controls['phonenumber'];
  }
  get address() {
    return this.form.controls['address'] as FormGroup;
  }

  get myAddress() {
    return this.address.controls['myAddress'];
  }

  get myCity() {
    return this.address.controls['myCity'];
  }

  get myCountry() {
    return this.address.controls['myCountry'];
  }

  get currentAddress() {
    return this.form.controls['currentAddress'] as FormGroup;
  }

  get myCurrentAddress() {
    return this.currentAddress.controls['myCurrentAddress'];
  }
  get myCurrentCity() {
    return this.currentAddress.controls['myCurrentCity'];
  }
  get myCurrentCountry() {
    return this.currentAddress.controls['myCurrentCountry'];
  }
  get img() {
    return this.form.controls['img'];
  }

  selectedFile!: File;

  constructor(
    private clientService: ClientService,
    private ActivatedRoute: ActivatedRoute,
    private Router: Router,
    private NgToastService: NgToastService
  ) {}

  ngOnInit(): void {


    this.ActivatedRoute.params
      .pipe(
        mergeMap((params) => {
          if (params['id']) {
            return this.clientService.getCurrentClient(params['id']);
          } else return of(null);
        }),
        map((res) => {
          if (res) {
            this.form.patchValue(res);
          }
        })
      )
      .subscribe();
  }

  onSubmit() {
    if (this.form.valid)
      if (this.isEdit) {
        this.clientService
          .editClient(this.clientId, this.form.value)

          .subscribe({
            next: () => {
              this.NgToastService.success({
                detail: 'Success Messege',
                summary: 'Client edited successfully',
              });
            },
            error: () => {
              this.NgToastService.error({
                detail: 'Error Messege',
                summary: 'Client edited unsuccessfully',
              });
              this.Router.navigate(['/']);
            },
          });
      } else {
        this.clientService
          .addClient(this.form.value)

          .subscribe({
            next: () => {
              this.NgToastService.success({
                detail: 'Success Messege',
                summary: 'Client edited successfully',
              });

              this.Router.navigate(['/']);
            },
            error: () => {
              this.NgToastService.error({
                detail: 'Error Messege',
                summary: 'Client edited unsuccessfully',
              });
            },
          });
      }
    {
    }

    this.form.markAllAsTouched();
  }
}
