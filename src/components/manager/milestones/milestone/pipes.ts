import { Pipe, PipeTransform } from '@angular/core';
import { UI } from 'junte-ui';
import { TicketStates } from 'src/models/enums/ticket';

@Pipe({name: 'ticketStateColor'})
export class TicketStateColorPipe implements PipeTransform {
  transform(state: TicketStates): string {
    switch (state) {
      case TicketStates.created:
        return UI.color.purple;
      case TicketStates.planning:
        return UI.color.red;
      case TicketStates.doing:
        return UI.color.blue;
      case TicketStates.testing:
        return UI.color.yellow;
      case TicketStates.accepting:
        return UI.color.gray;
      default:
        return UI.color.green;
    }
  }
}
