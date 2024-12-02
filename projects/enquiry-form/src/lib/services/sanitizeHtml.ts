import { Pipe, PipeTransform } from "@angular/core";
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'sanitizeHtml',
  standalone: true
})
export class SanitizeHtmlPipe implements PipeTransform {

  constructor(private _sanitizer:DomSanitizer) {
  }

  transform(v:string):SafeHtml {
    if (!v) {
      return '';  // Return an empty string if value is null, undefined, or empty
    }
    return this._sanitizer.bypassSecurityTrustHtml(v);
  }
}
