import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { IClient, myData, pageRequest } from '../interfaces/client.interface';
import { createRequestUrl } from '../helpers/url';

@Injectable({
  providedIn: 'root',
})
export class ClientService extends BaseService {
  private readonly localStorageKey = 'clientLastNumericId';
  lastNumericId: number = 0;
  updatedClientList$ = new BehaviorSubject<boolean>(false);

  getClients(pageRequest: pageRequest): Observable<myData> {
    const { page, search, sort } = pageRequest;

    const paramsObj = {
      _page: page,
      firstname: search,
      _sort: sort,
    };

    const url = createRequestUrl('clients', paramsObj);

    return this.get<myData>(url);
  }

  getCurrentClient(id: number): Observable<IClient> {
    return this.get<IClient>(`clients/${id}`);
  }

  addClient(data: IClient): Observable<IClient> {
    const storedId = localStorage.getItem(this.localStorageKey);
    if (storedId) {
      this.lastNumericId = parseInt(storedId, 10);
    }
    this.lastNumericId++;
    localStorage.setItem(this.localStorageKey, this.lastNumericId.toString());
    const newClient = { ...data, id: this.lastNumericId.toString() };

    return this.post<IClient>('clients', newClient);
  }

  editClient(id: number | undefined, data: IClient): Observable<IClient> {
    return this.put<any>(`clients/${id}`, data);
  }
}
