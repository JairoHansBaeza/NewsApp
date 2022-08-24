import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NewsResponse } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private http: HttpClient) { }

  getNewsData()  {
    // eslint-disable-next-line max-len
    return this.http.get<NewsResponse>('https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=6e40701d83754b7284c9b6368d0be38c');
  }
}
