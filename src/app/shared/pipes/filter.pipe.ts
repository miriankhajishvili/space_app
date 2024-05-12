import { Pipe, PipeTransform } from '@angular/core';
import { filter } from 'rxjs';

@Pipe({
  name: 'filter',
  standalone: true
})
export class FilterPipe implements PipeTransform {

  transform(value: any, filterString: string)  {
   if (value.length === 0 || filterString === ''){
    return value
   } else {
    const clients = []

    for (const client of value)
      if(client['firstname'] === filterString){
        clients.push(client)
      }else {
        return clients
      }
   }
  }

}
