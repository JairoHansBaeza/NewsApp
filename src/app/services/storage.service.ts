/* eslint-disable no-trailing-spaces */
/* eslint-disable eqeqeq */
/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Article } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage | null = null;
  private _articles: Article[] = [];

  constructor(private storage: Storage) {
    this.init();
   }
  /* Pendiente...*/

  getLocalArticles(){
    return [...this._articles];
  }
  
  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
    await this.loadFavorites();
  }
  async savesOrRemoveArticle(article: Article) {
    const exists = this._articles.find(art=>art.title===article.title);
    if (exists) {
      this._articles = this._articles.filter(art=>art.title!=article.title);
    }
    else {
      this._articles = [article,...this._articles];
    }
    // this._articles = [article,...this._articles];
    this._storage.set('articles',this._articles);
  }
  async loadFavorites(){
    try{
      const articles = await this._storage.get('articles');
      this._articles = articles || [];
    }catch(error){
      console.log(error);
    }
  }
  articlesInFavorites(article: Article){
    return !!this._articles.find(art=>art.title===article.title);
  }
}
