import { ElectionList, Party, Editing } from "./ElectionModel";

interface EditCache {
    id: number | null,
    party: Party | null
}

export enum SortStates {
    Name,
    Votes
}

export enum FilterStates {
    Above,
    Below
}

export interface ElectionController {
    model: ElectionList
}

export class ElectionController implements ElectionController {
    model: ElectionList;

    constructor (model: ElectionList) {
        this.model = model;
    }
    
    addParty(name: string, votes: number) {
        this.model.addParty(name, votes);
    }

    getParties(): Array<Party> {
        return this.model.getAllParties();
    }

    deleteParty(targetPartyIndex: number) {
        this.model.removeParty(targetPartyIndex)
    }

    findParties(targetName: string, targetVotes: number) {
        if (this.model.findParty(targetName, targetVotes) === undefined) {
            return new Party(0, "", 0);
        }
        return this.model.findParty(targetName, targetVotes)
    }

    clearParties() {
        this.model.removeAllParties();
    }

    saveParties() {
        this.model.save();
    }

    loadParties() {
        this.model.allMyParties = this.model.load();
    }

    editParty(editState: Editing, party: Party) {
        this.model.editParty(editState, party)
    }

    getTotalPartyVotes() {
        return this.model.calulateTotalPartyVotes()
    }

    getPartyPercentage(party: Party) {
        return this.model.calulatePartyPercentage(party)
    }

    getEditPartyCache(): EditCache {
        return { "id": this.model.editedPartyIndex, "party": this.model.editedParty}
    }

    sortParties(sortState: SortStates) {
        switch (sortState) {
            case SortStates.Name:
                this.model.sortPartiesNames()
                break;
            case SortStates.Votes:
                this.model.sortPartiesVotes()
                break;
            default:
                break;
        }
    }

    filterParties(filterLimit: number, filterState: FilterStates): Array<Party> | null {
        switch (filterState) {
            case FilterStates.Above:
                return this.model.filterAboveVotes(filterLimit);
            case FilterStates.Below:
                return this.model.filterBelowVotes(filterLimit);
            default:
                return null
        }
    }
}