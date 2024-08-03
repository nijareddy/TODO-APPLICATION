import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import TodoApp from './components/TodoApp';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/register" element={<Register/>} />
          <Route exact path="/login" element={<Login/>} />
          <Route element={<ProtectedRoute />}>
          <Route path="/todos" element={<TodoApp />} />
            
          </Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;

