const STORAGE_KEY = 'electionListBen'

export interface Party {
    id: number,
    name: string,
    votes: number
}

export class Party implements Party { // eslint-disable-line no-unused-vars
    constructor (newId: number, newName: string, newVotes: number) { 
        this.id = newId
        this.name = newName
        this.votes = newVotes
    }
}

export interface ElectionList {
    allMyParties: Array<Party>,
    editedParty: Party | null,
    editedPartyIndex: number | null,
    beforeEditNameCache: string,
    beforeEditVoteCache: number,
}

export enum Editing {
    Start,
    Done,
    Cancel
}
  
export class ElectionList implements ElectionList {
    allMyParties: Array<Party>;
    editedParty: Party | null;
    editedPartyIndex: number | null;
    beforeEditNameCache: string;
    beforeEditVoteCache: number ;
    constructor () { // eslint-disable-line no-unused-vars
        this.allMyParties = []
        this.editedParty = null
        this.editedPartyIndex = null
        this.beforeEditNameCache = ''
        this.beforeEditVoteCache = 0
    }

    filterAboveVotes(filterLimit: number) {
        var filterArray: Array<Party> = []
        this.allMyParties.forEach(party => {
            if (party.votes >= filterLimit) {
                filterArray.push(party)
            }
        })
        return filterArray
    }

    filterBelowVotes(filterLimit: number) {
        var filterArray: Array<Party> = []
        this.allMyParties.forEach(party => {
            if (party.votes <= filterLimit) {
                filterArray.push(party)
            }
        })
        return filterArray
    }

    getAllParties() { 
        return this.allMyParties
    }

    load(): Array<Party> {
        return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    }

    save() { 
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.allMyParties))
    }

    addParty(newName: string, newVotes: number) { 
        newName = newName.trim()
        if (!newName || newName === '') { 
            return
        }
        if (!newVotes) {
            newVotes = 0
        }
        const newId = this.allMyParties.length + 1
        const aNewParty = new Party(newId, newName, newVotes)
        this.allMyParties.push(aNewParty)
    }

    removeParty(targetPartyIndex: number) { 
        this.allMyParties.splice(targetPartyIndex, 1)
    }
    
    editParty(editingState: Editing, party: Party) {
        switch (editingState) {
            case Editing.Start:
                this.beforeEditNameCache = party.name
                this.beforeEditVoteCache = party.votes
                this.editedPartyIndex = party.id
                this.editedParty = party
                break;
            case Editing.Done:
                if (!party) { 
                    return
                }
                party.name = party.name.trim()
                if (!party.name) { 
                    party.name = this.beforeEditNameCache
                }
                break;
            case Editing.Cancel:
                this.editedPartyIndex = null
                this.editedParty = null
                party.name = this.beforeEditNameCache
                party.votes = this.beforeEditVoteCache
                break;
            default:
                break;
        }
    }

    removeAllParties() { 
        this.allMyParties = []
    }

    sortPartiesNames() {
        this.allMyParties.sort(function (a, b) { 
            if (a.name < b.name) { 
                return -1
            }
            if (a.name > b.name) { 
                return 1
            }
            return 0
        })
    }

    sortPartiesVotes() {
        this.allMyParties.sort(function (a, b) {
            if (a.votes < b.votes) {
                return -1
            }
            if (a.votes > b.votes) {
                return 1
            }
            return 0
        })
    }

    findParty(targetName: string, targetVotes: number) { 
        return this.allMyParties.find((party) => party.name === targetName && party.votes === targetVotes)
    }

    calulateTotalPartyVotes(): number {
        var totalVotes: number = 0
        this.allMyParties.forEach(party => {
            totalVotes += party.votes
        })
        return totalVotes
    }

    calulatePartyPercentage(party: Party): number {
        var votePercentage: number = (party.votes / this.calulateTotalPartyVotes()) * 100
        if (votePercentage >= 100) {
            return 100
        }
        return parseInt(votePercentage.toFixed(2))
    }
}