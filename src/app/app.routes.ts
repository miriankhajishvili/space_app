import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/client/client.component').then((m) => m.ClientComponent),
  },
  {
    path:'add-client',
    loadComponent: () => import('./pages/add-client/add-client.component').then((m)=> m.AddClientComponent)
  }
];
