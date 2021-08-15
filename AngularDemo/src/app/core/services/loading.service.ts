import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LoadingService {
    isLoading$: Subject<boolean> = new Subject();

    startLoading(isStart: boolean) {
        this.isLoading$.next(isStart);
    }

    stopLoading(isStop: boolean) {
        this.isLoading$.next(isStop);
    }
}
