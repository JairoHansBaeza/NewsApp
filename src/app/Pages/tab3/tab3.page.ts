/* eslint-disable @typescript-eslint/member-ordering */
import { Component } from '@angular/core';
import { Article } from 'src/app/interfaces';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  titulo = 'Favorites';

  get articles(): Article[]{
    return this.storageService.getLocalArticles();
  }
  constructor(private storageService: StorageService) {}
}
