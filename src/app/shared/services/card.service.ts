import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';
import { ICard } from '../interfaces/card.interface';

@Injectable({
  providedIn: 'root',
})
export class CardService extends BaseService {
  lastNumericId: number = 0;
  private readonly localStorageKey = 'cardLastNumericId';


  addCard(card: ICard): Observable<ICard> {
    const storedId = localStorage.getItem(this.localStorageKey);
    if (storedId) {
      this.lastNumericId = parseInt(storedId, 10);
    }
    this.lastNumericId++
    localStorage.setItem(this.localStorageKey, this.lastNumericId.toString())
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
