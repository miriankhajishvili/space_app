import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  constructor(private http: HttpClient) {}
  uploadImage(data: any) {
    const headers = new HttpHeaders();
    return this.http.post(environment.apiUrl + 'clients', data, {
      headers: headers,
    });
  }
}
