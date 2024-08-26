import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Member } from "../model/members/member.model";
import { MemberCard } from "../model/members/card.model";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(Member)
    private readonly repository: Repository<Member>,
    @InjectRepository(MemberCard)
    private readonly cards: Repository<MemberCard>,
  ) { }

  async exists(cardNumber: string): Promise<boolean> {
    return await this.repository.existsBy({
      cardNumber: cardNumber,
    });
  }

  async nextCard() {
    var card = await this.cards.findOneBy({
      id: "card",
    });
    card.last++;
    await this.cards.save(card);
    return `PLUG-${card.last.toString().padStart(4, "0")}`;
  }
}
