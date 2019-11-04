import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewsService } from 'src/app/providers/news.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.less']

})
export class PagesComponent implements OnInit {
  
  public news: Observable<any[]>;

  constructor(private route: ActivatedRoute , private _newsService : NewsService ) { }

  ngOnInit() {
    this.onLoadNews()
  }
  onLoadNews(){
    this.news = this._newsService.onLoadNews();
    this._newsService.change.subscribe(News => {
      this.news = News
    });
  }
  

}
