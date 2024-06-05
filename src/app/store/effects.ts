import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ClientService } from '../shared/services/client.service';
import { ActivatedRoute, Router } from '@angular/router';
import { deleteClient, getAllClients } from './action';
import { map, switchMap } from 'rxjs';
import { CardService } from '../shared/services/card.service';
import { pageRequest } from '../shared/interfaces/client.interface';

export const getAllClientEffect = createEffect(
  (actions$ = inject(Actions), clientService = inject(ClientService)) => {
    return actions$.pipe(
      ofType(getAllClients.getAllClientsAction),
      switchMap((val) => {
        return clientService.getClients(val.pageRequest).pipe(
          map((res) => {
            return getAllClients.getAllClientsSuccess({
              clients: res.data,
              items: res.items,
            });
          })
        );
      })
    );
  },
  { functional: true }
);

export const deleteClientEffect = createEffect(
  (
    actions$ = inject(Actions),
    cardService = inject(CardService),
    activatedRoute = inject(ActivatedRoute)
  ) => {
    return actions$.pipe(
      ofType(deleteClient.deleteClientAction),
      switchMap(({ id }) => {
        return cardService.deleteClient(id).pipe(
          map(() => {
            return deleteClient.deleteClientActionSuccess({ id });
          })
        );
      })
    );
  },
  { functional: true }
);
