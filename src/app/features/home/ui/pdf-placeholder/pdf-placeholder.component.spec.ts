import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfPlaceholderComponent } from './pdf-placeholder.component';

describe('PdfPlaceholderComponent', () => {
  let component: PdfPlaceholderComponent;
  let fixture: ComponentFixture<PdfPlaceholderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PdfPlaceholderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PdfPlaceholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
