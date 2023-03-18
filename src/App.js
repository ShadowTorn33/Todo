import React, { useState, useEffect } from "react";
import ToDo from "./ToDo";
import {AiFillPlusCircle} from "react-icons/ai"
import { db } from './firebase'
import { query, collection, onSnapshot, updateDoc, doc, addDoc, deleteDoc } from "firebase/firestore";

const style = {
    bg: `h-screen w-screen p-4 bg-gradient-to-r from-[#34DB66] to-[#2CDCD4]`,
    container: `bg-slate-100 max-w-[500px] w-full m-auto rounded-md shadow-xl p-4`,
    header: `text-3xl font-bold text-center text-grey-800 p-2`,
    form: `flex justify-between`,
    input: `border p-2 w-full text-xl`,
    button: `border p-4 ml-2 bg-green-300 rounded-xl`,
    count: `text-center p-2`
}

function App() {
    const [todos, setTodos] = useState([])
    const [todoItem, setTodoItem] = useState('')
    
    //Read
    useEffect(() => {
        const q = query(collection(db, 'todos'))
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            let todosArr = []
            querySnapshot.forEach((doc) => {
                todosArr.push({...doc.data(), id: doc.id})
            })
            setTodos(todosArr)
        })
        return () => unsubscribe
    },[])

    //Update
    const toggleComplete = async (todo) => {
        await updateDoc(doc(db, 'todos', todo.id), {
            completed: !todo.completed
        })
    }

    //Create
    const createToDo = async (e) => {
        e.preventDefault(e)
        await addDoc(collection(db, 'todos'), {
            text: todoItem,
            completed: false,
        })
        setTodoItem('')
    }

    //Delete
    const deleteTodo = async (id) => {
        await deleteDoc(doc(db, 'todos', id))
    }

  return (
    <div className={style.bg}>
     <div className={style.container}>
     <h3 className={style.header}>To-Do List</h3>
     <form onSubmit={createToDo} className={style.form}>
        <input value={todoItem} onChange={(e) => setTodoItem(e.target.value)} className={style.input} type="text" placeholder="Add Todo" />
        <button className={style.button}><AiFillPlusCircle size={20} /></button>
     </form>
     <ul>
        {todos.map((todo, idx) => (
            <ToDo key={idx} todo={todo} toggleComplete={toggleComplete} deleteTodo={deleteTodo} />
        ))}
     </ul>
     <p className={style.count}>You have {todos.length} things todo!</p>
     </div>
    </div>
  );
}

export default App;
