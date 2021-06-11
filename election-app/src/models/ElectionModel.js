var STORAGE_KEY = 'electionListBen';
var Party = /** @class */ (function () {
    function Party(newId, newName, newVotes) {
        this.id = newId;
        this.name = newName;
        this.votes = newVotes;
    }
    return Party;
}());
export { Party };
var ElectionList = /** @class */ (function () {
    function ElectionList() {
        this.allMyParties = [];
        this.editedParty = {};
        this.editedPartyIndex = null;
        this.beforeEditNameCache = '';
        this.beforeEditVoteCache = 0;
    }
    ElectionList.prototype.filterAbove = function (newVotes) {
        var filter = this.allMyParties.filter(function (party) {
            return party.votes >= newVotes;
        });
        return filter;
    };
    ElectionList.prototype.filterBelow = function (newVotes) {
        var filter = this.allMyParties.filter(function (party) {
            return party.votes <= newVotes;
        });
        return filter;
    };
    ElectionList.prototype.getAllParties = function () {
        return this.allMyParties;
    };
    ElectionList.prototype.load = function () {
        return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    };
    ElectionList.prototype.save = function () {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.allMyParties));
    };
    ElectionList.prototype.addParty = function (newName, newVotes) {
        newName = newName.trim();
        if (!newName) {
            return;
        }
        if (!newVotes) {
            newVotes = 0;
        }
        var newId = this.allMyParties.length + 1;
        var aNewParty = new Party(newId, newName, newVotes);
        this.allMyParties.push(aNewParty);
    };
    ElectionList.prototype.removeParty = function (targetPartyName) {
        var index = this.allMyParties.findIndex(function (party) { return party.name === targetPartyName; });
        this.allMyParties.splice(index, 1);
    };
    ElectionList.prototype.startEditing = function (party) {
        this.beforeEditNameCache = party.name;
        this.beforeEditVoteCache = party.votes;
        this.editedParty = party;
    };
    ElectionList.prototype.doneEditing = function (party) {
        if (!party) {
            return;
        }
        this.editedParty = 0;
        party.name = party.name.trim();
        if (!party.name) {
            this.removeParty(party.name);
        }
    };
    ElectionList.prototype.cancelEditing = function (party) {
        this.editedParty = 0;
        party.name = this.beforeEditNameCache;
        party.votes = this.beforeEditVoteCache;
    };
    ElectionList.prototype.removeAllParties = function () {
        this.allMyParties = [];
    };
    ElectionList.prototype.sortParties = function () {
        this.allMyParties.sort(function (a, b) {
            if (a.name < b.name) {
                return -1;
            }
            if (a.name > b.name) {
                return 1;
            }
            return 0;
        });
    };
    ElectionList.prototype.findParty = function (targetParty) {
        return this.allMyParties.find(function (party) { return party.name === targetParty; });
    };
    return ElectionList;
}());
export { ElectionList };
