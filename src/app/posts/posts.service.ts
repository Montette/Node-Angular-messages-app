import { Post } from './post.model';
import { Subject } from 'rxjs';

export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  getPosts() {
    return [...this.posts];
  }

  getUpdatedPostsListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string, id: number) {
    const post = {title, content, id};
    this.posts.push(post);
    this.postsUpdated.next([...this.posts]);
  }

  removePost(removingPost: Post) {
    this.posts = this.posts.filter(post => post.id !== removingPost.id);
    this.postsUpdated.next([...this.posts]);
  }
}
