import { createFeature, createReducer, on } from '@ngrx/store';
import { IClientState } from '../shared/interfaces/client.interface';
import { addClient, deleteClient, editClient, getAllClients } from './action';

const initialState: IClientState = {
  clients: [],
  items: 0,
};

const clients = createFeature({
  name: 'clients',
  reducer: createReducer(
    initialState,

    on(getAllClients.getAllClientsAction, (state) => ({ ...state })),
    on(getAllClients.getAllClientsSuccess, (state, action) => ({
      ...state,
      clients: action.clients,
      items: action.items,
    })),

    on(editClient.editClientAction, (state, action) => {
      const upladtedClients = state.clients.map((clients) => {
        if (clients.id === action.id) {
          return action.data;
        }
        return clients;
      });
      return { ...state, clients: upladtedClients };  
    }),

    on(deleteClient.deleteClientAction, (state, action) => {
      const upladtedClients = state.clients.filter(
        (clients) => clients.id !== action.id
      );
      return { ...state, clients: upladtedClients };
    }),

    on(addClient.addClientAction, (state, action) => {
      const upladtedClients = [...state.clients, action.data];
      return { ...state, clients: upladtedClients };
    })
  ),
});

export const {
  name: clientsFeatureKey,
  reducer: clientsReducer,
  selectClients,
  selectItems,
} = clients;
