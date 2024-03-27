import { Component } from '@angular/core';
import { LangService } from '../services/lang.service';
import { mainPage, langs } from '../share/langs';
import { Subscription } from 'rxjs';

interface IHomeContent {
  titleContent: string;
  bodyContent: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  header_langs = langs;
  lang = 'uk';

  arr_home_content: IHomeContent[] = [];
  private langSubscription: Subscription;

  constructor(
    private langService: LangService
  ) {
    this.langSubscription = this.langService.langChanged$.subscribe(
      (newLang) => {
        this.lang = newLang;
        this.arr_home_content = mainPage[newLang].map((item) => {
          return { titleContent: mainPage[newLang][0], bodyContent: mainPage[newLang][1] }
        })
      }      
    );
  }

  changeLang(newLang: string) {
    this.langService.setLang(newLang);
  }

  ngOnDestroy() {
    this.langSubscription.unsubscribe();
  }  
}
