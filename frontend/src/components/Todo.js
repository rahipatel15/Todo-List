import React, { useState } from 'react';
import './Todo.css'; // Importing external CSS file

function Todo() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editingId, setEditingId] = useState(null);

  const handleAddTodo = () => {
    if (newTodo.trim() !== '') {
      setTodos([...todos, { id: Date.now(), text: newTodo }]);
      setNewTodo('');
    }
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleEditTodo = (id, newText) => {
    setTodos(todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, text: newText };
      }
      return todo;
    }));
    setEditingId(null);
  };

  return (
    <div className="todo-container">
      <h2 className="todo-title">Todo List</h2> {/* Updated title here */}
      <input 
        type="text" 
        value={newTodo} 
        onChange={(e) => setNewTodo(e.target.value)} 
        placeholder="Enter new todo" 
        className="todo-input" 
      />
      <button onClick={handleAddTodo}>Add Todo</button>
      <ul className="todo-list">
        {todos.map(todo => (
          <li key={todo.id} className="todo-item">
            {editingId === todo.id ? (
              <input 
                type="text" 
                value={todo.text} 
                onChange={(e) => handleEditTodo(todo.id, e.target.value)} 
                className="todo-input" 
              />
            ) : (
              <span>{todo.text}</span>
            )}
            <button className="todo-buttons" onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
            <button className="todo-buttons" onClick={() => setEditingId(todo.id)}>Edit</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todo;
