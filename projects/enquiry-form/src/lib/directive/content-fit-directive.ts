import { Directive, ElementRef, Input, OnChanges, OnInit } from '@angular/core';
import { fitContent, fitScreen, applySpacing } from '../styles/index';
import { LayOutModel } from '../styles/style.model';
import { EventsService } from '../services/events.service';

@Directive({
  selector: '[simpoLayout]',
  standalone: true,
})
export class ContentFitDirective implements OnInit, OnChanges {
  @Input('simpoLayout') layout?: LayOutModel;

  constructor(private el: ElementRef,
    private eventService : EventsService) {
      this.eventService.alignmentChangeChecks.subscribe(
        (res:any) =>{
         if(res.id === this.el.nativeElement.id){
          this.el.nativeElement.style.setProperty('text-align', res.data?.align);
         }
        }
      );

      this.eventService.spacingChangeChecks.subscribe(
        (res:any) => {
          if(res.id === this.el.nativeElement.id){
            this.layout = res.data;
            if (this.layout?.fit === 'content') {
              this.el.nativeElement.style.removeProperty('min-height')
              fitContent(this.el.nativeElement);
            } else if(this.layout?.fit === 'screen') {
              this.el.nativeElement.style.removeProperty('height')
              fitScreen(this.el.nativeElement);
            }
            applySpacing(this.el.nativeElement,res.data.spacing)
          }
        }
      )
    }

  ngOnInit(): void {
    this.appply();
  }

  ngOnChanges(): void {
    this.appply();
  }

  appply() {
    if (this.layout?.fit === 'content') {
      fitContent(this.el.nativeElement);
    } else if(this.layout?.fit === 'screen') {
      fitScreen(this.el.nativeElement);
    }
    applySpacing(this.el.nativeElement, this.layout?.spacing);
    this.el.nativeElement.style.setProperty('text-align', this.layout?.align);
  }
}
