import { Component, Inject, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTabGroup } from '@angular/material/tabs';
import { Post } from 'src/app/models/post.model';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent {
  post: Post;
  myPost: boolean;
  postForm = new FormGroup<string | any>({
    title: new FormControl('', Validators.required),
    content: new FormControl('', Validators.required),
  });
  @ViewChild(MatTabGroup) matTabGroup: MatTabGroup;
  constructor(
    public dialogRef: MatDialogRef<PostComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private postService: PostService
  ) {}

  ngOnInit() {
    this.post = this.data.post;
    this.myPost = this.data.myPost;
    this.postForm.patchValue({ title: this.post.title });
    this.postForm.patchValue({ content: this.post.content });
  }

  update() {
    this.matTabGroup.selectedIndex = 1;
  }

  delete() {
    this.matTabGroup.selectedIndex = 2;
  }

  updatePost() {
    this.post.title = this.postForm.get('title')?.value;
    this.post.content = this.postForm.get('content')?.value;
    this.postService.updatePost(this.post.id, this.post).subscribe({
      next: (updatedPost) => {
        console.log(updatedPost);
      },
      complete: () => {
        this.dialogRef.close({ refreshOperation: true });
      },
    });
  }

  backToPost() {
    this.matTabGroup.selectedIndex = 0;
  }

  deletePost() {
    this.postService.deletPost(this.post.id).subscribe({
      complete: () => {
        this.dialogRef.close({ refreshOperation: true });
      },
    });
  }
}
