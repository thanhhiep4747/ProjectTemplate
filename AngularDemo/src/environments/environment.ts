/* eslint-disable import/no-mutable-exports */
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import { IEnvironment } from './environment.interface';

export let environment: IEnvironment = {
    appSettings: '/environments/appSettings.json'
};

export function mergeNewSettings(newConfig) {
    environment = newConfig;
}

export function mergeNewSetting(key, value) {
    environment[key] = value;
    environment.defaultLanguage = value.globalizationCulture;
}
