import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { checkAuthAction} from './share/store/actions/auth.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'HW-8 Angular effects';
  constructor( private store: Store) {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token') || null;
      //console.log(token);
      if (token) {
        this.store.dispatch(checkAuthAction());
      }
    }
  }
}
