import { Routes, RouterModule } from '@angular/router';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { NewsComponent } from './news/news.component';
import { AdminComponent } from './admin.component';


const redirectUnauthorizedToHome = () => redirectUnauthorizedTo(['/login']);
const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToHome },
    children: [
      { path: '', component: NewsComponent },
    ]
  },
];
export const ADMIN_ROUTES = RouterModule.forChild(routes)