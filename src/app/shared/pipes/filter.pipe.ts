import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any[], searchVal: string): any[] {


    if (!value) {
      return []
    }

    if (!searchVal) {
      return value
    }


    let filterarr = value.filter(e => {
      return e.fname.toLowerCase().startsWith(searchVal.toLowerCase())
    });

    return filterarr

  }

}
