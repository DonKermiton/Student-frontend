import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, ReplaySubject} from 'rxjs';
import {User} from '../../shared/models/user.model';
import {delay, map, retryWhen, switchMap, take, tap} from 'rxjs/operators';
import {photoModel} from '../../core/models/photo.model';

@Injectable({
    providedIn: 'root',
})

export class UsersService {
    User = new ReplaySubject<User>();
    userID: number = null;
    private socketToken: string = null;

    constructor(private http: HttpClient) {
    }

    public get getSocketToken() {
        return this.socketToken;
    }

    public set setSocketToken(token: string) {
        console.log(token);
        this.socketToken = token;
    }

    getUserID(): Observable<number> {
        return Observable.create(observer => {
            observer.next(this.userID);
        }).pipe(
            map(response => {
                if (!response) {
                    throw new Error();
                }
                return response;
            }),
            retryWhen(errors => errors.pipe(
                delay(1000),
            ))
        );
    }

    getUserInfo(id: string): void {
        this.http.get<User>(`/api/users/profile/${id}`, {responseType: 'json'}).pipe((
                tap((user: User) => {
                    this.User.next(user);
                    this.userID = user.id;
                })),
            switchMap(() => this.getUserFrontProfile(this.userID)),
            switchMap(() => this.getUserBackProfile(this.userID)),
        ).subscribe();
    }

    getAllProfile(): Observable<User[]> {
        return this.http.get<User[]>(`/api/users/profile/all`);
    }

    getUserFrontProfile(id: number) {
        return this.http.get(`/api/photo/getUserProfile/Front/${id}`, {responseType: 'text'});
    }

    getUserBackProfile(id: number) {
        return this.http.get(`/api/photo/getUserProfile/Back/${id}`, {responseType: 'text'});
    }

    uploadPhoto(form, postID) {
        const formData = new FormData();
        formData.append('file', form);

        return this.http.put(`/api/photo/upload?postID=${postID}`, formData,
            {
                responseType: 'text',
            })
    }

    countUserPhotos(id: number) {
        return this.http.get(`/api/photo/countUserPhoto/${id}`).pipe(
            map(data => data)
        );
    }

    getPhotoCollection(limit: number = 6, id: number = 5): Observable<photoModel[]> {
        return this.http.get<photoModel[]>(`/api/photo/getPhotoCollectionInfo/${limit}/${id}`).pipe(
            map((photo: photoModel[]) => {
                return photo;
            })
        );
    }

    getPhotoByUrl(id: number, url: string) {
        return this.http.get(`/api/photo/getSelectedPhoto/${id}/${url}`, {responseType: 'text'});
    }

    getUser() {
        return this.User.asObservable().pipe(take(1));
    }

    getSelectedUser(id: number): Observable<User> {
        return this.http.get<User>(`/api/users/profile/${id}`);
    }


}
