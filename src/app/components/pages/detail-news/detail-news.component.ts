import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewsService, News } from '../../../providers/news.service';

@Component({
  selector: 'app-detail-news',
  templateUrl: './detail-news.component.html',
  styleUrls: ['./detail-news.component.less']
})
export class DetailNewsComponent implements OnInit {

  constructor(private route : ActivatedRoute, private _newsService : NewsService) { }
  public  id : string;
  public New : any;

  ngOnInit() {
    this.onLoadNewDetail()
  }
  onLoadNewDetail(){
    this.id = this.route.snapshot.paramMap.get("id")
    this._newsService.onLoadDetailNew(this.id).subscribe( (data) => {
      this.New = data
    });

  }
}
