import { Routes } from '@angular/router';
import { ClientComponent } from './pages/clients-list/clients-list.component';
import { clientDetailResolver } from './core/resolver/client-detail.resolver';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'clients',
    pathMatch: 'full',
  },
  {
    path: 'clients',
    loadComponent: () =>
      import('./pages/clients-list/clients-list.component').then((m) => m.ClientComponent),
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
    resolve: { client: clientDetailResolver },
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
