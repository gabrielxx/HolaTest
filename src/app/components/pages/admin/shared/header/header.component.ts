import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'admin-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {

  public userData : any;
  constructor(private router : Router, private afAuth: AngularFireAuth) { }

  ngOnInit() {
    this.onLoadDataUser()
  }

  onLogoutUser(){
    this.afAuth.auth.signOut();
    this.router.navigate(['/login']);
  }
  onLoadDataUser(){
    this.afAuth.user.subscribe( data => {
      this.userData = data;
    })
  }
}
