import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../environments/environment';
import { OptionModel } from './common/models/optionModel';
import { BaseComponent } from './common/components/base.component';
import { CookieStorage } from './common/helper/cookieStorage';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent extends BaseComponent {
    title = 'angularDemo';
    currentLang = this.cookieHelper.getStore('languageCulture')
        ? this.cookieHelper.getStore('languageCulture')
        : environment.defaultLanguage;

    noLang = new OptionModel('NO', 'no');
    enLang = new OptionModel('EN', 'en');
    listLanguage = [this.noLang, this.enLang];

    constructor(private translate: TranslateService, private cookieHelper: CookieStorage) {
        super();
        this.setLanguage();
    }

    setLanguage() {
        this.translate.setDefaultLang(this.currentLang);
        this.translate.use(this.currentLang);
    }

    onChangeLanguage(newLang: OptionModel): void {
        if (this.cookieHelper.getStore('languageCulture') !== newLang.id) {
            this.cookieHelper.setValue('languageCulture', newLang.id);
        }
    }
}
