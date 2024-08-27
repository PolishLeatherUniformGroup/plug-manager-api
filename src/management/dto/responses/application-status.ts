import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class ApplicationStatus {
    
    @ApiProperty()
    public order: number;
    
    @ApiProperty()
    public status: number;

    @ApiProperty()
    public statusText: string;

    @ApiProperty()
    public occured: Date;

    @ApiPropertyOptional()
    public comment?: string;
}