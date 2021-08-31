import { SearchService } from './search.service';
export declare class SearchController {
    private readonly searchService;
    constructor(searchService: SearchService);
    findAll(id: string, query: string): void;
    findOne(id: string, query: string): void;
    update(id: string): void;
    remove(id: string): void;
}
