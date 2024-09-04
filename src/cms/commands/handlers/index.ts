import { CreateSectionHandler } from "./create-section.handler";
import { PublishSectionHandler } from "./publish-section.handler";
import { ReparentSectionHandler } from "./reparent-section.handler";
import { UnPublishSectionHandler } from "./un-publish-section.handler";
import { UpdateSectionHandler } from "./update-section.handler";

export const CommandHandlers = [
    CreateSectionHandler,
    UpdateSectionHandler,
    PublishSectionHandler,
    UnPublishSectionHandler,
    ReparentSectionHandler
];