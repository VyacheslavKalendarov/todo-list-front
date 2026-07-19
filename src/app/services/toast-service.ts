import { Service, signal } from '@angular/core';

@Service()
export class ToastService {
  public readonly messages = signal<string[]>([]);

  public showToast(message: string): void {
    this.messages.update((messages) => [...messages, message]);
    setTimeout(() => {
      this.messages.update((messages) => messages.filter((m) => m !== message));
    }, 1500);
  }
}
