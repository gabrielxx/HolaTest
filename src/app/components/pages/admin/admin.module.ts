import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsComponent } from './news/news.component';
import { AdminComponent } from './admin.component';
import { HeaderComponent } from './shared/header/header.component';
import { ADMIN_ROUTES } from './admin.routes';
import { NewsService } from 'src/app/providers/news.service';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AdminComponent, 
    NewsComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    ADMIN_ROUTES,
    FormsModule,
    ReactiveFormsModule

  ],
  exports : [
    NewsComponent
  ],
  providers: [
    NewsService
  ]
})
export class AdminModule { }
