import {APP_INITIALIZER, ApplicationConfig, inject, provideBrowserGlobalErrorListeners} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {authInterceptor} from './core/auth/auth.interceptor';
import {ConfigService} from './core/core/config.service';

function initializeConfig(): () => Promise<void> {
  const configService = inject(ConfigService);
  return () => configService.load();
}
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeConfig,
      multi: true,
    },
  ]
};
