/* eslint-disable import/no-mutable-exports */
import { IEnvironment } from './environment.interface';

export let environment: IEnvironment = {
    appSettings: '/environments/appSettings.prod.json'
};

export function mergeNewSettings(newConfig) {
    environment = newConfig;
}

export function mergeNewSetting(key, value) {
    environment[key] = value;
    environment.defaultLanguage = value.globalizationCulture;
}
