import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-post-single',
  templateUrl: './post-single.component.html',
  styleUrls: ['./post-single.component.css']
})
export class PostSingleComponent implements OnInit {
  @Input() post: any;
  constructor() { }

  ngOnInit() {
  }

}
