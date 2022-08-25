import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { Article } from 'src/app/interfaces';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  @ViewChild(IonInfiniteScroll,{static:true}) infiniteScroll;

  public articles: Article[]=[];
  page = 1;

  constructor(private service: NewsService) {}

  ngOnInit(): void {
    this.service.getNewsData(this.page).subscribe(resp=>{
      console.log(resp.articles);
      this.articles = resp.articles;
    });
  }

  loadData(event) {
    this.page++;
    console.log(event);
    this.service.getNewsData(this.page).subscribe(resp=>{
      // console.log(resp.articles);
      if(resp.articles.length === 0) {
        this.infiniteScroll.disabled = true;
      }
      this.articles = [...this.articles, ...resp.articles];
      this.infiniteScroll.complete();
    });
  }
}
