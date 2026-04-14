import {Component, inject} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HeaderComponent} from '../../header/header/header';
import {FooterComponent} from '../../footer/footer';
import {ModalHost} from '../../../../shared/ui/modal/modal-host/modal-host';
import {AuthService} from '../../../auth/authService';

@Component({
  selector: 'app-app-shell',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, ModalHost],
  templateUrl: './app-shell.html',
  styleUrls: ['./app-shell.css'],
})
export class AppShellComponent {

  readonly authService = inject(AuthService);

}
