import { ChangeDetectionStrategy, Component } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-splash-screen',
  standalone: true,
  imports: [],
  templateUrl: './splash-screen.component.html',
  styleUrl: './splash-screen.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SplashScreenComponent {
  serverUrl = environment.backendDomain;
}
