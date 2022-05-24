import { IsEmail, IsInt, IsString, MaxLength, Min } from "class-validator";

export class PersonSchema{
    @IsString()
    @MaxLength(120)
    name: string;

    @IsInt()
    @Min(1)
    age: number;

    @IsString()
    @IsEmail()
    @MaxLength(255)
    email: string;
}