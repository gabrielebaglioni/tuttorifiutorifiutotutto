import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pdf-placeholder',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pdf-placeholder.component.html',
  styleUrls: ['./pdf-placeholder.component.css']
})
export class PdfPlaceholderComponent {
  @Input() pdfUrl!: string;

  openPdf() {
    window.open(this.pdfUrl, '_blank');
  }
}
