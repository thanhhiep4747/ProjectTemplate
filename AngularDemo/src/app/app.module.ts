import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { environment, mergeNewSettings } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { LoadingInterceptor } from './core/interceptors/loading.interceptor';
import { DEFAULT_TIMEOUT, TimeOutInterceptor } from './core/interceptors/time-out.interceptor';
import { LoadingService } from './core/services/loading.service';
import { CookieStorage } from './common/helper/cookieStorage';
import { AuthenticationInterceptor } from './core/interceptors/authentication.interceptor';
import { HttpErrorInterceptor } from './core/interceptors/http-error.interceptor';

export function TranslationLoaderFactory(http: HttpClient) {
    let resourcePath = '';
    if (environment && environment.assetsPath) {
        resourcePath = `${environment.assetsPath}/i18n/`;
    } else if (window.location.origin.includes('localhost')) {
        resourcePath = `${window.location.origin}/assets/i18n/`;
    } else {
        resourcePath = `${window.location.origin}/angularDemo/assets/i18n/`;
    }

    return new TranslateHttpLoader(http, resourcePath, '.json');
}

export function StartupServiceFactory(
    http: HttpClient,
    translateService: TranslateService,
    cookieHelper: CookieStorage
) {
    return () => {
        return http
            .get(`${environment.appSettings}`)
            .toPromise()
            .then((settings) => {
                mergeNewSettings(settings);

                if (environment.apiUrl && !environment.apiUrl.startsWith('http')) {
                    environment.apiUrl = `${window.location.protocol}//${window.location.host}${environment.apiUrl}`;
                }

                const currentLang = cookieHelper.getStore('languageCulture')
                    ? cookieHelper.getStore('languageCulture')
                    : environment.defaultLanguage;

                translateService.setDefaultLang(currentLang);
                return translateService
                    .use(currentLang)
                    .toPromise()
                    .catch(() => {
                        throw new Error('LocalizationService.init failed');
                    });
            });
    };
}

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        CoreModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: TranslationLoaderFactory,
                deps: [HttpClient]
            }
        }),
        MatIconModule,
        MatButtonModule
    ],
    providers: [
        LoadingService,
        {
            provide: APP_INITIALIZER,
            useFactory: StartupServiceFactory,
            deps: [HttpClient, TranslateService, CookieStorage],
            multi: true
        },
        [{ provide: DEFAULT_TIMEOUT, useValue: 10000 }],
        { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: TimeOutInterceptor, multi: true }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
