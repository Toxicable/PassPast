import {Observable} from "rxjs";
import {Injectable} from '@angular/core';


export abstract class StorageBackend {
    abstract setItem(key: string, value: string): Observable<any>
    abstract getItem(key: string): Observable<any>
    abstract removeItem(key: string): Observable<any>
}

@Injectable()
export class Storage {
    constructor(private storageBackend:StorageBackend){}

    setItem(key, value){
        return this.storageBackend.setItem(key, value);
    }
    getItem(key){
        return this.storageBackend.getItem(key);
    }
    removeItem(key){
        return this.storageBackend.removeItem(key);
    }
}

@Injectable()
export class LocalStorageBackend implements StorageBackend {
    setItem(key, value) {
        return Observable.of( localStorage.setItem(key, value))
    }
    getItem(key){
        return Observable.of( localStorage.getItem(key))
    }
    removeItem(key){
        return Observable.of( localStorage.removeItem(key))
    }
}