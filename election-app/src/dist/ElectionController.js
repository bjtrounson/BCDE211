export var SortStates;
(function (SortStates) {
    SortStates[SortStates["Name"] = 0] = "Name";
    SortStates[SortStates["Votes"] = 1] = "Votes";
})(SortStates || (SortStates = {}));
export class ElectionController {
    constructor(model) {
        this.model = model;
    }
    addParty(name, votes) {
        this.model.addParty(name, votes);
    }
    getParties() {
        return this.model.getAllParties();
    }
    deleteParty(targetPartyIndex) {
        this.model.removeParty(targetPartyIndex);
    }
    findParties(targetParty) {
        if (!targetParty || targetParty === '') {
            return this.model.getAllParties();
        }
        return this.model.filterNames(targetParty);
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
    editParty(editState, party) {
        this.model.editParty(editState, party);
    }
    getTotalPartyVotes() {
        return this.model.calulateTotalPartyVotes();
    }
    getPartyPercentage(party) {
        return this.model.calulatePartyPercentage(party);
    }
    getEditPartyCache() {
        return { "id": this.model.editedPartyIndex, "party": this.model.editedParty };
    }
    sortParties(sortState) {
        switch (sortState) {
            case SortStates.Name:
                this.model.sortPartiesNames();
                break;
            case SortStates.Votes:
                this.model.sortPartiesVotes();
                break;
            default:
                break;
        }
    }
}
