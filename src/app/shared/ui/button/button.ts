import { booleanAttribute, Component, input } from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'ui-button',
  imports: [],
  templateUrl: './button.html',
  styleUrl: './button.scss',
})
export class Button {
  public readonly variant = input<'add' | 'delete'>();
  public readonly title = input.required<string>();
  public readonly disabled = input(false, { transform: booleanAttribute });
}
