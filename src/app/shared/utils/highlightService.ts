import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HighlightService {
  private renderer: Renderer2;

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  addHighlightEffect(element: HTMLElement) {
    this.renderer.listen(element, 'mouseenter', () => {
      this.renderer.addClass(element, 'highlight-effect');
    });
    this.renderer.listen(element, 'mouseleave', () => {
      this.renderer.removeClass(element, 'highlight-effect');
    });
  }
}
