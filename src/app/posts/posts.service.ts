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
          id: post._id,
          imagePath: post.imagePath
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

  addPost(title: string, content: string, image: File) {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('image', image, title);

    this.http
      .post<any>('http://localhost:3000/api/posts', formData)
      .subscribe((response)=> {
        const post = {title, content, id: response.postId, imagePath: response.imagePath};
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
        console.log(response)
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
      return this.http.get<{_id: string, title: string, content: string, imagePath: string}>(`http://localhost:3000/api/posts/${postId}`)
}

  editPost(title: string, content: string, id: string, image: File | string) {
    let postData;
    if (typeof image === "object") {
      postData = new FormData();
      postData.append("id", id);
      postData.append("title", title);
      postData.append("content", content);
      postData.append("image", image, title);
    } else {
      postData = {
        id: id,
        title: title,
        content: content,
        imagePath: image
      };
    }
    // const post = {title, content, id, image};
    this.http.put<any>(`http://localhost:3000/api/posts/${id}`, postData)
    .subscribe((response)=> {
        const posts = [...this.posts];
        const postIndex = posts.findIndex(post => post.id === id);
        posts[postIndex] = postData;
        this.posts = posts;
        this.postsUpdated.next([...this.posts]);
        this.router.navigate(['/']);

    })
  }
}
