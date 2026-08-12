import { Service, signal } from '@angular/core';

interface Toast {
  readonly id: number;
  readonly text: string;
}

@Service()
export class ToastService {
  private nextId = 0;
  private readonly messagesState = signal<Toast[]>([]);

  public readonly messages = this.messagesState.asReadonly();

  public showToast(text: string): void {
    const toast: Toast = {
      id: this.nextId++,
      text,
    };

    this.messagesState.update((messages) => [...messages, toast]);

    setTimeout(() => {
      this.messagesState.update((messages) => messages.filter(({ id }) => id !== toast.id));
    }, 1500);
  }
}
