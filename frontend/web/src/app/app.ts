import {Component, inject, signal} from '@angular/core';
import { AppShellComponent } from './core/layout/app-shell/app-shell/app-shell';
import {AuthService} from './core/auth/authService';

@Component({
  selector: 'app-root',
  imports: [AppShellComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('collectible-cards-shop');
  private readonly authService = inject(AuthService);

  ngOnInit(): void {
    this.authService.initAuth().subscribe();
  }
}
