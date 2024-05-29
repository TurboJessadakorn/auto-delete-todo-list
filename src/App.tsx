import React from 'react';
import './App.css';
import TodoList from './TodoList';

const App: React.FC = () => {
    return (
        <div className="App">
            <h1>Auto Delete Todo List</h1>
            <TodoList />
        </div>
    );
};

export default App;