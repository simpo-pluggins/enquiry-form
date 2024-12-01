import { Directive, ElementRef, Input, OnChanges, input } from '@angular/core';
import { EventsService } from '../services/events.service';
import { ImageFit, ImageRatio } from '../styles';
import { ImageStyle } from '../styles/style.model';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[simpoImageContainerDirective]',
  standalone: true
})
export class ImageContainerDirective implements OnChanges{
  @Input() simpoImageContainerDirective?: ImageStyle;

  constructor(private el: ElementRef,
    private eventService: EventsService) {
    this.imageStyleChangeCheck();
  }


  ngOnInit() {

  }

  ngOnChanges(){

    let imageRatio: any = [];
    if (this.simpoImageContainerDirective) {
      if (this.simpoImageContainerDirective.ratio === ImageRatio.SQUARE ||
          this.simpoImageContainerDirective.ratio === ImageRatio.LANDSCAPE ||
          this.simpoImageContainerDirective.ratio === ImageRatio.PORTRAIT ||
          this.simpoImageContainerDirective.ratio === ImageRatio.WIDESCREEN) {

        imageRatio = this.simpoImageContainerDirective.ratio.split(":");
      }
      this.el.nativeElement.style.setProperty('aspect-ratio', imageRatio[0] + '/' + imageRatio[1])
    }

  }

  ngOnDestroy() {
    if (this.imageStyleSubscription) {
      this.imageStyleSubscription.unsubscribe()
    }
  }

  imageStyleSubscription?: Subscription;
  imageStyleChangeCheck() {
    this.imageStyleSubscription = this.eventService.imageStyleChangeChecks.subscribe((res: any) => {
      this.changeImageStyle(res.id, res.style);
    })
  }

  changeImageStyle(id: string, style: ImageStyle) {
    if (this.el.nativeElement.id === id) {

      let imageRatio: any = [];
      if (style?.ratio === ImageRatio.SQUARE) {
        imageRatio = ImageRatio.SQUARE.split(":");
      }
      if (style?.ratio === ImageRatio.LANDSCAPE) {
        imageRatio = ImageRatio.LANDSCAPE.split(":");
      }
      if (style?.ratio === ImageRatio.PORTRAIT) {
        imageRatio = ImageRatio.PORTRAIT.split(":");
      }
      if (style?.ratio === ImageRatio.WIDESCREEN) {
        imageRatio = ImageRatio.WIDESCREEN.split(":");
      }
      this.el.nativeElement.style.setProperty('aspect-ratio', imageRatio[0] + '/' + imageRatio[1])
    }
  }
}
