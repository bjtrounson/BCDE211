/* globals describe it xdescribe xit beforeEach expect ElectionList localStorage STORAGE_KEY */
describe('ElectionList', function () {
  var thePartyList

  function getNames (allParties) {
    const allNames = []
    for (const aParty of allParties) {
      allNames.push(aParty.name)
    }
    return allNames
  }

  beforeEach(function () {
    thePartyList = new ElectionList()
  })

  describe('adding Parties', function () {
    // FEATURE 1. Create a whole that acts as a Facade for parts
    // FEATURE 2. Add a part
    describe('when a single Party with a name of "National" is added', function () {
      var theParty
      beforeEach(function () {
        thePartyList.addParty('National', 10000)
        theParty = thePartyList.allMyParties[0]
      })

      describe('the added single Party', function () {
        it('should have one party', function () {
          expect(thePartyList.allMyParties.length).toBe(1)
        })

        it('should have an id of 1', function () {
          expect(theParty.id).toBe(1)
        })

        it('should have a name of "National"', function () {
          expect(theParty.name).toBe('National', 10000)
        })
      })
    })

    describe('when three parties are added', function () {
      it('should have 3 parties', function () {
        thePartyList.addParty('National', 10000)
        thePartyList.addParty('Labour', 20000)
        thePartyList.addParty('Greens', 2000)
        expect(thePartyList.allMyParties.length).toBe(3)
      })
    })
  })

  // FEATURE 6. Save all parts to LocalStorage
  describe('save', function () {
    it('should save an party in localStorage when it kas a single item', function () {
      localStorage.clear()
      thePartyList = new ElectionList()
      thePartyList.addParty('National', 10000)
      thePartyList.save()
      var itemJSON = localStorage.getItem(STORAGE_KEY)
      expect(itemJSON).toBeTruthy()
    })

    it('should have the correct JSON for the correct party in localStorage', function () {
      localStorage.clear()
      thePartyList = new ElectionList()
      thePartyList.addParty('National', 10000)
      thePartyList.save()
      var itemJSON = localStorage.getItem(STORAGE_KEY)
      expect(itemJSON).toBe('[{"id":1,"name":"National","votes":10000}]')
    })
  })

  // FEATURE 7. Load all parts from LocalStorage
  describe('load', function () {
    it('should load an party from localStorage when it has a single party', function () {
      // save something
      localStorage.clear()
      thePartyList = new ElectionList()
      thePartyList.addParty('National', 10000)
      thePartyList.save()
      // the start the model again
      thePartyList = new ElectionList()
      // and load
      thePartyList.load()
      var itemJSON = localStorage.getItem(STORAGE_KEY)
      expect(itemJSON).toBeTruthy()
    })

    it('should have the correct JSON for the loaded party', function () {
      // save something
      localStorage.clear()
      thePartyList = new ElectionList()
      thePartyList.addParty('National', 10000)
      thePartyList.save()
      // the start the model again
      thePartyList = new ElectionList()
      // and load
      thePartyList.load()
      var itemJSON = localStorage.getItem(STORAGE_KEY)
      expect(itemJSON).toBe('[{"id":1,"name":"National","votes":10000}]')
    })
  })

  // FEATURE 3. Sort parts
  describe('sorting parties', function () {
    it('should put parties into alphabetic name order', function () {
      var thePartyList = new ElectionList()
      thePartyList.addParty('National', 10000)
      thePartyList.addParty('Labour', 20000)
      thePartyList.addParty('Greens', 2000)
      thePartyList.sortParties()
      const actualOrderedPartyNames = getNames(thePartyList.allMyParties)
      const expectedSortedPartyNames = ['Greens', 'Labour', 'National']
      expect(expectedSortedPartyNames).toEqual(actualOrderedPartyNames)
    })
  })

  // FEATURE 4. Filter parts
  describe('filter parties with a certain amount of votes', function () {
    var thePartyList = new ElectionList()
    thePartyList.addParty('National', 10000)
    thePartyList.addParty('Labour', 20000)
    thePartyList.addParty('Greens', 2000)
    it('should get parties with more or equal to 9000 votes', function () {
      var voteLimit = 9000
      const actualOrderedPartyNames = getNames(thePartyList.filterAbove(voteLimit))
      const expectedSortedPartyNames = ['National', 'Labour']
      expect(expectedSortedPartyNames).toEqual(actualOrderedPartyNames)
    })
    it('should get parties with less or equal to 10000 votes', function () {
      var voteLimit = 10000
      const actualOrderedPartyNames = getNames(thePartyList.filterBelow(voteLimit))
      const expectedSortedPartyNames = ['National', 'Greens']
      expect(expectedSortedPartyNames).toEqual(actualOrderedPartyNames)
    })
  })

  // FEATURE 5. Delete a selected part
  describe('deleting a party', function () {
    var thePartyList = new ElectionList()
    thePartyList.addParty('National', 10000)
    thePartyList.addParty('Labour', 20000)
    thePartyList.addParty('Greens', 2000)
    thePartyList.removeParty('Labour')
    it('should remove that party', function () {
      const expectedPartyNames = ['National', 'Greens']
      const actualPartyNames = getNames(thePartyList.allMyParties)
      expect(actualPartyNames).toEqual(expectedPartyNames)
    })

    it('should reduce the party count', function () {
      const expectedRemainingCount = 2
      const actualRemainingCount = thePartyList.allMyParties.length
      expect(actualRemainingCount).toBe(expectedRemainingCount)
    })
  })

  // FEATURE 8. Update/edit a part
  describe('editing a party', function () {
    var thePartyList = new ElectionList()
    thePartyList.addParty('National', 10000)
    thePartyList.addParty('Labour', 20000)
    thePartyList.addParty('Greens', 2000)
    thePartyList.startEditing(thePartyList.allMyParties[1])
    thePartyList.allMyParties[1].name = 'bb'
    thePartyList.doneEditing(thePartyList.allMyParties[1])
    it('should change the name of that party', function () {
      expect(thePartyList.allMyParties[1].name).toBe('bb')
    })
  })

  // FEATURE 9. Discard /revert edits to a part
  describe('discarding edits to a party', function () {
    it('should not change the name of that party', function () {
      var thePartyList = new ElectionList()
      thePartyList.addParty('National', 10000)
      thePartyList.addParty('Labour', 20000)
      thePartyList.addParty('Greens', 2000)
      thePartyList.startEditing(thePartyList.allMyParties[1])
      thePartyList.allMyParties[1].name = 'bb'
      thePartyList.cancelEditing(thePartyList.allMyParties[1])
      expect(thePartyList.allMyParties[1].name).toBe('Labour', 20000)
    })
  })

  // FEATURE 10. Validate inputs
  describe('validating inputs to a party', function () {
    it('should not allow empty names', function () {
      var thePartyList = new ElectionList()
      thePartyList.addParty('National', 10000)
      thePartyList.addParty('')
      thePartyList.addParty('  ')
      thePartyList.addParty('Labour', 20000)
      const expectedPartyNames = ['National', 'Labour']
      const actualPartyNames = getNames(thePartyList.allMyParties)
      expect(actualPartyNames).toEqual(expectedPartyNames)
    })
  })

  // FEATURE 13. Provide default values
  describe('the default value for new parties', function () {
    it('should allocate a sequentially incrementing id to all new parties', function () {
      var thePartyList = new ElectionList()
      for (let expectedId = 1; expectedId < 5; expectedId += 1) {
        thePartyList.addParty('National', 10000)
        var actualId = thePartyList.allMyParties[thePartyList.allMyParties.length - 1].id
        expect(actualId).toBe(expectedId)
      }
    })
  })

  // FEATURE 14. Find a part given a search criterion
  describe('finding a party', function () {
    it('should find nothing with an empty party list', function () {
      var thePartyList = new ElectionList()
      const actualFoundParty = thePartyList.findParty('a')
      expect(actualFoundParty).toBeUndefined()
    })

    it('should find the only party with a name when that name is unique', function () {
      var thePartyList = new ElectionList()
      thePartyList.addParty('National', 10000)
      thePartyList.addParty('Labour', 20000)
      thePartyList.addParty('Greens', 2000)
      const actualFoundParty = thePartyList.findParty('Labour')
      expect(actualFoundParty).toBeDefined()
      const expectedFoundName = 'Labour'
      const actualFoundName = actualFoundParty.name
      expect(actualFoundName).toBe(expectedFoundName)
    })

    it('should find the first party with that name when there is more than one party with the same name', function () {
      var thePartyList = new ElectionList()
      thePartyList.addParty('National', 10000)
      thePartyList.addParty('Labour', 20000)
      thePartyList.addParty('Labour', 20000)
      thePartyList.addParty('Greens', 2000)
      const actualFoundParty = thePartyList.findParty('Labour')
      expect(actualFoundParty).toBeDefined()
      const expectedFoundName = 'Labour'
      const actualFoundName = actualFoundParty.name
      expect(actualFoundName).toBe(expectedFoundName)
      const expectedFoundId = 2
      const actualFoundId = actualFoundParty.id
      expect(actualFoundId).toBe(expectedFoundId)
    })
  })
})
