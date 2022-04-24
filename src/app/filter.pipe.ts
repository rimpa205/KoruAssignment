import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!value || !args) {
      return value;
    }
    return value.filter((item: { name: string; description: string; webReference: string; }) =>{

     item.name.toLowerCase().indexOf(args) !== -1
     ||
     item.description.toLowerCase().indexOf(args) !== -1
     ||
     item.webReference.toLowerCase().indexOf(args) !== -1
    });
  }

}
