import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  newPost = '';
  enteredContent = '';
  enteredTitle = '';
  // @Output() messageEvent = new EventEmitter<Post>();

  constructor(public postsService: PostsService) { }

  ngOnInit() {
  }

  onAddPost(form: NgForm) {
    if(form.invalid) {
      return;
    }
  //   const post: Post = {title: form.value.title, content: form.value.content};
  //  this.messageEvent.emit(post);
  this.postsService.addPost(form.value.title, form.value.content);

  }

}
