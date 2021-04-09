/* globals localStorage */

const STORAGE_KEY = 'electionListBen'

class Party { // eslint-disable-line no-unused-vars
    constructor (newId, newName, newVotes) { 
        this.id = newId
        this.name = newName
        this.votes = newVotes
    }
}

class ElectionList { 
    constructor () { // eslint-disable-line no-unused-vars
        this.allMyParties = []
        this.editedParty = null
        this.editedPartyIndex = null
        this.beforeEditNameCache = ''
        this.beforeEditVoteCache = 0
    }

    filterAbove(newVotes) {
        var filter = this.allMyParties.filter(function (party) {
            return party.votes >= newVotes;
        })
        return filter
    }

    filterBelow(newVotes) {
        var filter = this.allMyParties.filter(function (party) {
            return party.votes <= newVotes;
        })
        return filter
    }

    getAllParties() { 
        return this.allMyParties
    }

    load() {
        return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    }

    save() { 
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.allMyParties))
    }

    addParty(newName, newVotes) { 
        newName = newName.trim()
        if (!newName) { 
            return
        }
        const newId = this.allMyParties.length + 1
        const aNewParty = new Party(newId, newName, newVotes)
        this.allMyParties.push(aNewParty)
    }

    removeParty(targetPartyName) { 
        const index = this.allMyParties.findIndex(party => party.name === targetPartyName)
        this.allMyParties.splice(index, 1)
    }

    startEditing(party) { 
        this.beforeEditNameCache = party.name
        this.beforeEditVoteCache = party.votes
        this.editedParty = party
    }

    doneEditing(party) {
        if (!party) { 
            return
        }
        this.editedParty = null
        party.name = party.name.trim()
        if (!party.name) { 
            this.removeParty(party)
        }
    }

    cancelEditing(party) { 
        this.editedParty = null
        party.name = this.beforeEditNameCache
        party.votes = this.beforeEditVoteCache
    }

    removeAllParties() { 
        this.allMyParties = []
    }

    sortParties() {
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

    findParty(targetParty) { 
        return this.allMyParties.find((party) => party.name === targetParty)
    }
}