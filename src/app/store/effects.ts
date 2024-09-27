import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ClientService } from '../shared/services/client.service';
import { addClient, deleteClient, getAllClients } from './action';
import { map, switchMap } from 'rxjs';
import { CardService } from '../shared/services/card.service';

export const getAllClientEffect = createEffect(
  (actions$ = inject(Actions), clientService = inject(ClientService)) => {
    return actions$.pipe(
      ofType(getAllClients.getAllClientsAction),
      switchMap(({ pageRequest }) => {
        return clientService.getClients(pageRequest).pipe(
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


export const addClientEffect = createEffect(
  (actions$ = inject(Actions), clientService = inject(ClientService)) => {
    return actions$.pipe(
      ofType(addClient.addClientAction),
      switchMap(({ data }) => {
        return clientService.addClient(data).pipe(
          map((res) => {
            console.log(res)
            return addClient.addClientActionSuccess({ data });
          })
        );
      })
    );
  },
  { functional: true }  
)


export const deleteClientEffect = createEffect(
  (actions$ = inject(Actions), cardService = inject(CardService)) => {
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
