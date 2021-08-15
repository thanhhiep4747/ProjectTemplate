import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import * as moment from 'moment';
import Cookies from 'universal-cookie';

const cookies = new Cookies();
@Injectable({
    providedIn: 'root'
})
export class CookieStorage {
    private secrectKey = 'secrectKey.process.Key';

    private encrypt(data: string) {
        if (!data) {
            return '';
        }

        const ciphertext = CryptoJS.AES.encrypt(data, this.secrectKey);
        return ciphertext.toString();
    }

    private decrypt(data: string) {
        if (!data) {
            return null;
        }

        const bytes = CryptoJS.AES.decrypt(data, this.secrectKey);
        const plaintext = bytes.toString(CryptoJS.enc.Utf8);
        return plaintext;
    }

    createStore(key: string, data: string) {
        if (data) {
            const hashData = this.encrypt(data);
            cookies.set(key, hashData, { path: '/' });
        }
    }

    setValue(key: string, value: string) {
        cookies.set(key, value);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    createStoreAccess(key: string, data: any) {
        if (data) {
            const hashData = this.encrypt(data);
            cookies.set(key, hashData, {
                path: '/',
                expires: new Date(moment().add(10, 'day').format())
            });
        }
    }

    public getStore(key: string) {
        let hashData = cookies.get(key);
        if (hashData) {
            hashData = hashData.trim('"');
            if (hashData) {
                return hashData;
            }
        }
        return undefined;
    }

    removeStore(key: string) {
        cookies.remove(key, { path: '/' });
    }
}
