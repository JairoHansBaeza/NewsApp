import { Component, Input, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { Article } from 'src/app/interfaces';
import { Share } from '@capacitor/share';
import { StorageService } from 'src/app/services/storage.service';
// Importar el InAppBrowser //
@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {
  @Input() article: Article;
  @Input() index: number;
  constructor(private actionSheetCtrl: ActionSheetController, private storageService: StorageService) { }

  ngOnInit() {}

  openArticle() {
    window.open(this.article.url,'_blank');
  }
  async openMenu() {
    const articleInFavorites = this.storageService.articlesInFavorites(this.article);

    const actionSheet = await this.actionSheetCtrl.create({
      header: 'options',
      buttons: [
        {
          text:'Share',
          icon:'share-outline',
          handler: ()=>this.shareArticle()
        },
        {
          text: articleInFavorites ? 'Remove' : 'Favorites',
          icon: articleInFavorites ? 'heart' : 'heart-outline',
          handler: ()=>this.onToggleFavorite()
        },
        {
          text:'Cancel',
          icon:'close-outline',
          role:'cancel'
        }
      ]
    });
    await actionSheet.present();
   }
   async shareArticle() {
    console.log('Shared news..');
    await Share.share({
      title:this.article.title,
      text:this.article.source.name,
      url:this.article.url
    });
   }
   onToggleFavorite() {
    console.log('Favorites news..');
    this.storageService.savesOrRemoveArticle(this.article);
   }
}
