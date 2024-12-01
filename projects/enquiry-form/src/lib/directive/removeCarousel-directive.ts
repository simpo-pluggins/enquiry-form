import {
    Directive,
    ElementRef,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Renderer2,
} from '@angular/core';
import { animation } from '../styles/index';
import { EventsService } from '../services/events.service';
@Directive({
    selector: '[simpoCarouselRemove]',
    standalone: true,
})
export class RemoveCarouselDirective implements OnChanges, OnInit, OnDestroy {
    @Input('simpoCarouselRemove') carouselRemove?: any;
    @Input() currentIndex?: number;
    eventServiceSubscription: any;
    private observer: IntersectionObserver | undefined;

    animationSpeed = animation
    constructor(
        private el: ElementRef,
        private renderer: Renderer2,
        private eventService: EventsService
    ) {
        //   this.eventServiceSubscription = this.eventService.animationChangeChecks.subscribe(
        //     (res:any) => {
        //       if(this.el.nativeElement.id === res.id){
        //         this.animationData = res.data
        //         this.applyAnimation();
        //       }
        //     }
        //   )
    }
    ngOnDestroy(): void {
        if (this.observer) {
            this.observer.disconnect();
        }
        if (this.eventServiceSubscription) {
            this.eventServiceSubscription.unsubscribe();
        }
    }
    ngOnInit(): void {
    }

    ngOnChanges(): void {
        if(this.carouselRemove){
            console.log(this.carouselRemove)
        }
        // if (changes['carouselRemove']) {
            // this.eventServiceSubscription = this.eventService.stopCarouselEvent.subscribe((res: any) => {
            //   if (res.stopCarousel) {
            //     this.stopCarousel(res);
            //   }
            // });
        //   }
    }

    private stopCarousel(res:any): void {
        // Ensure the carousel is not auto-playing
        // this.renderer.setAttribute(this.el.nativeElement, 'data-interval', 'false');
        
        // // Optionally, you can also remove the `data-ride` attribute to completely stop carousel functionality
        this.renderer.setAttribute(this.el.nativeElement, 'data-interval','100000');
    
        // Update carousel items to ensure the correct item is marked as active
        const carouselItems = this.el.nativeElement.querySelectorAll('.carousel-item');
        carouselItems.forEach((item: HTMLElement, index: number) => {
          if (index === res.activeItem) {
            item.classList.add('active');
          } else {
            item.classList.remove('active');
          }
        });
      }
}
