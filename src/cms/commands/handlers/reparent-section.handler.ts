import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Repository } from "typeorm";
import { Section } from "../../model/section.model";
import { InjectRepository } from "@nestjs/typeorm";
import { ReparentSectionCommand } from "../impl/reparent-section.command";

@CommandHandler(ReparentSectionCommand)
export class ReparentSectionHandler implements ICommandHandler<ReparentSectionCommand> {
    constructor(@InjectRepository(Section) private readonly repository: Repository<Section>) { }

    async execute(command: ReparentSectionCommand): Promise<void> {
        const section = await this.repository.findOne({ where: { id: command.id } });
        let newParent;
        if (command.parentId) {
            newParent = await this.repository.findOne({ where: { id: command.parentId } });
        } else {
            section.parent = null;
            await this.repository.save(section);
            return;
        }

        if (newParent) {
            section.parent = newParent;
            await this.repository.save(section);
            return;
        }
        throw new Error('Parent not found');
    }
}