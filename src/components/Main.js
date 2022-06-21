import React from 'react';
import deleteIcon from '../assets/trash-solid.svg';
import updateIcon from '../assets/pen-solid.svg';
import completeIcon from '../assets/check-solid.svg';

class Main extends React.Component {

    constructor(props) {
        // localStorage.clear();
        super(props);
        this.state = {
            item: {},
            name: '',
            todoList: []
        }
        this.state = {
            isModalCompleteOpen: false,
            isModalEditOpen: false,
            isModalDeleteOpen: false
        }
    }

    componentWillMount() {
        if(localStorage.getItem('savedData') !== null) {
            this.setState({todoList: JSON.parse(localStorage.getItem('savedData'))});
        }
    }

    handleInput(e) {
        this.setState({name: e.target.value});
    }

    insertItem() {
        const data = {
          'id': this.state.todoList.length,  
          'name' : this.state.name,
          'completed' : false
        };
        let added = this.state.todoList;
        added.push(data);
        this.setState({todoList: added});
        localStorage.setItem('savedData', JSON.stringify(added));
        document.getElementById('input').value = '';
    }

    updateState(data) {
        let temp = data;
        this.setState({todoList: data});
        localStorage.setItem('savedData', JSON.stringify(temp));
    }

    handleModal() {
        this.setState({
            isModalCompleteOpen: false,
            isModalDeleteOpen: false,
            isModalEditOpen: false
        });
    }

    completeItem(id) {
        this.setState({isModalCompleteOpen: true});
        let temp = this.state.todoList;
        let updated = temp.map((item) => {
            if(item.id === id) {
                return { ...item, completed: !item.completed};
            }
            return item;
        });
        this.updateState(updated);
    }   

    editItem(id) {
        let temp = this.state.todoList;
        let updated = temp.map((item) => {
            if(item.id === id) {
                return { ...item, name: this.state.name};
            }
            return item;
        });
        this.updateState(updated);
        this.handleModal();
    }

    deleteItem(id) {
        this.setState({isModalDeleteOpen: true});
        let temp = this.state.todoList;
        if(temp.length === 1) {
            temp = [];
        }
        else {
            temp.splice(id, 1);
        }
        this.updateState(temp);
    }

    render() {
        let modalComplete;
        let modalDelete;
        let modalEdit;

        if(this.state.isModalCompleteOpen) {
            modalComplete = (
                <div className='modal'>
                    <div className='modal-inner'>
                        <div className='modal-header'></div>
                        <div className='modal-introduction'>
                            <h2>Task Complete</h2>
                            <p>Task diselesaikan!</p>
                        </div>
                        <button className='modal-btn-close' onClick={() => this.handleModal()}>Tutup</button>
                    </div>
                </div>
            )
        }

        if(this.state.isModalDeleteOpen) {
            modalDelete = (
                <div className='modal'>
                    <div className='modal-inner'>
                        <div className='modal-header'></div>
                        <div className='modal-introduction'>
                            <h2>Delete Task</h2>
                            <p>Task dihapus!</p>
                        </div>
                        <button className='modal-btn-close' onClick={() => this.handleModal()}>Tutup</button>
                    </div>
                </div>
            )
        }

        if(this.state.isModalEditOpen) {
            modalEdit = (
                <div className='modal'>
                    <div className='modal-inner'>
                        <div className='modal-header'></div>
                        <div className='modal-introduction'>
                            <h2>Edit Nama Task</h2>
                            <input type="text" id="inputEdit" defaultValue={this.state.item.name} onChange={(event) => this.handleInput(event)}/>
                        </div>
                        <button className="modal-btn-submit" onClick={() => this.editItem(this.state.item.id)}>Edit</button>
                        <button className='modal-btn-close' onClick={() => this.handleModal()}>Tutup</button>
                    </div>
                </div>
            )
        }

        return(
            <div className="main">
                <h1 className="title">ToDo List</h1>
                <input type="text" placeholder="Create Todo" id="input" onChange={(event) => this.handleInput(event)}/>
                <button className="btn-submit" onClick={() => this.insertItem()}>Create</button>
                {this.state.todoList.map((todoItem) => {
                    let completeButton;
                    if(todoItem.completed === false) {
                        completeButton = (
                            <button onClick={() => this.completeItem(todoItem.id)}><img height="15px" width="15px" src={completeIcon} alt="Complete Button"/></button>
                        )
                    }
                    else {
                        completeButton = (
                            <button className="btn-success" disabled={true} onClick={() => this.completeItem(todoItem.id)}><img height="15px" width="15px" src={completeIcon} alt="Complete Button"/></button>
                        )
                    }
                    return(
                        <div className="todo-list">
                            <div className="todo-item">
                                <div className="item-detail">
                                    <h4>{todoItem.id+1}</h4>
                                    <h3>{todoItem.name}</h3>
                                </div>
                                <div className="item-action">
                                    {completeButton}
                                    <button className="btn-warning" onClick={() => this.setState({isModalEditOpen: true, item: todoItem})}><img height="15px" width="15px" src={updateIcon} alt="Edit Button"/></button>
                                    <button className="btn-danger" onClick={() => this.deleteItem(todoItem.id)}><img height="15px" width="15px" src={deleteIcon} alt="Delete Button"/></button>
                                </div>
                            </div>
                        </div>
                    )
                })}
            {modalComplete}
            {modalDelete}
            {modalEdit}
            </div>
        );
    }
}

export default Main;