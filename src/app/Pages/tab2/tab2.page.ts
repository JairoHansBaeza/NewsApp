import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { Article } from 'src/app/interfaces';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  @ViewChild(IonInfiniteScroll,{static:true}) infiniteScroll: IonInfiniteScroll;
  titulo = 'Headers';
  page = 1;
  articles: Article[]=[];
  categories: string[] = ['business','entertainment','general','health','science','sports','technology'];
  selectedCategory: string;
  constructor(private newsService: NewsService) {}

  ngOnInit(){
    this.selectedCategory = this.categories[0];
    this.newsService.getNewsData(this.page).subscribe(resp=>{
      console.log(resp.articles);
      this.articles = resp.articles;
    });
  }
  segmentChanged(event: any) {
    this.infiniteScroll.disabled = false;
    this.page = 1;
    console.log(event.detail.value);
    this.selectedCategory = event.detail.value;
    this.newsService.getNewsDataByCategory(this.page,this.selectedCategory).subscribe(resp=>{
      // console.log(resp.articles);
      this.articles = resp.articles;
    });
  }
  loadData(event: any) {
    this.page++;
    console.log(event);
    this.newsService.getNewsDataByCategory(this.page,this.selectedCategory).subscribe(resp=>{
      // console.log(resp.articles);
      if(resp.articles.length === 0) {
        this.infiniteScroll.disabled = true;
      }
      this.articles = [...this.articles, ...resp.articles];
      this.infiniteScroll.complete();
    });
  }
}
