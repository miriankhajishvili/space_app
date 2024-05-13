import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { ClientService } from '../../shared/services/client.service';
import { catchError, map, of } from 'rxjs';

export const clientDetailResolver: ResolveFn<any> = (route, state) => {
  const idFromParam = route.params['id'];
  const userId = parseInt(idFromParam, 10);
  const clientService = inject(ClientService);
  const router = inject(Router);

  return clientService.getCurrentClient(userId).pipe(
    map((client) => {
      if (client) {
        return client;
      } else {
        router.navigate(['/clients']);
        return null;
      }
    }),
    catchError(() => {
      router.navigate(['/clients']);
      return of(null);
    })
  );
};
