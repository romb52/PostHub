import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { IPosts, IPost, IPostResponce } from '../share/post.interface';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { URL } from '../share/backend';
import { IError } from '../share/error.interface';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  public posts: IPosts = { articles: [], articlesCount: 0 };
  constructor(private http: HttpClient) {
    this.getPosts().subscribe((data) => {
      if ('articles' in data) {
        this.posts = data;
      }
    })
  }
  
  getPosts(): Observable<IPosts| IError> {
    const url = URL + '/articles';
    return this.http.get<IPosts>(url).pipe(
      catchError((error: HttpErrorResponse) => {
        return of(error.error as IError);
      })
    );;
  }

  getPostsByAuthor(id: number): Observable<IPosts | IError> {
    const url = URL + '/articles/?authorId=' + id;
    return this.http.get<IPosts>(url).pipe(
      catchError((error: HttpErrorResponse) => {
        return of(error.error as IError);
      })
    );
  }

  getPostsByAuthorAndId(id: number, tag: string): Observable<IPosts | IError> {
    const url = URL + '/articles/?authorId=' + id + '&tag=' + tag;
    return this.http.get<IPosts>(url).pipe(
      catchError((error: HttpErrorResponse) => {
        return of(error.error as IError);
      })
    );
  }

  getPostsByTag(tag: string): Observable<IPosts | IError> {
    const url = URL + '/articles/?tag=' + tag;
    return this.http.get<IPosts>(url).pipe(
      catchError((error: HttpErrorResponse) => {
        return of(error.error as IError);
      })
    );
  }

  deleteAuthorPost(slug: string): Observable<IPosts | IError> {
    const url = URL + '/articles/' + slug;
    return this.http.delete<IPosts>(url,  {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `token ${localStorage.getItem('token')}`,
      },
    }).pipe(
      catchError((error: HttpErrorResponse) => {
        return of(error.error as IError);
      })
    );
  }

  createPost(
    title: string,
    description: string,
    body: string,
    tagList: string[],
  ): Observable<IPostResponce | IError> {
    const url = URL + '/articles';
    return this.http
      .post<IPostResponce>(
        url,
        { article: { title, description, body, tagList } },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `token ${localStorage.getItem('token')}`,
          },
        }
      )
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.error instanceof ErrorEvent) {
            console.error('An error occurred:', error.error.message);
          } else {
            console.error(
              `Backend returned code ${error.status}, body was:`,
              error.error
            );
          }
          return of(error.error as IError);
        })
      );
  }
}
