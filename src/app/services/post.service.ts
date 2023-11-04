import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../models/post.model';

let headers = new HttpHeaders();
headers = headers.set('Content-Type', 'application/json');

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private baseURL: string = 'http://localhost:8090';

  constructor(private httpClient: HttpClient) {}

  getPageListOfAllPosts(page: number, size: number): Observable<any> {
    return this.httpClient.get<any>(
      `${this.baseURL}/blog_posts?page=${page}&size=${size}`
    );
  }

  createPost(post: Post): Observable<Post> {
    return this.httpClient.post<Post>(`${this.baseURL}/blog_posts`, post, {
      headers: headers,
    });
  }

  getPost(postId: number): Observable<Post> {
    return this.httpClient.get<Post>(`${this.baseURL}/blog_posts/${postId}`);
  }

  updatePost(postId: number, post: Post): Observable<Post> {
    return this.httpClient.put<Post>(
      `${this.baseURL}/blog_posts/${postId}`,
      post,
      {
        headers: headers,
      }
    );
  }

  deletPost(postId: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseURL}/blog_posts/${postId}`);
  }

  getPageListOfMyPosts(page: number, size: number): Observable<any> {
    return this.httpClient.get<any>(
      `${this.baseURL}/blog_posts/my?page=${page}&size=${size}`
    );
  }
}
