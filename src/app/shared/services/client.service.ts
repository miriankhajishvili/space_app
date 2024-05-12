import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { IClient, myData, pageRequest } from '../interfaces/client.interface';

@Injectable({
  providedIn: 'root',
})
export class ClientService extends BaseService {
  currentClient$ = new ReplaySubject<IClient | undefined>();

  updatedClientLis$ = new ReplaySubject<myData | null>()


  getClients( pageRequest: pageRequest): Observable<myData> {
    const { first, rows, search , sort} = pageRequest;
    const page = first / rows + 1;
    let pageDetail = `?_page=${page}`;
    

    return this.get<myData>(`clients${pageDetail}&firstname=${search}&_sort=${sort}`);
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
