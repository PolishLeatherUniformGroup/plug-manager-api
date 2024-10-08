import { Injectable, Logger } from "@nestjs/common";
import { Member } from "../model/members/member.model";
import { OverrideFee } from "../dto/requests/overrride-fee";
import { MapperService } from "./maper.service";
import { CommandBus, QueryBus } from "@ocoda/event-sourcing";
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
import { MembershipFee } from "../dto/requests/membership-fee";
import { ImportedMember } from "../domain/member-import";
import { ActivateMemberCommand } from "../commands/impl/member/member-activate.command";

@Injectable()
export class MemberService {

  private readonly logger = new Logger(MemberService.name);
  constructor(
    private readonly mapperService: MapperService,
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) { }

  async exists(cardNumber: string): Promise<boolean> {
    this.logger.log(`Checking if member exists ${cardNumber}`);
    const query: GetMember = this.mapperService.buildGetMemberQuery(cardNumber);
    const result = await this.queryBus.execute<GetMember, Member | null>(query);
    const exist = result !== null;
    this.logger.log(`Member ${cardNumber} exists: ${exist}`);
    return exist;
  }

  public async importMembers(body: Import) {
    this.logger.log(`Importing members ${JSON.stringify(body)}`);
    const data = body.members.map(m => ({
      cardNumber: m.cardNumber,
      firstName: m.firstName,
      lastName: m.lastName,
      email: m.email,
      joinDate: m.joinDate,
      birthDate: m.birthDate,
      phone: m.phone,
      address: m.address ? m.address : undefined,
    } as ImportedMember));
    const commansd = new MemberImport(data);
    await this.commandBus.execute(commansd);
  }

  async activate(id: string) {
    const command = new ActivateMemberCommand(id);
    await this.commandBus.execute(command);
  }

  public async requestFee(idOrCard: string, body: MembershipFee): Promise<void> {
    let command = this.mapperService.mapToMemberFeeRequested(idOrCard, body);
    await this.commandBus.execute(command);
  }

  public async overrideFee(idOrCard: string, body: OverrideFee): Promise<void> {
    let command = this.mapperService.mapToOverrideFeeRequested(idOrCard, body);
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
