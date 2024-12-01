import { Directive, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from "@angular/core";
import { OverlayValue } from "../styles/index";

@Directive({
    selector: '[simpoBlurContent]',
    standalone: true,
})
export class SimpoBlurContentDirective implements OnChanges, OnInit, OnDestroy {

    @Input("simpoBlurContent") simpoBlurContent?: keyof typeof OverlayValue;
    constructor(
        private el: ElementRef
    ) {}

    ngOnChanges(changes: SimpleChanges): void {
        if (this.simpoBlurContent)
            this.el.nativeElement.style.setProperty('filter', 'blur('+ this.getOverlayValue +')');
    }
    ngOnDestroy(): void {

    }
    ngOnInit(): void {

    }

    get getOverlayValue() {
        switch(this.simpoBlurContent) {
            case "LIGHT":
                return OverlayValue.LIGHT;
            case "MODERATE":
                return OverlayValue.MODERATE;
            case "NONE":
                return OverlayValue.NONE;
            case "STRONG":
                return OverlayValue.STRONG;
            case "VERY_STRONG":
                return OverlayValue.VERY_STRONG;
            default:
                return OverlayValue.LIGHT;
        }
    }
}
