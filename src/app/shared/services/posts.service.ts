import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PostComment} from '../models/post.model';
import {map, tap} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class PostsService {

    constructor(private http: HttpClient) {
    }

    getUserPost(id: number, skip: number) {
        let params = new HttpParams({
            fromObject: {
                id: `${id}`,
                skip: `${skip}`,
            }
        });
        return this.http.get(`/api/posts/userPost`, { params: params,responseType: 'json'});
    }

    getUserPostNumber(id: number) {
        return this.http.get(`/api/posts/userPost/Count?id=${id}`, {responseType: 'text'});
    }

    createPost() {

    }

    deletePost(id: number) {
        return this.http.delete(`/api/posts/userPost?id=${id}`, {headers: {Authorization: localStorage.getItem('userToken')}});
    }

    getPostComment(postID: number, take: number): Observable<PostComment> {
        let params = new HttpParams({
            fromObject: {
                postID: `${postID}`,
                skip: `${take}`,
            }
        });

        return this.http.get<PostComment>(`/api/posts/userPost/Comment`, {params: params ,responseType: 'json'});
    }

    countPostComments(id: number) {
        return this.http.get(`/api/posts/userPost/Comments/Count?id=${id}`)
            .pipe(
                tap(console.log),
                map((e) => e)
            )
    }
}
