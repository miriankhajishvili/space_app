import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';
import { IClient } from '../interfaces/client.interface';

@Injectable({
  providedIn: 'root',
})
export class ClientService extends BaseService {


  getClients(): Observable<IClient[]> {
    return this.get<IClient[]>('clients');
  }

  getCurrentClient(id: string): Observable<IClient> {
    return this.get<IClient>(`clients/${id}`)
  }
}
