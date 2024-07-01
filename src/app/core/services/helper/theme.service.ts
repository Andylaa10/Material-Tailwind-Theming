import { Injectable, Signal, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly theme: WritableSignal<string> = signal<string>(
    window.localStorage.getItem('theme') ?? ''
  );
  public readonly $theme: Signal<string> = this.theme.asReadonly();

  setTheme(theme: string): void {
    localStorage.setItem('theme', theme);
    this.theme.set(theme);
  }
}
