import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {

  posts: Post[] = [];
  subscription: Subscription;
  showSpinner: boolean = false;

  constructor(public postsService: PostsService) {}

  ngOnInit() {
    this.showSpinner = true;
    this.subscription = this.postsService.getUpdatedPostsListener()
      .subscribe(
        (posts: Post[]) => {
          this.showSpinner = false;
          this.posts = posts;
        }
      );
    this.postsService.getPosts();

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
