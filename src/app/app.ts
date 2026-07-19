import { Component } from '@angular/core';
import { Todo } from './components/todo/todo';
import { Toasts } from './components/toasts/toasts';

@Component({
  selector: 'app-root',
  imports: [Todo, Toasts],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
