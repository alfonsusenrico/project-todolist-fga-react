import React from 'react';

class Todo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            todoList: []
        }
    }

    handleChange() {
        console.log('checkboxed');
    }

    render() {
        let checkBox = (
            <input type="checkbox" defaultChecked={this.props.completed} onChange={() => this.handleChange()} />
        )
        return(
            <div className="todo-list">
                <div className="todo-item">
                    <p>{this.props.name}</p>
                    { checkBox }
                </div>
            </div>
        );
    }
}

export default Todo;