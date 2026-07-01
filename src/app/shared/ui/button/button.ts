import { booleanAttribute, Component, input } from '@angular/core';
import { type AppearanceOption } from '../../appearance.option';
import { type TypeOption } from '../../type.option';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'ui-button',
  templateUrl: './button.html',
  styleUrl: './button.scss',
})
export class Button {
  public readonly appearance = input.required<AppearanceOption>();
  public readonly title = input.required<string>();
  public readonly type = input<TypeOption>('button');
  public readonly disabled = input(false, { transform: booleanAttribute });
}
