import { Request } from 'express';
export declare class CatsController {
    create(): string;
    findAll(request: Request): string;
    findOne(params: any): string;
}
