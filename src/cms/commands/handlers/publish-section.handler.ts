import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { PublishSectionCommand } from "../impl/publish-section.command";
import { Repository } from "typeorm";
import { Section } from "../../model/section.model";
import { InjectRepository } from "@nestjs/typeorm";

@CommandHandler(PublishSectionCommand)
export class PublishSectionHandler implements ICommandHandler<PublishSectionCommand> {
    constructor(@InjectRepository(Section) private readonly repository: Repository<Section>) { }

    async execute(command: PublishSectionCommand): Promise<void> {
        const section = await this.repository.findOne({ where: { id: command.id } });
        section.isPublished = true;
        section.updates.updated_by = command.publishedBy;
        section.updates.updated_at = command.publishedAt;
        section.updates.published_by = command.publishedBy;
        section.updates.published_at = command.publishedAt;
        await this.repository.save(section);
    }
}