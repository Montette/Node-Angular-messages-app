
import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-single',
  templateUrl: './post-single.component.html',
  styleUrls: ['./post-single.component.css']
})
export class PostSingleComponent implements OnInit {
  @Input() post: Post;
  constructor(public postsService: PostsService) { }

  ngOnInit() {
  }

  onRemovePost() {
    this.postsService.removePost(this.post);
  }
}
