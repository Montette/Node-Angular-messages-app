import { Post } from './post.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable({providedIn: "root"})
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

constructor(private http: HttpClient, private router: Router){}
  getPosts() {
    this.http.get<{message: string, posts: any}>('http://localhost:3000/api/posts')
    .pipe(map(data => {
      return data.posts.map(post => {
        return {
          title: post.title,
          content: post.content,
          id: post._id
        }
      })
    }))
    .subscribe((mappedPosts)=> {
      this.posts = mappedPosts;
      this.postsUpdated.next([...this.posts]);
    })

  }

  getUpdatedPostsListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string) {
    const post = {title, content, id: null};
    this.http.post<any>('http://localhost:3000/api/posts', post)
      .subscribe((response)=> {
        console.log(response);
        post.id = response.post._id;
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
        this.router.navigate(['/']);
      })

  }

  removePost(removingPost: Post) {
    this.http.delete<any>(`http://localhost:3000/api/posts/${removingPost.id}`)
      .subscribe((response)=> {
          this.posts = this.posts.filter(post => post.id !== removingPost.id);
      this.postsUpdated.next([...this.posts]);

      })

  }

  getPost(postId: string) {
      return this.http.get<{_id: string, title: string, content: string}>(`http://localhost:3000/api/posts/${postId}`)
}

  editPost(title: string, content: string, id: string) {
    const post = {title, content, id};
    this.http.put<any>(`http://localhost:3000/api/posts/${id}`, post)
    .subscribe((response)=> {
        const posts = [...this.posts];
        const postIndex = posts.findIndex(post => post.id === id);
        posts[postIndex] = post;
        this.posts = posts;
        this.postsUpdated.next([...this.posts]);
        this.router.navigate(['/']);

    })
  }
}
