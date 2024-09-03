import { PickType } from "@nestjs/swagger";
import { Article } from "./article.dto";

export class ArticleItem extends PickType(Article, ['id', 'title', 'slug', 'published', 'inMenu', 'isDefault', 'language', 'order',]) {

}