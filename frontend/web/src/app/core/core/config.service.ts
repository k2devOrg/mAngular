import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { AppConfig } from './app-config';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private readonly http = inject(HttpClient);

  private config!: AppConfig;

  load(): Promise<void> {
    return firstValueFrom(
      this.http.get<AppConfig>('/assets/config/config.json')
    ).then((config) => {
      this.config = config;
    });
  }

  get apiUrl(): string {
    return this.config.API_URL;
  }
}
