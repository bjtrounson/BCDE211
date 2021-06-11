export interface Party {
    id: number;
    name: string;
    votes: number;
}
export declare class Party implements Party {
    constructor(newId: number, newName: string, newVotes: number);
}
export interface ElectionList {
    allMyParties: Array<Party>;
    editedParty: Party | null;
    editedPartyIndex: number | null;
    beforeEditNameCache: string;
    beforeEditVoteCache: number;
}
export declare enum Editing {
    Start = 0,
    Done = 1,
    Cancel = 2
}
export declare class ElectionList implements ElectionList {
    allMyParties: Array<Party>;
    editedParty: Party | null;
    editedPartyIndex: number | null;
    beforeEditNameCache: string;
    beforeEditVoteCache: number;
    constructor();
    filterVotes(filterVotes: number): Party[];
    filterNames(filterNames: string): Party[];
    getAllParties(): Party[];
    load(): Array<Party>;
    save(): void;
    addParty(newName: string, newVotes: number): void;
    removeParty(targetPartyIndex: number): void;
    editParty(editingState: Editing, party: Party): void;
    removeAllParties(): void;
    sortPartiesNames(): void;
    sortPartiesVotes(): void;
    findParty(targetParty: string): Party | undefined;
    calulateTotalPartyVotes(): number;
    calulatePartyPercentage(party: Party): number;
}
