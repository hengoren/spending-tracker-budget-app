import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the SortPipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'sort',
})
export class SortPipe implements PipeTransform {
  /**
   * 
   */
  transform(array: any[], args?: any) : any[] {
    return array.sort(function(a, b) {
    	if (a[args.property] < b[args.property]) {
    		return -1 * args.order;
    	}
    	else if ( a[args.property] > b[args.property]) {
    		return 1 * args.order;
    	}
    	else {
    		return 0;
    	}
    });
  }
}
