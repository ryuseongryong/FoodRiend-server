import { BoardService } from './board.service';
export declare class BoardController {
    private readonly boardService;
    constructor(boardService: BoardService);
    create(id: string): void;
    remove(id: string): void;
}
