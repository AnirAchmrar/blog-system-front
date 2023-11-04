import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { Post } from 'src/app/models/post.model';
import { PostService } from 'src/app/services/post.service';
import { PostComponent } from '../post/post.component';
import { AddPostComponent } from '../add-post/add-post.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: MatTableDataSource<Post> = new MatTableDataSource<Post>();
  pageIndex: number = 0;
  totalElements: number = 0;
  posts: Array<Post> = new Array();
  obs: Observable<any>;
  myPost: boolean = false;

  constructor(
    private postService: PostService,
    private changeDetectorRef: ChangeDetectorRef,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.getPageListOfAllPosts(this.pageIndex);
  }

  getPageListOfAllPosts(pageIndex: number) {
    this.postService.getPageListOfAllPosts(pageIndex + 1, 6).subscribe({
      next: (postsPage) => {
        if (postsPage === null) {
          this.posts = [];
        } else {
          this.posts = postsPage.content;
          setTimeout(() => {
            this.paginator.pageIndex = this.pageIndex;
            this.paginator.length = postsPage.totalElements;
          });
        }
      },
      complete: () => {
        this.changeDetectorRef.detectChanges();
        this.dataSource = new MatTableDataSource(this.posts);
        this.dataSource.paginator = this.paginator;
        this.obs = this.dataSource.connect();
      },
    });
  }

  getPageListOfMyPosts(pageIndex: number) {
    this.postService.getPageListOfMyPosts(pageIndex + 1, 6).subscribe({
      next: (postsPage) => {
        if (postsPage === null) {
          this.posts = [];
        } else {
          this.posts = postsPage.content;
          setTimeout(() => {
            this.paginator.pageIndex = this.pageIndex;
            this.paginator.length = postsPage.totalElements;
          });
        }
      },
      complete: () => {
        this.changeDetectorRef.detectChanges();
        this.dataSource = new MatTableDataSource(this.posts);
        this.dataSource.paginator = this.paginator;
        this.obs = this.dataSource.connect();
      },
    });
  }

  ngOnDestroy() {
    if (this.dataSource) {
      this.dataSource.disconnect();
    }
  }

  nextPage(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.getPageListOfAllPosts(this.pageIndex);
  }

  openPost(post: Post) {
    const dialogRef = this.dialog.open(PostComponent, {
      data: {
        post: post,
        myPost: this.myPost,
      },
      width: '50%',
      height: 'fit-content',
    });
    dialogRef.afterClosed().subscribe({
      next: (refreshOperation) => {
        if (refreshOperation) {
          this.refreshPage();
        }
      },
    });
  }

  refreshPage() {
    this.pageIndex = 0;
    this.totalElements = 0;
    if (this.myPost) {
      this.getPageListOfMyPosts(this.pageIndex);
    } else {
      this.getPageListOfAllPosts(this.pageIndex);
    }
  }

  addPost() {
    const dialogRef = this.dialog.open(AddPostComponent, {
      data: {},
      width: '50%',
      height: 'fit-content',
    });
    dialogRef.afterClosed().subscribe({
      next: (refreshOperation) => {
        if (refreshOperation) {
          this.refreshPage();
        }
      },
    });
  }

  selectPostsType(event: any) {
    if (event.value == 'myPosts') {
      this.myPost = true;
    } else {
      this.myPost = false;
    }
    this.refreshPage();
  }
}
