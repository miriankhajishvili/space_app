import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable, forkJoin, mergeMap } from 'rxjs';
import { ICard } from '../interfaces/card.interface';
import { IClient } from '../interfaces/client.interface';

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

  deleteClient(id: number): Observable<IClient> {
    return this.getCards().pipe(
      mergeMap(cards => {
        const clientCards = cards.filter(card => card.userID === id);
        const deleteRequests: Observable<ICard>[] = [];
        clientCards.forEach(card => {
          deleteRequests.push(this.deleteCard(card.id));
        });
        if (deleteRequests.length === 0) {
          return this.delete<IClient>(`clients/${id}`);
        } else {
          return forkJoin(deleteRequests).pipe(
            mergeMap(() => this.delete<IClient>(`clients/${id}`))
          );
        }
      })
    );
  }
  deleteCard(id: number | undefined): Observable<ICard> {
    return this.delete<ICard>(`cards/${id}`);
  }


  

  editCard(card: ICard): Observable<ICard> {
    return this.put<ICard>(`cards/${card.id}`, card);
  }
}
