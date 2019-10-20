import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  newPost = '';
  enteredContent = '';
  enteredTitle = '';
  @Output() messageEvent = new EventEmitter<object>();

  constructor() { }

  ngOnInit() {
  }

  onAddPost() {
    const post = {title: this.enteredTitle, content: this.enteredContent};
    this.messageEvent.emit(post);

  }

}
