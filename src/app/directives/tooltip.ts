import { DestroyRef, Directive, ElementRef, inject, input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appTooltip]',
  host: {
    '(mouseenter)': 'onMouseEnter()',
    '(mouseleave)': 'onMouseLeave()',
    '(apptooltip-active)': 'onDescendantTooltipActive($event)',
  },
})
export class Tooltip {
  public readonly appTooltip = input<string>('');
  public readonly placement = input<string>('bottom');
  public readonly delay = input<number>(100);
  private tooltip: HTMLElement | null = null;
  private readonly offset = 10;
  private readonly renderer = inject(Renderer2);
  private readonly el = inject(ElementRef);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    this.destroyRef.onDestroy(() => {
      this.tooltip?.remove();
    });
  }

  onMouseEnter() {
    if (!this.tooltip) {
      this.show();
    }

    this.el.nativeElement.dispatchEvent(new CustomEvent('apptooltip-active', { bubbles: true }));
  }

  onMouseLeave() {
    if (this.tooltip) {
      this.hide();
    }
  }

  onDescendantTooltipActive(event: Event) {
    if (event.target !== this.el.nativeElement && this.tooltip) {
      this.tooltip.remove();
      this.tooltip = null;
    }
  }

  private show() {
    this.create();
    this.setPosition();
    this.tooltip?.classList.add('ng-tooltip-show');
  }

  private hide() {
    this.tooltip?.classList.remove('ng-tooltip-show');
    window.setTimeout(() => {
      this.tooltip?.remove();
      this.tooltip = null;
    }, this.delay());
  }

  private create() {
    const tooltip: HTMLElement = this.renderer.createElement('span');
    tooltip.classList.add('ng-tooltip');
    tooltip.textContent = this.appTooltip();
    this.renderer.appendChild(document.body, tooltip);
    this.tooltip = tooltip;
  }

  private setPosition() {
    const elemRect = this.el.nativeElement.getBoundingClientRect();
    const tooltipRect = this.tooltip?.getBoundingClientRect();
    if (!tooltipRect) return;

    let left, top;

    switch (this.placement()) {
      case 'top':
        top = elemRect.top - tooltipRect.height - this.offset;
        left = elemRect.left + elemRect.width / 2 - tooltipRect.width / 2;
        break;

      case 'bottom':
        top = elemRect.bottom + this.offset;
        left = elemRect.left + elemRect.width / 2 - tooltipRect.width / 2;
        break;

      case 'left':
        top = elemRect.top + (elemRect.height - tooltipRect.height) / 2;
        left = elemRect.left + tooltipRect.width - this.offset;
        break;

      case 'right':
        top = elemRect.top + (elemRect.height - tooltipRect.height) / 2;
        left = elemRect.right + this.offset;
        break;

      default:
        top = elemRect.top - tooltipRect.height - this.offset;
        left = elemRect.left + elemRect.width / 2 - tooltipRect.width / 2;
    }

    if (this.tooltip) {
      this.tooltip.style.top = `${top}px`;
      this.tooltip.style.left = `${left}px`;
    }
  }
}
