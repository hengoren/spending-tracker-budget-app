import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the SearchPipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  /**
   * 
   */
  transform(items: any[], terms: string): any[] {
    if(!items) return [];
    if (!terms) return items;
    terms = terms.toLowerCase();
    return items.filter( it => {
    	return it.expense.toLowerCase().includes(terms) || it.recipient.toLowerCase().includes(terms) || it.description.toLowerCase().includes(terms) || it.category.toLowerCase().includes(terms)
    })
  }
}
