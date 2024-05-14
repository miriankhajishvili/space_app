import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ClientService } from '../../shared/services/client.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { singleLanguageValidator } from '../../shared/regex/georgianLettersValidator';
import { NgToastService } from 'ng-angular-popup';
import { HttpClientModule } from '@angular/common/http';
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
export class AddClientComponent implements OnInit, OnDestroy {
  mySub$ = new Subject();

  selectedFile!: File;
  imageUrl: string | ArrayBuffer | null = null;

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
      Validators.pattern(/^[0-9]+$/),
    ]),
    gender: new FormControl('', [Validators.required]),
    phonenumber: new FormControl('', [
      Validators.required,
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
    img: new FormControl(''),
  
  });

  clientId?: number;
  isEdit: boolean = this.ActivatedRoute.snapshot.url[0].path === 'edit-client';

  submitted = false;
  base64!: ArrayBuffer | string | null;

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
    return this.address.controls['address'];
  }

  get myCity() {
    return this.address.controls['city'];
  }

  get myCountry() {
    return this.address.controls['country'];
  }

  get currentAddress() {
    return this.form.controls['currentAddress'] as FormGroup;
  }

  get myCurrentAddress() {
    return this.currentAddress.controls['currentAddress'];
  }
  get myCurrentCity() {
    return this.currentAddress.controls['currentCity'];
  }
  get myCurrentCountry() {
    return this.currentAddress.controls['currentCountry'];
  }
  get img() {
    return this.form.controls['img'];
  }

  constructor(
    private ClientService: ClientService,
    private ActivatedRoute: ActivatedRoute,
    private router: Router,
    private NgToastService: NgToastService
  ) {}

  ngOnInit(): void {
    this.ActivatedRoute.data.pipe(takeUntil(this.mySub$)).subscribe((res) => {
      const clientInfo = res['client'];

      if (clientInfo) {
        this.clientId = clientInfo.id;
        this.form.patchValue(clientInfo);

        this.form.get('img')?.setValue(clientInfo.img);
      }
    });

    this.base64;
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imageUrl = e.target.result;
    };
    reader.readAsDataURL(this.selectedFile);
  }

  onInputChanged(e: any) {
    const targetEvent = e.target;
    const file: File = targetEvent.files[0];

    const fileReader: FileReader = new FileReader();

    fileReader.onload = (e) => {
      this.base64 = fileReader.result;
    };
    fileReader.readAsDataURL(file);
  }

  submit() {
    if (this.base64) {
      this.form.get('img')?.setValue(this.base64);
    }

    if (this.form.valid) {
      if (this.isEdit) {
        this.ClientService.editClient(this.clientId, this.form.value)
          .pipe(takeUntil(this.mySub$))
          .subscribe({
            next: () => {
              this.NgToastService.success({
                detail: 'Success Messege',
                summary: 'Client edited successfully',
              });
              this.router.navigate(['/']);
            },
            error: () => {
              this.NgToastService.error({
                detail: 'Error Messege',
                summary: 'Client edited unsuccessfully',
              });
            },
          });
      } else {
        this.ClientService.addClient(this.form.value)
          .pipe(takeUntil(this.mySub$))
          .subscribe({
            next: () => {
              this.NgToastService.success({
                detail: 'Success Messege',
                summary: 'Client edited successfully',
              });

              this.router.navigate(['/']);
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
    }
    this.NgToastService.error({
      detail: 'Error Messege',
      summary: 'All fields must be filled.',
    });

    this.form.markAllAsTouched();
  }

  ngOnDestroy(): void {
    this.mySub$.next(null), this.mySub$.complete();
  }
}
