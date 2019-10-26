import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import { validateFile } from './mimie-type-validator';

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
  form: FormGroup;
  post: Post;
  showSpinner: boolean = false;
  imagePreview: string;

  constructor(public postsService: PostsService, public route: ActivatedRoute) { }

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      content: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(10)]
      }),
      image: new FormControl(null,{
        validators: [Validators.required],
        asyncValidators: [validateFile]
      } )
    })
    this.route.paramMap.subscribe((paramMap: ParamMap)=> {
      if(paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.showSpinner = true;
        this.postsService.getPost(this.postId).subscribe(data => {
          this.showSpinner = false;
          this.post = {id: data._id, title: data.title, content: data.content};
          this.form.setValue({
            'title': this.post.title,
            'content': this.post.content
          })
        })

      } else {
        this.mode = 'create';
        this.postId = null;
         this.post = null;
      }
    });
  }

  onAddPost() {
    if(this.form.invalid) {
      return;
    }
    if(this.postId) {
      this.postsService.editPost(this.form.value.title, this.form.value.content, this.postId);
    } else {
      this.postsService.addPost(this.form.value.title, this.form.value.content);
    }

  this.form.reset();

  }

  onImageUpload(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({image: file});
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);

  }

}
