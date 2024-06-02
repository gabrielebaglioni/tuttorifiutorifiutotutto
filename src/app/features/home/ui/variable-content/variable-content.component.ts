import { Component, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { CommonModule } from "@angular/common";
import { SubscriberComponent } from "../../../../shared/components/subscriber/subscriber.component";
import { HighlightService } from "../../../../shared/utils/highlightService";

@Component({
  selector: 'app-variable-content',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './variable-content.component.html',
  styleUrls: ['./variable-content.component.css']
})
export class VariableContentComponent extends SubscriberComponent implements AfterViewInit {
  @ViewChild('highlightText') highlightText!: ElementRef;
  @ViewChild('highlightText2') highlightText2!: ElementRef;
  @ViewChild('highlightText3') highlightText3!: ElementRef;
  @ViewChild('highlightText4') highlightText4!: ElementRef;
  @ViewChild('highlightText5') highlightText5!: ElementRef;

  constructor(private highlightService: HighlightService) {
    super();
  }

  ngAfterViewInit() {
    this.highlightService.addHighlightEffect(this.highlightText.nativeElement);
    this.highlightService.addHighlightEffect(this.highlightText2.nativeElement);
    this.highlightService.addHighlightEffect(this.highlightText3.nativeElement);
    this.highlightService.addHighlightEffect(this.highlightText4.nativeElement);
    this.highlightService.addHighlightEffect(this.highlightText5.nativeElement);

  }
}
