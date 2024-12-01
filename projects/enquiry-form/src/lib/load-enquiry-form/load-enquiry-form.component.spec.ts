import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadEnquiryFormComponent } from './load-enquiry-form.component';

describe('LoadEnquiryFormComponent', () => {
  let component: LoadEnquiryFormComponent;
  let fixture: ComponentFixture<LoadEnquiryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoadEnquiryFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoadEnquiryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
