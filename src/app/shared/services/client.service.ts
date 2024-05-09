import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { IClient } from '../interfaces/client.interface';

@Injectable({
  providedIn: 'root',
})
export class ClientService extends BaseService {
  currentClient$ = new ReplaySubject<IClient | undefined>();

  getClients(): Observable<IClient[]> {
    return this.get<IClient[]>('clients');
  }

  getCurrentClient(id: string): Observable<IClient> {
    return this.get<IClient>(`clients/${id}`);
  }

  addClient(data: IClient): Observable<IClient> {
    return this.post<IClient>('clients', data);
  }

  editClient(id: string | undefined, data: IClient): Observable<IClient> {
    return this.put<any>(`clients/${id}`, data);
  }

  deleteClient(id: string): Observable<IClient> {
    return this.delete<IClient>(`clients/${id}`);
  }
}
