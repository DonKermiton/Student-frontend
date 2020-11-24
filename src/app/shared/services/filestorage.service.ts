import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from '../../auth/services/auth.service';

@Injectable({
    providedIn: 'root'
})

export class StorageService {
    constructor(private http: HttpClient,
                private auth: AuthService) {
    }

    getOccupiedSpace(): Observable<number> {
        return this.http.get<number>('/api/storage/space', {headers: {Authorization: `${this.auth.getToken()}`}});
    }

    getSelectedUrl(url: string) {
        const params = new HttpParams({
            fromObject: {
                url
            }
        });
        return this.http.get('/api/storage/space/files', {params});
    }

    deleteDirectory(name: string, isDir: boolean, force: boolean) {
        const params = new HttpParams({
            fromObject: {
                name,
                type: isDir ? 'dir' : 'file',
                force: isDir ? 'true' : 'false'
            }
        })

        return this.http.delete('/api/storage/space/file', {params, responseType: 'text'});
    }



}