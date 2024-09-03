import { OmitType } from "@nestjs/swagger";
import { Article } from "./article.dto";

export class ArticleResult extends OmitType(Article, ['metadata']) {
}