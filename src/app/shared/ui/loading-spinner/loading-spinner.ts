import { Component, input } from '@angular/core';

@Component({
  selector: 'ui-loading-spinner',
  templateUrl: './loading-spinner.html',
  styleUrl: './loading-spinner.scss',
})
export class LoadingSpinner {
  public readonly label = input('Loading...');
}
