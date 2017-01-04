import { Component, OnInit, ElementRef } from '@angular/core';
import * as marked from 'marked';

@Component({
  selector: 'markdown',
  template: `<ng-content></ng-content>`
})
export class MarkdownComponent {
  constructor(
    private el: ElementRef,
  ) { }

  ngAfterViewInit() {
    let content: string = this.el.nativeElement.innerHTML
    let parsed = marked.parse(content.trim());
    this.el.nativeElement.innerHTML = parsed;
  }
}
