import { Component, NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { PostsComponent } from './posts/posts.component';
import { PostComponent } from './post/post.component';
import { ErrorPageComponent } from './404/404.component';
import { AuthComponent } from './auth/auth.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ThemeService } from './services/theme.service';
import { LangService } from './services/lang.service';
import { HttpClientModule } from '@angular/common/http';
import { PostService } from './services/post.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AuthService } from './services/auth.service';
import { authReduser } from './share/store/reducers/auth.reducer';
import { errorReducer } from './share/store/reducers/error.reducer';
import { ErrorComponent } from './error/error.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './share/store/effects/auth.effects';


@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    PostsComponent,
    PostComponent,
    ErrorComponent,
    AuthComponent,
    ErrorPageComponent,
    CreatePostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatTabsModule,
    MatInputModule,
    MatFormFieldModule,
    StoreModule.forRoot({ auth: authReduser, error: errorReducer }),
    StoreDevtoolsModule.instrument(),
    EffectsModule.forRoot([AuthEffects]),

  ],
  providers: [provideClientHydration(), ThemeService, LangService, PostService, AuthService,],
  bootstrap: [AppComponent],
})
export class AppModule {}
