import { createFeature, createReducer, on } from '@ngrx/store';
import { IClientState } from '../shared/interfaces/client.interface';
import { getAllClients } from './action';

const initialState: IClientState = {
  clients: [],
  items : 0
};

const clients = createFeature({
  name: 'getAllClients',
  reducer: createReducer(
    initialState,

    on(getAllClients.getAllClientsAction, (state) => ({ ...state })),
    on(getAllClients.getAllClientsSuccess, (state, action) => ({
      ...state,
      clients: action.clients,
      items: action.items
  
    }))
  ),
});

export const {
  name: clientsFeatureKey,
  reducer: clientsReducer,
  selectClients,
  selectItems
} = clients;
