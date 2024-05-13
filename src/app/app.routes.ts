import { Routes } from '@angular/router';
import { ClientComponent } from './pages/client/client.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'clients',
    pathMatch: 'full',
  },
  {
    path: 'clients',
    loadComponent: () =>
      import('./pages/client/client.component').then((m) => m.ClientComponent),
  },
  {
    path: 'add-client',
    loadComponent: () =>
      import('./pages/add-client/add-client.component').then(
        (m) => m.AddClientComponent
      ),
  },
  {
    path: 'edit-client/:id',
    loadComponent: () =>
      import('./pages/add-client/add-client.component').then(
        (m) => m.AddClientComponent
      ),
  },
  {
    path: 'client-detail/:id',
    loadComponent: () =>
      import('./pages/client-detail/client-detail.component').then(
        (m) => m.ClientDetailComponent
      ),
  },
  {
    path: '**',
    component: ClientComponent,
  },
];
