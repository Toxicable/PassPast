import { Component, OnInit, ElementRef, Input, Renderer, ChangeDetectionStrategy , ViewEncapsulation, ViewChild} from '@angular/core';
import * as marked from 'marked';

@Component({
  selector: 'markdown',
  template: `<span class="markdown-content"><span #contentPlaceholder></span></span>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['markdown.component.css']
})
export class MarkdownComponent {
  constructor(
  ) { }

  @ViewChild('contentPlaceholder') contentPlaceholder: ElementRef;

  @Input() set content(content: string){
    const parsed = marked.parse(content.trim());
    this.contentPlaceholder.nativeElement.innerHTML = parsed;
  }
}
