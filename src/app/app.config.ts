import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { clientsReducer } from './store/reducer';
import { provideEffects } from '@ngrx/effects';
import * as getAllClientEffect from './store/effects';
import * as deleteClientEffect from './store/effects';
import * as addBonusCardEffect from './store/effects';
import * as deleteBonusCardEffect from './store/effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideAnimations(),
    provideHttpClient(),
    provideAnimationsAsync(),
    provideEffects(
      getAllClientEffect,
      deleteClientEffect,
      addBonusCardEffect,
      deleteBonusCardEffect
    ),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode,
      autoPause: true,
      trace: false,
      traceLimit: 75,
    }),
    provideStore(),
    provideState({ name: 'clients', reducer: clientsReducer }),
  ],
};
