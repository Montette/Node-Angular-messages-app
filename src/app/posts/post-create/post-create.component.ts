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
  showSpinner: boolean = false;

  constructor(public postsService: PostsService, public route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap)=> {
      console.log(paramMap);
      if(paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.showSpinner = true;
        this.postsService.getPost(this.postId).subscribe(data => {
          this.showSpinner = false;
          this.post = {id: data._id, title: data.title, content: data.content}
        })

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
