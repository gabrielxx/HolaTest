import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import {HttpClientModule} from '@angular/common/http';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthGuardModule } from '@angular/fire/auth-guard';
import { NewsService } from 'src/app/providers/news.service';

@NgModule({
  declarations: [
    PagesComponent, 
    HeaderComponent, 
    FooterComponent,    
  ],

  imports: [
    BrowserModule,
    HttpClientModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireAuthGuardModule,
  ],
  exports: [
    PagesComponent
  ],
  providers: [
    NewsService
  ]
})
export class PagesModule { }
