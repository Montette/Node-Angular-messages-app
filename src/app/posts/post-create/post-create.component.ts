import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  newPost = '';
  // enteredContent = '';
  // enteredTitle = '';
  private mode = 'create';
  private postId: string;
  post: Post;

  constructor(public postsService: PostsService, public route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap)=> {
      console.log(paramMap);
      if(paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.postsService.getPost(this.postId).subscribe(data => {
          console.log(data);
          this.post = {id: data.post._id, title: data.post.title, content: data.post.content}
        })
         console.log(this.post);

      } else {
        this.mode = 'create';
        this.postId = null;
         this.post = null;
      }
    });
  }

  onAddPost(form: NgForm) {
    if(form.invalid) {
      return;
    }
    if(this.postId) {
      this.postsService.editPost(form.value.title, form.value.content, this.postId);
    } else {
      this.postsService.addPost(form.value.title, form.value.content);
    }

  form.resetForm();

  }

}
