import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Customer Portal';
  lang = 'de';

  constructor(private translateService: TranslateService) {
    this.translateService.setDefaultLang('de');
  }

  switchLanguage() {
    this.lang = this.lang === 'de' ? 'en' : 'de';
    this.translateService.use(this.lang);
  }
}
