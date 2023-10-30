import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any[], searchVal: string): any[] {

    if (!value) return [];
    if (!searchVal) return value;

    return value.filter(e => {
      let fname = e.fname.toLowerCase().startsWith(searchVal.toLowerCase())
      let notice = e.noticPeriod.toLowerCase().startsWith(searchVal.toLowerCase())
      return fname || notice
    });

  }
}
