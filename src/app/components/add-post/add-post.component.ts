import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Post } from 'src/app/models/post.model';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss'],
})
export class AddPostComponent {
  post: Post = {
    id: null,
    title: null,
    publicationDate: null,
    content: null,
    author: {
      id: null,
      authorName: null,
    },
  };
  postForm = new FormGroup<string | any>({
    title: new FormControl('', Validators.required),
    content: new FormControl('', Validators.required),
  });

  constructor(
    public dialogRef: MatDialogRef<AddPostComponent>,
    private postService: PostService
  ) {}

  createPost() {
    this.post.title = this.postForm.get('title')?.value;
    this.post.content = this.postForm.get('content')?.value;
    this.postService.createPost(this.post).subscribe({
      next: (createdPost) => {
        console.log(createdPost);
      },
      complete: () => {
        this.dialogRef.close({ refreshOperation: true });
      },
    });
  }

  close() {
    this.dialogRef.close();
  }
}
