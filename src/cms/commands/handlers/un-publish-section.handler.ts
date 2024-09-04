import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Repository } from "typeorm";
import { Section } from "../../model/section.model";
import { InjectRepository } from "@nestjs/typeorm";
import { UnPublishSectionCommand } from "../impl/un-publish-section.command";

@CommandHandler(UnPublishSectionCommand)
export class UnPublishSectionHandler implements ICommandHandler<UnPublishSectionCommand> {
    constructor(@InjectRepository(Section) private readonly repository: Repository<Section>) { }

    async execute(command: UnPublishSectionCommand): Promise<void> {
        const section = await this.repository.findOne({ where: { id: command.id } });
        section.isPublished = false;
        section.updates.updated_by = command.updatedBy
        section.updates.updated_at = command.updatedAt;

        await this.repository.save(section);
    }
}