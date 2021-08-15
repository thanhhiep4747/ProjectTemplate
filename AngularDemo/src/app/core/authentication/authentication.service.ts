import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { BaseService } from '../services/base.service';

@Injectable()
export class AuthenticationService extends BaseService {
    login(email: string, password: string) {
        this.post('login', { email, password }).subscribe(
            (res) => {
                if (res) {
                    this.setSession(res);
                }
            },
            () => {
                this.logout();
            }
        );
    }

    private setSession(authResult) {
        const expiresAt = moment().add(authResult.expiresIn, 'second');

        localStorage.setItem('accesstoken', authResult.accesstoken);
        localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
    }

    logout() {
        localStorage.removeItem('accesstoken');
        localStorage.removeItem('expires_at');
    }

    public isLoggedIn() {
        return moment().isBefore(this.getExpiration());
    }

    isLoggedOut() {
        return !this.isLoggedIn();
    }

    getExpiration() {
        const expiration = localStorage.getItem('expires_at');
        const expiresAt = JSON.parse(expiration ?? new Date().toString());
        return moment(expiresAt);
    }
}
