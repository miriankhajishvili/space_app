import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ClientService } from '../shared/services/client.service';
import { Router } from '@angular/router';
import { getAllClients } from './action';
import { map, switchMap } from 'rxjs';

export const getAllClientEffect = createEffect(
  (
    actions$ = inject(Actions),
    clientService = inject(ClientService),
    router = inject(Router)
  ) => {
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
