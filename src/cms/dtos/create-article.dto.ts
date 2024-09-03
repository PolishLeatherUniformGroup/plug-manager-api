import { OmitType } from "@nestjs/swagger"
import { Article } from "./article.dto";

export class CreateArticle extends OmitType(Article, ["id"]) {
}