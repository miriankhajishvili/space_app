import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ClientService } from '../shared/services/client.service';
import { addClient, deleteClient, editClient, getAllClients } from './action';
import { catchError, map, of, switchMap } from 'rxjs';
import { CardService } from '../shared/services/card.service';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';

export const getAllClientEffect = createEffect(
  (
    actions$ = inject(Actions),
    clientService = inject(ClientService),
    ngToastService = inject(NgToastService)
  ) => {
    return actions$.pipe(
      ofType(getAllClients.getAllClientsAction),
      switchMap(({ pageRequest }) => {
        return clientService.getClients(pageRequest).pipe(
          map((res) => {
            return getAllClients.getAllClientsSuccess({
              clients: res.data,
              items: res.items,
            });
          }),
          catchError((err) => {
            ngToastService.error({
              detail: 'Error Message',
              summary: err.error.message,
            });
            return of(editClient.editClientActionFailure({ error: err }));
          })
        );
      })
    );
  },
  { functional: true }
);

export const addClientEffect = createEffect(
  (
    actions$ = inject(Actions),
    clientService = inject(ClientService),
    ngToastService = inject(NgToastService),
    router = inject(Router)
  ) => {
    return actions$.pipe(
      ofType(addClient.addClientAction),
      switchMap(({ data }) => {
        return clientService.addClient(data).pipe(
          map((_) => {
            router.navigate(['/clients']);
            ngToastService.success({
              detail: 'Success Message',
              summary: 'User added successfully',
            });
            return addClient.addClientActionSuccess({ data });
          }),
          catchError((err) => {
            ngToastService.error({
              detail: 'Error Message',
              summary: err.error.message,
            });
            return of(addClient.addClientActionFailure({ error: err }));
          })
        );
      })
    );
  },
  { functional: true }
);

export const editClientEffect = createEffect(
  (
    actions$ = inject(Actions),
    clientService = inject(ClientService),
    ngToastService = inject(NgToastService),
    router = inject(Router)
  ) => {
    return actions$.pipe(
      ofType(editClient.editClientAction),
      switchMap((data) => {
        console.log(data, 'data');
        return clientService.editClient(data.id, data.data).pipe(
          map((_) => {
            router.navigate(['/clients']);
            ngToastService.success({
              detail: 'Success Message',
              summary: 'User Edited successfully',
            });
            return addClient.addClientActionSuccess(data);
          }),
          catchError((err) => {
            ngToastService.error({
              detail: 'Error Message',
              summary: err.error.message,
            });
            return of(editClient.editClientActionFailure({ error: err }));
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
    ngToastService = inject(NgToastService)
  ) => {
    return actions$.pipe(
      ofType(deleteClient.deleteClientAction),
      switchMap(({ id }) => {
        return cardService.deleteClient(id).pipe(
          map(() => {
            ngToastService.success({
              detail: 'Success Message',
              summary: 'User deleted successfully',
            });
            return deleteClient.deleteClientActionSuccess({ id });
          }),
          catchError((err) => {
            return of(deleteClient.deleteClientActionFailure({ error: err }));
          })
        );
      })
    );
  },
  { functional: true }
);
