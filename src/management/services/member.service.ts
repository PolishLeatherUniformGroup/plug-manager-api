import { Injectable, Logger } from "@nestjs/common";
import { Repository } from "typeorm";
import { Member } from "../model/members/member.model";
import { MemberCard } from "../model/members/card.model";
import { InjectRepository } from "@nestjs/typeorm";
import { MembershipFee } from "../dto/requests/membership-fee";
import { MapperService } from "./maper.service";
import { CommandBus, getQueryMetadata, QueryBus } from "@ocoda/event-sourcing";
import { MembershipFeePayment } from "../dto/requests/membership-fee-payment";
import { Suspension } from "../dto/requests/suspension.request";
import { Appeal } from "../dto/requests/appeal.request";
import { AppealDecision } from "../dto/requests/decision.request";
import { Expulsion } from "../dto/requests/expulsion.request";
import { ContactData } from "../dto/requests/contact-data.request";
import { Member as MemberDto } from "../dto/responses/member";
import { MemberStatus } from "../domain/member/member-status.enum";
import { YearlyFee } from "../dto/responses/yearly-fee";
import { Import } from "../dto/requests/import";
import { MemberImport } from "../commands/impl/member/member-import.command";
import { GetMember } from "../queries/impl/member/get-member.query";

@Injectable()
export class MemberService {

  private readonly logger = new Logger(MemberService.name);
  constructor( 
    @InjectRepository(MemberCard)
    private readonly cards: Repository<MemberCard>,
    private readonly mapperService: MapperService,
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) { }

  async exists(cardNumber: string): Promise<boolean> {
    this.logger.log(`Checking if member exists ${cardNumber}`);
    const query:GetMember = this.mapperService.buildGetMemberQuery(cardNumber);
    this.logger.log(`Query ${JSON.stringify(query)}`);
    const result = await this.queryBus.execute<GetMember, Member|null>(query);
    this.logger.log(`Result ${JSON.stringify(result)}`);
    const exist = result !== null;
    this.logger.log(`Member ${cardNumber} exists: ${exist}`);
    return exist;
  }

  async nextCard() {
    var card = await this.cards.findOneBy({
      id: "card",
    });
    card.last++;
    await this.cards.save(card);
    return `PLUG-${card.last.toString().padStart(4, "0")}`;
  }

  public async importMembers(body: Import) {
    const commansd = new MemberImport(body.members);
    await this.commandBus.execute(commansd);
  }

  public async requestFee(idOrCard: string, body: MembershipFee): Promise<void> {
    let command = this.mapperService.mapToMemberFeeRequested(idOrCard, body);
    await this.commandBus.execute(command);
  }

  public async payFee(idOrCard: string, year: number, body: MembershipFeePayment): Promise<void> {
    let command = this.mapperService.mapToMemberFeePaymentRequested(idOrCard, year, body);
    await this.commandBus.execute(command);
  }

  public async suspend(idOrCard: string, body: Suspension): Promise<void> {
    let command = this.mapperService.mapToMemberSuspended(idOrCard, body);
    await this.commandBus.execute(command);
  }

  public async appealSuspension(idOrCard: string, body: Appeal): Promise<void> {
    let command = this.mapperService.mapToMemberAppealSuspended(idOrCard, body);
    await this.commandBus.execute(command);
  }

  public async makeSuspensionAppealDecision(idOrCard: string, body: AppealDecision): Promise<void> {
    let command = this.mapperService.mapToMemberSuspendedAppealDecision(idOrCard, body);
    await this.commandBus.execute(command);
  }

  public async expell(idOrCard: string, body: Expulsion): Promise<void> {
    let command = this.mapperService.mapToMemberExpelled(idOrCard, body);
    await this.commandBus.execute(command);
  }

  public async appealExpell(idOrCard: string, body: Appeal): Promise<void> {
    let command = this.mapperService.mapToMemberAppealExpelled(idOrCard, body);
    await this.commandBus.execute(command);
  }

  public async makeExpulsionAppealDecision(idOrCard: string, body: AppealDecision): Promise<void> {
    let command = this.mapperService.mapToMemberExpelledAppealDecision(idOrCard, body);
    await this.commandBus.execute(command);
  }

  public async updateContactData(idOrCard: string, body: ContactData): Promise<void> {
    let command = this.mapperService.mapToMemberContactDataUpdated(idOrCard, body);
    await this.commandBus.execute(command);
  }

  public async getMember(idOrCard: string): Promise<MemberDto | null> {
    let query = this.mapperService.buildGetMemberQuery(idOrCard);
    let result = await this.queryBus.execute(query);
    return this.mapperService.mapToMemberDto(result);
  }

  public async getMembers(status?: MemberStatus): Promise<MemberDto[]> {
    let query = this.mapperService.buildGetMembersQuery();
    let results = await this.queryBus.execute(query);
    return results.map(r => this.mapperService.mapToMemberDto(r));
  }

  public async getMemberFees(idOrCard: string): Promise<YearlyFee[]> {
    let query = this.mapperService.buildGetMemberFeesQuery(idOrCard);
    let results = await this.queryBus.execute(query);
    return results.map(r => this.mapperService.mapToYearlyFee(r));
  }

  public async getMemberSuspensions(idOrCard: string): Promise<Suspension[]> {
    let query = this.mapperService.buildGetMemberSuspensionsQuery(idOrCard);
    let results = await this.queryBus.execute(query);
    return results.map(r => this.mapperService.mapToSuspension(r));
  }

  public async getMemberExpulsions(idOrCard: string): Promise<Expulsion[]> {
    let query = this.mapperService.buildGetMemberExpulsionsQuery(idOrCard);
    let results = await this.queryBus.execute(query);
    return results.map(r => this.mapperService.mapToExpulsion(r));
  }

}
