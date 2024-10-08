import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ClientService } from '../shared/services/client.service';
import {
  addBonusCard,
  addClient,
  deleteBonusCard,
  deleteClient,
  editBonusCard,
  editClient,
  getAllClients,
  getBonusCards,
} from './action';
import { catchError, map, of, switchMap } from 'rxjs';
import { CardService } from '../shared/services/card.service';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { pageRequest } from '../shared/interfaces/client.interface';

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
    ngToastService = inject(NgToastService),
    clientService = inject(ClientService),

  ) => {
    return actions$.pipe(
      ofType(deleteClient.deleteClientAction),
      switchMap(({ id }) => {
        return cardService.deleteClient(id).pipe(
          map((res) => {
            console.log(res)

           const pagination: pageRequest = {
              page: 1,
              row: 10,
              search: '',
              sort: '',
            };

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

export const getBonusCardEffect = createEffect(
  (
    actions$ = inject(Actions),
    cardService = inject(CardService),
    ngToastService = inject(NgToastService)
  ) => {
    return actions$.pipe(
      ofType(getBonusCards.getBonusCardsAction),
      switchMap(() => {
        return cardService.getCards().pipe(
          map((res) => {
            return getBonusCards.getBonusCardsActionSuccess({
              bonusCards: res,
            });
          }),
          catchError((err) => {
            return of(getBonusCards.getBonusCardsActionFailure({ error: err }));
          })
        );
      })
    );
  },
  { functional: true }
);

export const addBonusCardEffect = createEffect(
  (
    actions$ = inject(Actions),
    cardService = inject(CardService),
    ngToastService = inject(NgToastService),
    dialog = inject(MatDialog)
  ) => {
    return actions$.pipe(
      ofType(addBonusCard.addBonusCardAction),
      switchMap(({ bonusCard }) => {
        return cardService.addCard(bonusCard).pipe(
          map((_) => {
            ngToastService.success({
              detail: 'Success Message',
              summary: 'Bonus card added successfully',
            });
            dialog.closeAll();
            return addBonusCard.addBonusCardActionSuccess({ bonusCard });
          }),
          catchError((err) => {
            return of(addBonusCard.addBonusCardActionFailure({ error: err }));
          })
        );
      })
    );
  },
  { functional: true }
);

export const editBonusCardEffect = createEffect(
  (
    actions$ = inject(Actions),
    cardService = inject(CardService),
    ngToastService = inject(NgToastService),
    dialog = inject(MatDialog)
  ) => {
    return actions$.pipe(
      ofType(editBonusCard.editBonusCardAction),
      switchMap(({ bonusCard }) => {
        return cardService.editCard(bonusCard).pipe(
          map((_) => {
            ngToastService.success({
              detail: 'Success Message',
              summary: 'Bonus card edited successfully',
            });
            dialog.closeAll();

            return editBonusCard.editBonusCardActionSuccess({ bonusCard });
          }),
          catchError((err) => {
            return of(editBonusCard.editBonusCardActionFailure({ error: err }));
          })
        );
      })
    );
  },
  { functional: true }
);

export const deleteBonusCardEffect = createEffect(
  (
    actions$ = inject(Actions),
    cardService = inject(CardService),
    ngToastService = inject(NgToastService)
  ) => {
    return actions$.pipe(
      ofType(deleteBonusCard.deleteBonusCardAction),
      switchMap(({ id }) => {
        return cardService.deleteCard(id).pipe(
          map(() => {
            ngToastService.success({
              detail: 'Success Message',
              summary: 'Bonus card deleted successfully',
            });
            return deleteBonusCard.deleteBonusCardActionSuccess({ id });
          }),
          catchError((err) => {
            return of(
              deleteBonusCard.deleteBonusCardActionFailure({ error: err })
            );
          })
        );
      })
    );
  },
  { functional: true }
);
