import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClientService extends BaseService {


  getClients(): Observable<any> {
    return this.get<any>('clients');
  }
}
