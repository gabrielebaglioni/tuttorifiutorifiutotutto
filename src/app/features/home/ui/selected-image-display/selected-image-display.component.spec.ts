import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedImageDisplayComponent } from './selected-image-display.component';

describe('SelectedImageDisplayComponent', () => {
  let component: SelectedImageDisplayComponent;
  let fixture: ComponentFixture<SelectedImageDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectedImageDisplayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SelectedImageDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
