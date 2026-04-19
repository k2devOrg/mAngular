import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { AuthService} from '../../../../core/auth/authService';

@Component({
  selector: 'app-profile-details-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-details-page.html',
})
export class ProfileDetailsPageComponent {
  private readonly authService = inject(AuthService);

  readonly user = computed(() => this.authService.user());
}
