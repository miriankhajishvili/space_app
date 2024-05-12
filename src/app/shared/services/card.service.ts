import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';
import { ICard } from '../interfaces/card.interface';

@Injectable({
  providedIn: 'root',
})
export class CardService extends BaseService {
  addCard(card: any): Observable<ICard> {
    return this.post<ICard>('cards', card);
  }

  getCards(): Observable<ICard[]> {
    return this.get<ICard[]>('cards');
  }

  deleteCard(id: string): Observable<ICard> {
    return this.delete<ICard>(`cards/${id}`);
  }
  editCard(card: ICard): Observable<ICard> {
    return this.put<ICard>(`cards/${card.id}`, card);
  }
}
