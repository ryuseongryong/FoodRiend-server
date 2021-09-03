import { FriendService } from './friend.service';
export declare class FriendController {
    private readonly friendService;
    constructor(friendService: FriendService);
    create(id: string): void;
    findAll(id: string): void;
    remove(id: string): void;
}
