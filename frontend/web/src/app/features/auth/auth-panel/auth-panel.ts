import {CommonModule} from '@angular/common';
import {Component, computed, inject, signal} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {toSignal} from '@angular/core/rxjs-interop';
import {RevealOnScroll} from '../../../shared/directives/reveal-on-scroll';
import {AuthService} from '../../../core/auth/authService';

type Mode = 'signIn' | 'signUp';
type QueryMode = 'login' | 'register';

@Component({
  selector: 'app-auth-panel',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RevealOnScroll],
  templateUrl: './auth-panel.html',
})
export class AuthPanelComponent {
  private readonly fb = new FormBuilder();
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);

  private readonly qp = toSignal(this.route.queryParamMap);

  readonly isSubmitting = signal(false);
  readonly signInError = signal<string | null>(null);

  readonly mode = computed<Mode>(() => {
    const m = this.qp()?.get('mode');
    return m === 'register' ? 'signIn' : 'signUp'; // na odwrot specjalnie
  });

  readonly isSignUp = computed(() => this.mode() === 'signUp');

  readonly signInForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  readonly signUpForm = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  readonly overlayTranslateClass = computed(() =>
    this.isSignUp() ? 'translate-x-full' : 'translate-x-0'
  );

  readonly signInPanelClass = computed(() =>
    this.isSignUp()
      ? 'opacity-100 -translate-x-6 pointer-events-auto'
      : 'opacity-0 translate-x-0 pointer-events-none'
  );

  readonly signUpPanelClass = computed(() =>
    this.isSignUp()
      ? 'opacity-0 translate-x-0 pointer-events-none'
      : 'opacity-100 translate-x-6 pointer-events-auto'
  );

  readonly mobileSignInClass = computed(() =>
    this.isSignUp()
      ? 'opacity-100 translate-x-0 pointer-events-auto'
      : 'opacity-0 translate-x-2 pointer-events-none'
  );

  readonly mobileSignUpClass = computed(() =>
    this.isSignUp()
      ? 'opacity-0 -translate-x-2 pointer-events-none'
      : 'opacity-100 translate-x-0 pointer-events-auto'
  );

  toggleMode() {
    const next: QueryMode = this.isSignUp() ? 'register' : 'login';

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {mode: next},
      queryParamsHandling: 'merge',
      replaceUrl: true,
    });
  }

  submitSignIn() {
    if (this.signInForm.invalid) {
      this.signInForm.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);
    this.signInError.set(null);

    const payload = this.signInForm.getRawValue();

    this.authService.login(payload).subscribe({
      next: () => {
        this.isSubmitting.set(false);
        this.router.navigate(['/auth/profile']).then();
      },
      error: () => {
        this.isSubmitting.set(false);
        this.signInError.set('Nieprawidłowy e-mail lub hasło.');
      }
    });
  }

  submitSignUp() {
    if (this.signUpForm.invalid) {
      this.signUpForm.markAllAsTouched();
      return;
    }

    const payload = this.signUpForm.getRawValue();
    console.log('SIGN UP', payload);
  }
}
