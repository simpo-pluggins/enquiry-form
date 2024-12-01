import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';
import { EventsService } from '../services/events.service';
import { ButtonStyleModel } from '../styles/style.model';
import { BUTTON_SHAPE, BUTTON_TYPE } from '../styles/types';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[simpoButtonDirective]',
  standalone: true
})
export class ButtonDirectiveDirective implements OnChanges {
  @Input() buttonStyle?: ButtonStyleModel;
  @Input() color?: string;
  @Input() scrollValue?: number = 0;

  constructor(private el: ElementRef,
    private eventService: EventsService) {
      this.buttonStyleChangeCheck()
    }


  ngOnChanges() {
    this.applyButtonStyleChanges();
  }

  ngOnDestroy() {
    this.buttonStyleSubscription?.unsubscribe()
  }

  applyButtonStyleChanges() {
    if (this.buttonStyle?.type) {
      this.applyButtonType(this.buttonStyle, this.color ? this.color : '#ffffff');
    }
    if (this.buttonStyle?.shape) {
      this.applyButtonShape(this.buttonStyle);
    }
  }

  applyButtonType(style: ButtonStyleModel, color: string) {
    if (style?.type === ('Solid' as BUTTON_TYPE)) {
      this.el.nativeElement.style.setProperty('background', color);
      this.el.nativeElement.style.setProperty('color', this.getTextColor(color));
      this.el.nativeElement.style.setProperty('border', `2px solid ${color} `);
    } else {
      this.el.nativeElement.style.setProperty('border', `2px solid ${color}`);
      this.el.nativeElement.style.setProperty('background', 'transparent');
      this.el.nativeElement.style.setProperty('color', color);
      if (this.scrollValue) {
        this.el.nativeElement.style.setProperty('background', "transparent");
        this.el.nativeElement.style.setProperty('color', this.getTextColor(color));
        this.el.nativeElement.style.setProperty('border', `2px solid ${this.getTextColor(color)} `);
      }
    }
  }

  applyButtonShape(style: ButtonStyleModel) {
    if (style?.shape === ('Round' as BUTTON_SHAPE)) {
      this.el.nativeElement.style.setProperty('border-radius', '5px');
    } else {
      this.el.nativeElement.style.setProperty('border-radius', '0px');
    }
  }

  getTextColor(bgColor: string) {
    if (bgColor) {
      const threshold = 130; // Adjust this threshold as needed
      const r = parseInt(bgColor.slice(1, 3), 16);
      const g = parseInt(bgColor.slice(3, 5), 16);
      const b = parseInt(bgColor.slice(5, 7), 16);
      const brightness = (r * 299 + g * 587 + b * 114) / 1000;

      return brightness > threshold ? '#000000' : '#ffffff';
    }
    return "#ffffff;"
  }

  buttonStyleSubscription?: Subscription;
  buttonStyleChangeCheck() {
    this.buttonStyleSubscription = this.eventService.buttonStyleChangeChecks.subscribe((res: any) => {
      this.changeButtonStyle(res.id, res.buttonStyle, res.color);
    })
  }

  changeButtonStyle(id: any, style: ButtonStyleModel, bgColor: string) {
    if (this.el.nativeElement.id === id) {
      if (style?.type) {
        this.applyButtonType(style, bgColor ? bgColor : '#ffffff');
      }
      if (style?.shape) {
        this.applyButtonShape(style);
      }
    }
  }
}
