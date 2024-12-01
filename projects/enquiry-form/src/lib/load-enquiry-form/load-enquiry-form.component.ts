import { Component, HostListener, OnInit } from '@angular/core';
import { EnquiryFormService } from '../../public-api';

@Component({
  selector: 'lib-load-enquiry-form',
  templateUrl: './load-enquiry-form.component.html',
  styleUrl: './load-enquiry-form.component.css'
})
export class LoadEnquiryFormComponent implements OnInit {
  constructor(
    public _enquirySerivce: EnquiryFormService
  ) {
    this.screenSize();
    window.addEventListener('resize', () => {
      this.screenSize();
    });
  }

  @HostListener('window:resize', ['$event'])
  screenSize(): void {
    this.screenWidth = window.innerWidth;
  }
  screenWidth: any;

  enquiryFormData: any;
  button: any;

  ngOnInit(): void {
    let baseUrl = 'https://dev-api.simpo.ai/'
    let templatetId = '1efa350d-5906-6ec1-85a9-690884166553'
    let url: any = baseUrl + `business/v3/website/${templatetId}/pages/list`;
    this._enquirySerivce.getWebsiteTemplate(url).subscribe(
      (res: any) => {
        res.data[0].components.forEach(element => {
          const sectionTypeFormatted = element.sectionType.split(' ').join('_').toLowerCase();
          if (sectionTypeFormatted === 'contact_us') {
            element?.content?.contactField?.fields.forEach((cf) => {
              cf.inputValue = '';
              cf.errorMessage = false
            });
            this.enquiryFormData = element;
            this.button = element.action.buttons[0]
          }
        });

        console.log(this.enquiryFormData)
      },
      (err) => {
        console.log(err);
      }
    )
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

  getWidthByField(field: any) {
    let width = this.screenWidth > 475 ? '48' : '100';
    let contactWidth = this.screenWidth > 475 ? '97' : '100'
    if (field.type == "address") {
      return ((this.enquiryFormData.content?.contactField.fields.filter((add) => add.type == "address").length ?? 1) % 2) ? contactWidth : width;
    }
    return field.type == "desc" ? contactWidth : width;
  }

  updatedForm() {
    let isValid = true;

    for (let item of this.enquiryFormData.content?.contactField?.fields) {
      if (item.required && (item.inputValue === '' || item.inputValue === null || item.inputValue === undefined)) {
        item.errorMessage = true;
        isValid = false; // Mark form as invalid but continue checking other fields
      } else {
        item.errorMessage = false;
      }
    }

    if (!isValid) {
      alert('Please fill in all required fields.');
      return false; // Stop here if validation fails
    }

    // If all fields are valid, proceed with the API call
    this.callApi();
    return true;

  }

  callApi() {
    console.log(this.enquiryFormData.content?.contactField?.fields)
  }
}
