declare const STORAGE_KEY = "electionListBen";
interface Party {
    id: number;
    name: string;
    votes: number;
}
declare class Party {
    constructor(newId: number, newName: string, newVotes: number);
}
declare class ElectionList {
    allMyParties: Array<Party>;
    editedParty: Object;
    editedPartyIndex: number;
    beforeEditNameCache: string;
    beforeEditVoteCache: number;
    constructor();
    filterAbove(newVotes: number): Party[];
    filterBelow(newVotes: number): Party[];
    getAllParties(): Party[];
    load(): any;
    save(): void;
    addParty(newName: string, newVotes: number): void;
    removeParty(targetPartyName: string): void;
    startEditing(party: Party): void;
    doneEditing(party: Party): void;
    cancelEditing(party: Party): void;
    removeAllParties(): void;
    sortParties(): void;
    findParty(targetParty: string): Party | undefined;
}
