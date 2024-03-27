import { PostService } from '../services/post.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { error } from 'console';
import { setErrorAction } from '../share/store/actions/eror.action';
import { IPost, IPostResponce } from '../share/post.interface';
import { IError } from '../share/error.interface';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css'
})
export class CreatePostComponent {
  post_id: boolean = false;

  addPostForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required,]),
    description: new FormControl('', [Validators.required]),
    body: new FormControl('', [Validators.required]),
    tagList: new FormControl(''),
  });
  constructor(
    private store: Store<{ auth: { token: string } }>,
    private router: Router,
    private postService: PostService
  ) {
    this.store.select((state) => state.auth.token);    
  }

  sumbitAddPostForm() {
    if (this.addPostForm.status === 'VALID') {
      this.postService
        .createPost(this.addPostForm.value.title, this.addPostForm.value.description, this.addPostForm.value.body, this.addPostForm.value.tagList.replaceAll(' ', '').split(','))
        .subscribe((data: IPostResponce | IError) => {
          if ('article' in data) {
           // console.log(data.article)            
            this.post_id = true;           
            this.addPostForm.reset();
          } else {
            this.store.dispatch(
              setErrorAction({
                message: (data as IError).message || '',
                messages: (data as IError)?.errors?.body || [],
              })
            );
          }
        });
    } else {
      this.store.dispatch(
        setErrorAction({
          message: "Заповніть обов\'язкові поля",
          messages: [],
        })
      );
    }
    setTimeout(() => {
      this.post_id = false;
      this.store.dispatch(
        setErrorAction({
          message: '',
          messages: [],
        })
      );
    }, 5000);
  }
}

