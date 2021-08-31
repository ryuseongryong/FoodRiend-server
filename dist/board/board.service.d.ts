import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
export declare class BoardService {
    create(createBoardDto: CreateBoardDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateBoardDto: UpdateBoardDto): string;
    remove(id: number): string;
}
