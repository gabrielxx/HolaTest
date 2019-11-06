import { Routes, RouterModule } from '@angular/router';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { AdminComponent } from './admin.component';
import { NewsComponent } from './news/news.component';
import { UsersComponent } from './users/users.component';


const redirectUnauthorizedToHome = () => redirectUnauthorizedTo(['/login']);
const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToHome },
    children: [
      { path: '', component: NewsComponent },
      { path: 'users', component: UsersComponent  },
    ]
  },
];
export const ADMIN_ROUTES = RouterModule.forChild(routes)