import React, { useEffect, useState } from 'react';
import { ElectionList, Party, Editing } from './dist/ElectionModel';
import {ElectionController, SortStates} from './dist/ElectionController';
import { Modal } from 'react-bootstrap';
import './App.css';

// TODO
// SORTING
// Work on Filter
// FIND
// REVERTING

var electionModel = new ElectionList();

function App() {
  
  var controller = new ElectionController(electionModel);

  const [parties, setParties] = useState<Party[]>([])
  const [name, setName] = useState("");
  const [votes, setVotes] = useState<number>(0);
  const [editId, setEditID] = useState<number>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [search, setSearch] = useState("");

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
    setParties(controller.getParties())
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

  const handleSearch = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setParties(controller.findParties(search))
  }

  const handleDelete = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault()
    controller.deleteParty(parseInt(event.target.id))
    controller.saveParties()
    setParties(controller.getParties())
  }

  const handleRevertEdit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent> ) => {
    event.preventDefault()
    if (controller.getParties()[event.target.id].name !== '' || null) {
      controller.editParty(Editing.Cancel, controller.getParties()[event.target.id])
      controller.saveParties()
      setShowEdit(false)
    }
    console.log(event.target.id)
    console.log()
    
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
              <div className="row justify-content-end px-2">
                <div className="col-auto px-1">
                  <input value={search} placeholder="Search" onChange={e => setSearch(e.target.value)}/>
                </div>
                <div className="col-auto">
                  <button className="btn btn-primary" onClick={handleSearch}>Search Submit</button>
                </div>
              </div>
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
                <th>Vote Percentage</th>
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
                    <td>{controller.getPartyPercentage(party)}</td>
                    {party.id === controller.getEditPartyCache.id ? <td><button id={index.toString()} className="btn btn-primary" onClick={e => handleEditShow(e)}>Edit</button><button id={index.toString()} className="btn btn-warning" onClick={e => handleRevertEdit(e)}>Revert</button></td> : <td><button id={index.toString()} className="btn btn-primary" onClick={e => handleEditShow(e)}>Edit</button></td> } 
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
