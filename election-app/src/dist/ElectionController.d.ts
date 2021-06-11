import { ElectionList, Party, Editing } from "./ElectionModel";
interface EditCache {
    id: number | null;
    party: Party | null;
}
export declare enum SortStates {
    Name = 0,
    Votes = 1
}
export interface ElectionController {
    model: ElectionList;
}
export declare class ElectionController implements ElectionController {
    model: ElectionList;
    constructor(model: ElectionList);
    addParty(name: string, votes: number): void;
    getParties(): Array<Party>;
    deleteParty(targetPartyIndex: number): void;
    findParties(targetParty: string): Array<Party>;
    clearParties(): void;
    saveParties(): void;
    loadParties(): void;
    editParty(editState: Editing, party: Party): void;
    getTotalPartyVotes(): number;
    getPartyPercentage(party: Party): number;
    getEditPartyCache(): EditCache;
    sortParties(sortState: SortStates): void;
}
export {};
