import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';
import { ICard } from '../interfaces/card.interface';

@Injectable({
  providedIn: 'root',
})
export class CardService extends BaseService {
  lastNumericId: number = 0;

  addCard(card: ICard): Observable<ICard> {
    this.lastNumericId++
    const newCard = { ...card, id: this.lastNumericId.toString() };
    return this.post<ICard>('cards',newCard)
  }

  getCards(): Observable<ICard[]> {
    return this.get<ICard[]>('cards');
  }

  deleteCard(id: number): Observable<ICard> {
    return this.delete<ICard>(`cards/${id}`);
  }
  editCard(card: ICard): Observable<ICard> {
    return this.put<ICard>(`cards/${card.id}`, card);
  }
}
