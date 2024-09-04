import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateSectionCommand } from "../impl/create-section.command";
import { Section } from "../../model/section.model";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Language } from "../../model/language.model";
import { Metadata } from "../../model/metadata.model";
import { Updates } from "../../model/updates.model";

@CommandHandler(CreateSectionCommand)
export class CreateSectionHandler implements ICommandHandler<CreateSectionCommand> {
  constructor(@InjectRepository(Section) private readonly repository: Repository<Section>) { }

  async execute(command: CreateSectionCommand): Promise<void> {
    const section = this.repository.create();
    section.title = command.title;
    section.slug = command.slug;

    const language = new Language();
    language.code = command.language;
    section.language = language;

    section.order = command.order;
    section.isPublished = false;
    section.showInMenu = command.showInMenu;
    if (command.parent) {
      section.parent = await this.repository.findOne({ where: { id: command.parent } });
    }
    const metadata = new Metadata();
    metadata.description = command.description;
    metadata.keywords = command.keywords.join(',');
    section.metadata = metadata;

    const udpates = new Updates();
    udpates.created_by = command.createdBy;
    udpates.created_at = new Date();

    await this.repository.save(section);
  }
}