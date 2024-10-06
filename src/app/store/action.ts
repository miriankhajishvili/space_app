import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IClient, pageRequest } from '../shared/interfaces/client.interface';

export const getAllClients = createActionGroup({
  source: 'getAllClients',
  events: {
    getAllClientsAction: props<{ pageRequest: pageRequest }>(),
    getAllClientsSuccess: props<{
      clients: IClient[];
      items: number;
    }>(),
    getAllClientsFailure: props<{ error: string }>(),
  },
});

export const addClient = createActionGroup({
  source: 'addClient',
  events: {
    addClientAction: props<{ data: IClient }>(),
    addClientActionSuccess: props<{ data: IClient }>(),
    addClientActionFailure: props<{ error: string }>(),
  },
});

export const editClient = createActionGroup({
  source: 'editClient',
  events: {
    editClientAction: props<{ id: number | undefined; data: IClient }>(),
    editClientActionSuccess: props<{ id: number | undefined; data: IClient }>(),
    editClientActionFailure: props<{ error: string }>(),
  },
});

export const deleteClient = createActionGroup({
  source: 'deleteClient',
  events: {
    deleteClientAction: props<{ id: number }>(),
    deleteClientActionSuccess: props<{ id: number }>(),
    deleteClientActionFailure: props<{ error: string }>(),
  },
});

export const getBonusCards = createActionGroup({
  source: 'getBonusCards',
  events: {
    getBonusCardsAction: emptyProps(),
    getBonusCardsActionSuccess: props<{ bonusCards: any }>(),
    getBonusCardsActionFailure: props<{ error: string }>(),
  },
});

export const addBonusCard = createActionGroup({
  source: 'addBonusCard',
  events: {
    addBonusCardAction: props<{ bonusCard: any }>(),
    addBonusCardActionSuccess: props<{ bonusCard: any }>(),
    addBonusCardActionFailure: props<{ error: string }>(),
  },
});
