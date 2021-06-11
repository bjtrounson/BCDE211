const STORAGE_KEY = 'electionListBen';
export class Party {
    constructor(newId, newName, newVotes) {
        this.id = newId;
        this.name = newName;
        this.votes = newVotes;
    }
}
export var Editing;
(function (Editing) {
    Editing[Editing["Start"] = 0] = "Start";
    Editing[Editing["Done"] = 1] = "Done";
    Editing[Editing["Cancel"] = 2] = "Cancel";
})(Editing || (Editing = {}));
export class ElectionList {
    constructor() {
        this.allMyParties = [];
        this.editedParty = null;
        this.editedPartyIndex = null;
        this.beforeEditNameCache = '';
        this.beforeEditVoteCache = 0;
    }
    filterAboveVotes(filterLimit) {
        var filterArray = [];
        this.allMyParties.forEach(party => {
            if (party.votes >= filterLimit) {
                filterArray.push(party);
            }
        });
        return filterArray;
    }
    filterBelowVotes(filterLimit) {
        var filterArray = [];
        this.allMyParties.forEach(party => {
            if (party.votes <= filterLimit) {
                filterArray.push(party);
            }
        });
        return filterArray;
    }
    getAllParties() {
        return this.allMyParties;
    }
    load() {
        return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    }
    save() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.allMyParties));
    }
    addParty(newName, newVotes) {
        newName = newName.trim();
        if (!newName || newName === '') {
            return;
        }
        if (!newVotes) {
            newVotes = 0;
        }
        const newId = this.allMyParties.length + 1;
        const aNewParty = new Party(newId, newName, newVotes);
        this.allMyParties.push(aNewParty);
    }
    removeParty(targetPartyIndex) {
        this.allMyParties.splice(targetPartyIndex, 1);
    }
    editParty(editingState, party) {
        switch (editingState) {
            case Editing.Start:
                this.beforeEditNameCache = party.name;
                this.beforeEditVoteCache = party.votes;
                this.editedPartyIndex = party.id;
                this.editedParty = party;
                break;
            case Editing.Done:
                if (!party) {
                    return;
                }
                party.name = party.name.trim();
                if (!party.name) {
                    party.name = this.beforeEditNameCache;
                }
                break;
            case Editing.Cancel:
                this.editedPartyIndex = null;
                this.editedParty = null;
                party.name = this.beforeEditNameCache;
                party.votes = this.beforeEditVoteCache;
                break;
            default:
                break;
        }
    }
    removeAllParties() {
        this.allMyParties = [];
    }
    sortPartiesNames() {
        this.allMyParties.sort(function (a, b) {
            if (a.name < b.name) {
                return -1;
            }
            if (a.name > b.name) {
                return 1;
            }
            return 0;
        });
    }
    sortPartiesVotes() {
        this.allMyParties.sort(function (a, b) {
            if (a.votes < b.votes) {
                return -1;
            }
            if (a.votes > b.votes) {
                return 1;
            }
            return 0;
        });
    }
    findParty(targetName, targetVotes) {
        return this.allMyParties.find((party) => party.name === targetName && party.votes === targetVotes);
    }
    calulateTotalPartyVotes() {
        var totalVotes = 0;
        this.allMyParties.forEach(party => {
            totalVotes += party.votes;
        });
        return totalVotes;
    }
    calulatePartyPercentage(party) {
        var votePercentage = (party.votes / this.calulateTotalPartyVotes()) * 100;
        if (votePercentage >= 100) {
            return 100;
        }
        return parseInt(votePercentage.toFixed(2));
    }
}
