import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PostsComponent } from './posts/posts.component';
import { PostComponent } from './post/post.component';
import { ErrorPageComponent } from './404/404.component';
import { AuthComponent } from './auth/auth.component';
import { CreatePostComponent } from './create-post/create-post.component';

const routes: Routes = [
  { path: '', redirectTo: 'PostHub', pathMatch: 'full' },
  { path: 'PostHub', component: HomeComponent },
  { path: 'PostHub/posts', component: PostsComponent },
  { path: 'PostHub/post/:id', component: PostComponent },
  { path: 'PostHub/404', component: ErrorPageComponent },
  { path: 'PostHub/auth', component: AuthComponent },
  { path: 'PostHub/create-post', component: CreatePostComponent },
  {
    path: ':lang',
    children: [
      { path: '', redirectTo: 'PostHub', pathMatch: 'full' },
      { path: 'PostHub', component: HomeComponent },
      { path: 'PostHub/posts', component: PostsComponent },
      { path: 'PostHub/post/:id', component: PostComponent },
      { path: 'PostHub/404', component: ErrorPageComponent },
      { path: 'PostHub/auth', component: AuthComponent },
      { path: 'PostHub/create-post', component: CreatePostComponent },
    ],
  },
    { path: '**', redirectTo: 'PostHub/404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
