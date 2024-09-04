import { CommandHandler, ICommandHandler } from "@ocoda/event-sourcing";
import { UpdateSectionCommand } from "../impl/update-section.command";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Section } from "../../model/section.model";
import { Metadata } from "../../model/metadata.model";

@CommandHandler(UpdateSectionCommand)
export class UpdateSectionHandler implements ICommandHandler<UpdateSectionCommand> {
    constructor(@InjectRepository(Section) private readonly repository: Repository<Section>) { }

    async execute(command: UpdateSectionCommand): Promise<void> {
        const section = await this.repository.findOne({ where: { id: command.id } });

        section.title = command.title;
        section.showInMenu = command.showInMenu;
        section.updates.updated_by = command.updatedBy;
        section.updates.updated_at = command.updatedAt;
        if(section.metadata === undefined){
            section.metadata = new Metadata();
        }
        section.metadata.description = command.description;
        section.metadata.keywords = command.keywords.join(',');
        
        await this.repository.save(section);
    }
}