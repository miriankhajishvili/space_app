import { createFeature, createReducer, on } from '@ngrx/store';
import { IClientState } from '../shared/interfaces/client.interface';
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
import { get } from 'http';

const initialState: IClientState = {
  clients: [],
  items: 0,
  bonusCards: [],
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
    }),

    on(addBonusCard.addBonusCardAction, (state, action) => {
      const upladtedBonusCards = [...state.bonusCards, action.bonusCard];
      return { ...state, bonusCards: upladtedBonusCards };
    }),

    on(getBonusCards.getBonusCardsAction, (state) => ({ ...state })),
    on(getBonusCards.getBonusCardsActionSuccess, (state, action) => ({
      ...state,
      bonusCards: action.bonusCards,
    })),

    on(deleteBonusCard.deleteBonusCardAction, (state, action) => {
      const upladtedBonusCards = state.bonusCards.filter(
        (bonusCard) => bonusCard.id !== action.id
      );
      return { ...state, bonusCards: upladtedBonusCards };
    }),
    on(editBonusCard.editBonusCardAction, (state, action) => {
      const upladtedBonusCards = state.bonusCards.map((bonusCard) => {
        if (bonusCard.id === action.bonusCard.id) {
          return action.bonusCard;
        }
        return bonusCard;
      });
      return { ...state, bonusCards: upladtedBonusCards };  
    })
  ),
});

export const {
  name: clientsFeatureKey,
  reducer: clientsReducer,
  selectClients,
  selectItems,
  selectBonusCards,
} = clients;
