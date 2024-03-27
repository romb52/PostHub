import { Component } from '@angular/core';
import { ThemeService } from '../services/theme.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent {
  theme: string = 'light';

  private themeSubscription: Subscription;
  constructor(private themeService: ThemeService) {
    this.themeSubscription = this.themeService.themeChanged$.subscribe(
      (newTheme) => {
        this.theme = newTheme;
      }
    );
  }

  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
  }
}
