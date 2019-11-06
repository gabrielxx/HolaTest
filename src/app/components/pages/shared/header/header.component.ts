import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { NewsService } from '../../../../providers/news.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {

  public userData : any;
  constructor(private router : Router, private _newsService : NewsService ) { }
    //  private afAuth: AngularFireAuth

  ngOnInit() {
  }

  onSearchCategory(category){
    this._newsService.onFilterNews(category)
  }
}
