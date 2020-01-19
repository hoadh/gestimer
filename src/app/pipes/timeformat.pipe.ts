import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeformat'
})
export class TimeformatPipe implements PipeTransform {

  transform(value: number, ...args: any[]): any {
    const hour = Math.floor(value / 3600);
    const minute = Math.floor((value - (hour * 3600)) / 60);
    const second = value - (hour * 3600) - (minute * 60);
    return `${hour}h ${minute}m ${second}s`;
  }

}
