import { createActionGroup, props } from '@ngrx/store';
import { IClient, pageRequest } from '../shared/interfaces/client.interface';

export const getAllClients = createActionGroup({
  source: 'getAllClients',
  events: {
    getAllClientsAction: props<{ pageRequest: pageRequest }>(),
    getAllClientsSuccess: props<{
      clients: IClient[];
      items: number;
    }>(),
  },
});


export const addClient = createActionGroup({
  source: 'addClient',
  events: {
    addClientAction: props<{ data: IClient }>(),
    addClientActionSuccess: props<{ data: IClient }>(),
  },
})

export const deleteClient = createActionGroup({
  source: 'deleteClient',
  events: {
    deleteClientAction: props<{ id: number }>(),
    deleteClientActionSuccess: props<{ id: number }>(),
  },
});
