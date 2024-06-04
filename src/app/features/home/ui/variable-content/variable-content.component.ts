import { Component, ElementRef, AfterViewInit, ViewChildren, QueryList } from '@angular/core';
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
  @ViewChildren('highlightText') highlightTexts!: QueryList<ElementRef>;

  constructor(private highlightService: HighlightService) {
    super();
  }

  ngAfterViewInit() {
    this.highlightTexts.forEach(highlightText => {
      this.highlightService.addHighlightEffect(highlightText.nativeElement);
    });
  }
}
