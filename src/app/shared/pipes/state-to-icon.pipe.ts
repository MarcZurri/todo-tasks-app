import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stateToIconPipe',
})
export class StateToIconPipe implements PipeTransform {
  transform(value: Boolean): unknown {
    return value ? 'check' : 'flag';
  }
}
