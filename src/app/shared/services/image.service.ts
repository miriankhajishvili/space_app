import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  constructor(private http: HttpClient) {}
  // uploadImage(formData: FormData) {
  //   return this.http.post<any>('http://localhost:3000/uploads', formData);
  // }

  
}