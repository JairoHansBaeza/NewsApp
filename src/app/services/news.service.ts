import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { NewsResponse } from '../interfaces';

const apiKey = environment.apiKey;
const urlBase = environment.urlBase;

@Injectable({
  providedIn: 'root',
})
export class NewsService {

  constructor(private http: HttpClient) { }

  getNewsData(page: number)  {
    return this.http.get<NewsResponse>(`${urlBase}/top-headlines`,{
      params:{
      country:'us',
      category:'business',
      apiKey:apiKey,
      page:page
      }
    });
  }
  getNewsDataByCategory(page: number,category: string)  {
    return this.http.get<NewsResponse>(`${urlBase}/top-headlines`,{
      params:{
      country:'us',
      category:category,
      apiKey:apiKey,
      page:page
      }
    });
  }
}
