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
        it('should have an id of 1', function () {
          expect(theParty.id).toBe(1)
        })

        it('should have a name of "National"', function () {
          expect(theParty.name).toBe('National', 10000)
        })
      })

      /*describe('the todosList app', function () {
        it('should have one task', function () {
          expect(thePartyList.allMyParties.length).toBe(1)
        })

        it('should have 1 active task remaining', function () {
          expect(thePartyList.remaining()).toBe(1)
        })

        it('should not be "all done"', function () {
          expect(thePartyList.getAllDone()).toBeFalsy()
        })
      })*/
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

    it('should have the correct JSON for the correct task in localStorage', function () {
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
    it('should load an task from localStorage when it has a single task', function () {
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

    it('should have the correct JSON for the loaded item', function () {
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
  describe('sorting tasks', function () {
    it('should put tasks into alphabetic name order', function () {
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
  /*describe('filtering tasks', function () {
    var thePartyList = new ElectionList()
    thePartyList.addParty('National', 10000)
    thePartyList.addParty('Labour', 20000)
    thePartyList.addParty('Greens', 2000)

    it('should be able to return only active/remaining tasks', function () {
      const expectedActiveCount = 2
      const expectedActivePartyNames = ['a', 'c']
      const actualActiveList = thePartyList.getActiveParties()
      const actualActiveCount = actualActiveList.length
      const actualActivePartyNames = getNames(actualActiveList)

      expect(actualActiveCount).toBe(expectedActiveCount)
      expect(actualActivePartyNames).toEqual(expectedActivePartyNames)
    })

    it('should be able to return only completed tasks', function () {
      const expectedCompletedCount = 1
      const expectedCompletedPartyNames = ['b']
      const actualCompletedList = thePartyList.getCompletedParties()
      const actualCompletedCount = actualCompletedList.length
      const actualCompletedPartyNames = getNames(actualCompletedList)
      expect(actualCompletedCount).toBe(expectedCompletedCount)
      expect(actualCompletedPartyNames).toEqual(expectedCompletedPartyNames)
    })

    it('should correctly calculate the number of remaining tasks', function () {
      const expectedRemainingCount = 2
      const actualRemainingCount = thePartyList.remaining()
      expect(actualRemainingCount).toBe(expectedRemainingCount)
    })
  })*/

  // FEATURE 5. Delete a selected part
  describe('deleting a task', function () {
    var thePartyList = new ElectionList()
    thePartyList.addParty('a')
    thePartyList.addParty('b')
    thePartyList.addParty('c')
    thePartyList.removeParty('b')
    it('should remove that task', function () {
      const expectedPartyNames = ['a', 'c']
      const actualPartyNames = getNames(thePartyList.allMyParties)
      expect(actualPartyNames).toEqual(expectedPartyNames)
    })

    it('should reduce the task count', function () {
      const expectedRemainingCount = 2
      const actualRemainingCount = thePartyList.allMyParties.length
      expect(actualRemainingCount).toBe(expectedRemainingCount)
    })
  })

  /*describe('removing all completed tasks', function () {
    var thePartyList = new ElectionList()
    thePartyList.addParty('a')
    thePartyList.addParty('b')
    thePartyList.addParty('c')
    thePartyList.addParty('d')
    thePartyList.allMyParties[1].completed = true
    thePartyList.allMyParties[2].completed = true
    thePartyList.removeCompleted()
    it('should remove all of the completed tasks', function () {
      const expectedPartyNames = ['a', 'd']
      const actualPartyNames = getNames(thePartyList.allMyParties)
      expect(actualPartyNames).toEqual(expectedPartyNames)
    })

    it('should reduce the task count', function () {
      const expectedRemainingCount = 2
      const actualRemainingCount = thePartyList.allMyParties.length
      expect(actualRemainingCount).toBe(expectedRemainingCount)
    })
  })*/

  // FEATURE 8. Update/edit a part
  describe('editing a task', function () {
    var thePartyList = new ElectionList()
    thePartyList.addParty('a')
    thePartyList.addParty('b')
    thePartyList.addParty('c')
    thePartyList.startEditing(thePartyList.allMyParties[1])
    thePartyList.allMyParties[1].name = 'bb'
    thePartyList.doneEditing(thePartyList.allMyParties[1])
    it('should change the name of that task', function () {
      expect(thePartyList.allMyParties[1].name).toBe('bb')
    })
  })

  // FEATURE 9. Discard /revert edits to a part
  describe('discarding edits to a task', function () {
    it('should not change the name of that task', function () {
      var thePartyList = new ElectionList()
      thePartyList.addParty('a')
      thePartyList.addParty('b')
      thePartyList.addParty('c')
      thePartyList.startEditing(thePartyList.allMyParties[1])
      thePartyList.allMyParties[1].name = 'bb'
      thePartyList.cancelEditing(thePartyList.allMyParties[1])
      expect(thePartyList.allMyParties[1].name).toBe('b')
    })
  })

  // FEATURE 10. Validate inputs
  describe('validating inputs to a task', function () {
    it('should not allow empty names', function () {
      var thePartyList = new ElectionList()
      thePartyList.addParty('a')
      thePartyList.addParty('')
      thePartyList.addParty('  ')
      thePartyList.addParty('b')
      const expectedPartyNames = ['a', 'b']
      const actualPartyNames = getNames(thePartyList.allMyParties)
      expect(actualPartyNames).toEqual(expectedPartyNames)
    })
  })

  // FEATURE 11. A calculation within a part
  // NOT IMPLEMENTED!, therefore NOT TESTED!
  xdescribe('a ??? calculation within a part', function () {
    xit('should do the ???? calculation correctly', function () {
      expect(true).toBeTrue()
    })
  })
  // FEATURE 12. A calculation across many parts
  xdescribe('working out if all tasks are done', function () {
    it('should return true for an empty list', function () {
      var thePartyList = new ElectionList()
      expect(thePartyList.getAllDone()).toBeTrue()
    })

    it('should return false for a list with active tasks in it', function () {
      var thePartyList = new ElectionList()
      thePartyList.addParty('a')
      thePartyList.addParty('b')
      expect(thePartyList.getAllDone()).toBeFalse()
    })

    it('should return true for a list with only completed tasks in it', function () {
      var thePartyList = new ElectionList()
      thePartyList.addParty('a')
      thePartyList.addParty('b')
      thePartyList.allMyParties[0].completed = true
      thePartyList.allMyParties[1].completed = true
      expect(thePartyList.getAllDone()).toBeTrue()
    })
  })

  xdescribe('counting active tasks', function () {
    it('should return the correct number of remaining tasks as tasks are added or completed', function () {
      var thePartyList = new ElectionList()
      expect(thePartyList.remaining()).toBe(0)
      thePartyList.addParty('a')
      expect(thePartyList.remaining()).toBe(1)
      thePartyList.addParty('b')
      expect(thePartyList.remaining()).toBe(2)
      thePartyList.addParty('c')
      expect(thePartyList.remaining()).toBe(3)
      thePartyList.allMyParties[1].completed = true
      expect(thePartyList.remaining()).toBe(2)
    })
  })

  // FEATURE 13. Provide default values
  describe('the default value for new tasks', function () {
    it('should allocate a sequentially incrementing id to all new tasks', function () {
      var thePartyList = new ElectionList()
      for (let expectedId = 1; expectedId < 5; expectedId += 1) {
        thePartyList.addParty('National', 10000)
        var actualId = thePartyList.allMyParties[thePartyList.allMyParties.length - 1].id
        expect(actualId).toBe(expectedId)
      }
    })
  })

  // FEATURE 14. Find a part given a search criterion
  describe('finding a task', function () {
    it('should find nothing with an empty todo list', function () {
      var thePartyList = new ElectionList()
      const actualFoundParty = thePartyList.findParty('a')
      expect(actualFoundParty).toBeUndefined()
    })

    it('should find the only task with a name when that name is unique', function () {
      var thePartyList = new ElectionList()
      thePartyList.addParty('a')
      thePartyList.addParty('b')
      thePartyList.addParty('c')
      const actualFoundParty = thePartyList.findParty('b')
      expect(actualFoundParty).toBeDefined()
      const expectedFoundName = 'b'
      const actualFoundName = actualFoundParty.name
      expect(actualFoundName).toBe(expectedFoundName)
    })

    it('should find the first task with that name when there is more than one task with the same name', function () {
      var thePartyList = new ElectionList()
      thePartyList.addParty('a')
      thePartyList.addParty('b')
      thePartyList.addParty('b')
      thePartyList.addParty('c')
      const actualFoundParty = thePartyList.findParty('b')
      expect(actualFoundParty).toBeDefined()
      const expectedFoundName = 'b'
      const actualFoundName = actualFoundParty.name
      expect(actualFoundName).toBe(expectedFoundName)
      const expectedFoundId = 2
      const actualFoundId = actualFoundParty.id
      expect(actualFoundId).toBe(expectedFoundId)
    })
  })
})
