import React, { useEffect, useState } from 'react';
import { ElectionList, Party, Editing } from './dist/ElectionModel';
import {ElectionController, SortStates, FilterStates} from './dist/ElectionController';
import { Modal } from 'react-bootstrap';
import './App.css';

// CREDIT TO @Cerux for fixing and helping me with my stupid React error

var electionModel = new ElectionList();

function App() {
  
  var controller = new ElectionController(electionModel);

  const [parties, setParties] = useState<Party[]>([])
  const [name, setName] = useState<string>("");
  const [votes, setVotes] = useState<number>(0);
  const [editId, setEditID] = useState<number>(null);
  const [showAdd, setShowAdd] = useState<boolean>(false);
  const [showEdit, setShowEdit] = useState<boolean>(false);
  const [limit, setLimit] = useState<number>(0);
  const [filterState, setFilterState] = useState<FilterStates>(FilterStates.Above);
  const [searchName, setNameSearch] = useState<string>("");
  const [searchVotes, setVoteSearch] = useState<number>(0);

  const handleAddClose = () => setShowAdd(false);
  const handleAddShow = () => setShowAdd(true);

  const handleEditClose = () => setShowEdit(false);
  const handleEditShow = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setShowEdit(true);
    setEditID(parseInt(event.target.id))
    controller.editParty(Editing.Start, controller.getParties()[event.target.id])
  }

  useEffect(() => {
    controller.loadParties()
    setParties(controller.getParties())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleNameSort = (sortState: SortStates) => {
    controller.sortParties(sortState)
    const currentParties = controller.getParties().map(party => {
      return party
    })
    setParties(currentParties);
  }

  const handleCloseSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name) {
      return
    } else {
      controller.addParty(name, votes)
      controller.saveParties();
      setParties(controller.getParties())
      setName("")
      setVotes(0)
      setShowAdd(false)
    }
  } 

  const handleClear = () => {
    controller.clearParties();
    controller.saveParties();
    setParties(controller.getParties())
  }

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (controller.findParties(searchName, searchVotes) == null) {
      alert("No Parties found with that search criteria")
    } else {
      setParties([controller.findParties(searchName, searchVotes)])
    }
  }

  const handleFilter = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(filterState)
    if (controller.filterParties(limit, filterState) == null) {
      alert("No Parties in the filter range")
    } else {
      const currentParties = controller.filterParties(limit, filterState).map(party => {
        return party
      })
      setParties(currentParties)
    }
  }

  const handleFilterState = (e: React.ChangeEvent<HTMLInputElement>, filterState: FilterStates) => {
    console.log(filterState)
    setFilterState(filterState)
  }

  const handleDelete = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault()
    controller.deleteParty(parseInt(event.target.id))
    const currentParties = controller.getParties().map(party => {
      return party
    })
    setParties(currentParties);
  }

  const handleRevertEdit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> ) => {
    event.preventDefault()
    if (controller.getParties()[event.target.id].name !== '' || null) {
      controller.editParty(Editing.Cancel, controller.getParties()[event.target.id])
      controller.saveParties()
      const currentParties = controller.getParties().map(party => {
        return party
      })
      setParties(currentParties);
      setShowEdit(false)
    }
  }

  const handleUpdate =  async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault()

    controller.getParties()[editId].name = name
    controller.getParties()[editId].votes = votes
    controller.editParty(Editing.Done, controller.getParties()[editId])
    setName("")
    setVotes(0)
    setEditID(null)
    setShowEdit(false)
    controller.saveParties()
  }

  return (
    <div className="App">
      <main>
        <h1>Election App</h1>
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="row justify-content-start px-2">
                <div className="col-auto px-1">
                  <button type="button" className="btn btn-primary" onClick={handleAddShow}>Add Party</button>
                </div>
                <div className="col-auto px-1">
                  <button className="btn btn-primary" onClick={handleClear} type="button">Clear All</button>
                </div>
              </div>
            </div>
            <div className="col">
              <form onSubmit={handleSearch}>
                <div className="row justify-content-end px-2">
                    <div className="col-auto px-1">
                      <input value={searchName} placeholder="Search Name" onChange={e => setNameSearch(e.target.value)} required/>
                    </div>
                    <div className="col-auto px-1">
                      <input type="number" value={searchVotes} placeholder="Search Votes" onChange={e => setVoteSearch(parseInt(e.target.value))}/>
                    </div>
                    <div className="col-auto">
                      <button type="submit" className="btn btn-primary">Search Submit</button>
                    </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <Modal show={showAdd} onHide={handleAddClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Party</Modal.Title>
          </Modal.Header>
          <form onSubmit={e => handleCloseSubmit(e)}>
            <Modal.Body>
                <div className="form-group">
                  <label className="col-form-label">Party Name:</label>
                  <input value={name} placeholder="Party Name" type="text" onChange={e => setName(e.target.value)} required/>
                </div>
                <div className="form-group">
                  <label className="col-form-label">Votes:</label>
                  <input value={votes} type="number" placeholder="Votes" onChange={e => setVotes(parseInt(e.target.value))}/>
                </div>
            </Modal.Body>
            <Modal.Footer>
              <button type="button" className="btn btn-secondary" onClick={handleAddClose}>Close</button>
              <button type="submit" className="btn btn-primary">Add Party</button>
            </Modal.Footer>
          </form>
        </Modal>
        <div className="container py-2">
          <table className="table table-light table-striped table-bordered table-responsive">
            <thead>
              <tr>
                <th>ID</th>
                <th >Name</th>
                <th>Votes</th>
                <th>Vote Percentage %</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {parties.map((party, index) => {
                return(
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{party.name}</td>
                    <td>{party.votes}</td>
                    <td>{controller.getPartyPercentage(party)}%</td>
                    {party.id === controller.getEditPartyCache().id ? <td><button id={index.toString()} className="btn btn-primary" onClick={e => handleEditShow(e)}>Edit</button><button id={index.toString()} className="btn btn-warning" onClick={e => handleRevertEdit(e)}>Revert</button></td> : <td><button id={index.toString()} className="btn btn-primary" onClick={e => handleEditShow(e)}>Edit</button></td> } 
                    <td><button id={index.toString()} className="btn btn-danger" onClick={e => handleDelete(e)}>Delete</button></td>
                  </tr>
                ) 
              })}
            </tbody>
            <tfoot>
              <tr>
                <div className="container">
                  <div className="row">
                    <div className="col">
                      <div className="row justify-content-start">
                        <div className="col-auto"><button className="btn btn-secondary" onClick={() => handleNameSort(SortStates.Name)}>Sort Names</button></div>
                        <div className="col-auto"><button className="btn btn-secondary" onClick={() => handleNameSort(SortStates.Votes)}>Sort Votes</button></div>
                        <div className="col-auto">
                          <form onSubmit={handleFilter}>
                            <div className="col-auto">
                              <div className="row">
                                <div className="col-auto">
                                  <input className="px-1" value={FilterStates.Above} type="radio" name="filter" onChange={e => handleFilterState(e, FilterStates.Above)} id="filterAbove"/>
                                  <label htmlFor="filterAbove">Filter Above</label>
                                </div>
                                <div className="col-auto">
                                  <input className="py-1" type="radio" name="filter" onChange={e => handleFilterState(e, FilterStates.Below)} id="filterBelow"/>
                                  <label htmlFor="filterBelow">Filter Below</label>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-auto"><input value={limit} onChange={e => setLimit(parseInt(e.target.value))} type="number" placeholder="Filter"/></div>
                              </div>
                            </div>
                            <div className="col-auto">
                              <button className="btn btn-secondary" type="submit">Apply</button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                    <div className="col">
                      <div className="row justify-content-end ">
                        <div className="col-auto">
                          <p>Total Votes: {controller.getTotalPartyVotes()}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </tr>
            </tfoot>
          </table>
          <Modal show={showEdit} onHide={handleEditClose}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Party</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form>
                <div className="form-group">
                  <label className="col-form-label">Party Name:</label>
                  <input value={name} placeholder="Party Name" type="text" onChange={e => setName(e.target.value)} required/>
                </div>
                <div className="form-group">
                  <label className="col-form-label">Votes:</label>
                  <input value={votes} type="number" placeholder="Votes" onChange={e => setVotes(parseInt(e.target.value))}/>
                </div>
              </form>
            </Modal.Body>
            <Modal.Footer>
              <button type="button" className="btn btn-secondary" onClick={handleEditClose}>Close</button>
              <button type="button" className="btn btn-primary" onClick={e => handleUpdate(e)}>Edit Party</button>
            </Modal.Footer>
          </Modal>
        </div>
      </main>
    </div>
  );
}

export default App;
