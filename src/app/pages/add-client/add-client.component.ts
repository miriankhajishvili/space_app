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
import { ImageService } from '../../shared/services/image.service';

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
    img: new FormControl('', [Validators.required]),
  });

  clientId?: number;
  isEdit: boolean = this.ActivatedRoute.snapshot.url[0].path === 'edit-client';
  file: any;
  data: any;
  submitted = false;

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
    private NgToastService: NgToastService,
    private imageService: ImageService
  ) {}

  ngOnInit(): void {
    this.ActivatedRoute.data.pipe(takeUntil(this.mySub$)).subscribe((res) => {
      const clientInfo = res['client'];

      if (clientInfo) {
        this.clientId = clientInfo.id;
        this.form.patchValue(clientInfo);
      }
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    // Preview the selected image
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imageUrl = e.target.result;
    };
    reader.readAsDataURL(this.selectedFile);
  }

  onSubmit() {

    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('image', this.selectedFile, this.selectedFile.name);
  
      // this.imageService.uploadImage(formData).subscribe(
      //   (res) => {
      //     // Handle response, e.g., store image URL in a variable
      //     const imageUrl = res.imageUrl;
      //     console.log(res.imageUrl) // Assuming your server returns the URL of the uploaded image
      //     // Navigate to the next component and pass the image URL as a parameter
      //     this.router.navigate(['/'], { queryParams: { imageUrl } });
      //   },
      //   (error) => {
      //     // Handle error, e.g., show error message
      //     console.error('Image upload failed', error);
      //   }
      // );
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

    //   const formData = new FormData();
    //   formData.append('image', this.file, this.file.name);

    //   this.ImageService.uploadImage(formData).subscribe((res) => {
    //     this.data = res;
    //     if ((this.data.status = true)) {
    //       JSON.stringify(this.data.Messege),
    //         '',
    //         {
    //           timeout: 2000,
    //           progressBar: true,
    //         };
    //     } else {
    //       JSON.stringify(this.data.Messege),
    //         '',
    //         {
    //           timeout: 2000,
    //           progressBar: true,
    //         };
    //     }
    //     this.submitted = false;
    //     this.img.reset();
    //   });
    // }

    // uploadImage($event: any) {
    //   console.log($event);
    //   this.file = $event.target.files[0];
  }



  ngOnDestroy(): void {
    this.mySub$.next(null), this.mySub$.complete();
  }
}
