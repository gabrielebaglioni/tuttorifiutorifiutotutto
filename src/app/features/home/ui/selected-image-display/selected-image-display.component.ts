import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ChangeDetectorRef, computed, effect, inject, Injector, runInInjectionContext, signal } from '@angular/core';
import { AsyncPipe, CommonModule, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { VariableContentComponent } from '../variable-content/variable-content.component';
import { FaIconComponent, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { PdfPlaceholderComponent } from '../pdf-placeholder/pdf-placeholder.component';

@Component({
  selector: 'app-selected-image-display',
  standalone: true,
  imports: [
    AsyncPipe,
    NgSwitch,
    NgSwitchCase,
    NgSwitchDefault,
    VariableContentComponent,
    CommonModule,
    FaIconComponent,
    PdfPlaceholderComponent
  ],
  templateUrl: './selected-image-display.component.html',
  styleUrls: ['./selected-image-display.component.css']
})
export class SelectedImageDisplayComponent {
  @ViewChild('highlightText') highlightText!: ElementRef;
  


  constructor() {
    
  }

 

  ngOnInit(): void {}

 
}
