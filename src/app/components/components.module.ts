import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ArticlesComponent } from './articles/articles.component';
import { ArticleComponent } from './article/article.component';
import { HeaderComponent } from './header/header.component';



@NgModule({
  declarations: [
    ArticlesComponent,
    ArticleComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    ArticlesComponent,
    HeaderComponent
  ]
})
export class ComponentsModule { }
