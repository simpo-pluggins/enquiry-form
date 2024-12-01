import { Directive, ElementRef, Input, OnChanges } from '@angular/core';
import { EventsService } from '../services/events.service';

export enum SPACING {
  none = '1.5rem',
  small = '3rem',
  medium = '5rem',
  large = '6rem',
  remove = '0rem'
}
@Directive({
  selector: '[simpoContentTitleSpace]',
  standalone: true,
})
export class ContentTitleDirective implements OnChanges {
  @Input('simpoContentTitleSpace') spacing?: SPACING;

  constructor(
    private el: ElementRef,
    private eventService : EventsService
    ) {
    }

  ngOnChanges(): void {
    
    this.applyStyle();
  }
  applyStyle() {
    this.el?.nativeElement?.style?.setProperty("margin-bottom", this.getSpacing);
  }

  get getSpacing() {
    
    switch(this.spacing) {
        case 'small' as SPACING:
            return SPACING.small;
        case 'large' as SPACING:
            return SPACING.large;
        case 'medium' as SPACING:
            return SPACING.medium;
        case 'remove' as SPACING:
            return SPACING.remove;
        default:
            return SPACING.none;
    }
  }
}
