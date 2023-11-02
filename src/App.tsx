import React from 'react';
import { useState , useEffect} from 'react';
import './App.css';
import { TodoList, TaskType } from './TodoList';
import { AddItemForm } from './AddItemForm';

export type FilterValuesType = "all" | "completed" | "active";
export type TodoListType ={
  id: string,
  title: string,
  description: string,
  filter: FilterValuesType,
}
export type TasksTypeState = {
  [key: string]: Array<TaskType>
}

function App() {
  function getRandomID(){
    let randomID = '';
    return randomID = (Math.floor(Math.random() * 999999)).toString()
  }

  let todolistId1 = getRandomID()
  let todolistId2 = getRandomID() 

  function getTodayDate(){
    let todayDate = ''
    let date = new Date()
    todayDate = date.getDate().toString() + '.' + (date.getUTCMonth() + 1).toString() + '.' + date.getFullYear()
    return todayDate
  }

  let todolistDate1 = getTodayDate();
  let todolistDate2 = '25.10.2023';

  let [todolists, setTodolists] = useState<Array<TodoListType>>([
    {id: todolistId1, title: 'Study day', description: todolistDate1, filter: 'all'},
    {id: todolistId2, title: 'Day off', description: todolistDate2, filter: 'all'},
  ])
  
  let [tasksObj, setTasks] = useState({
    [todolistId1]: [
      {userId: 1, id: getRandomID(), title: "CSS+HTML", completed: true},
      {userId: 1, id: getRandomID(), title: "JS", completed: true},
      {userId: 1, id: getRandomID(), title: "React", completed: true},
      {userId: 1, id: getRandomID(), title: "Redux", completed: false},
      {userId: 1, id: getRandomID(), title: "Rest API", completed: false},
      {userId: 1, id: getRandomID(), title: "TypeScript", completed: true},
    ],
    [todolistId2]: [
      {userId: 1, id: getRandomID(), title: "GYM", completed: true},
      {userId: 1, id: getRandomID(), title: "Learning", completed: false},
      {userId: 1, id: getRandomID(), title: "Walking", completed: false},
      {userId: 1, id: getRandomID(), title: "Sleep", completed: false},
    ]
  })

  /* useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
      .then(response => response.json())
      .then(todos => {
          tasksObj[todolistId1] = todos
          setTasks({...tasksObj})
      })
  }, []) */
 
  function filterDateTodolists(value: string){
    if (value === 'up'){
      let sortedTodolists = todolists.sort(UpSortFunction);
      setTodolists(sortedTodolists)
    } else if (value === 'down'){
      let sortedTodolists = todolists.sort(DownSortFunction);
      setTodolists(sortedTodolists)
    }
  }
  
  function UpSortFunction(a: any, b: any) {
      let dateA = new Date(a.date).getTime();
      let dateB = new Date(b.date).getTime();
      return dateA > dateB ? 1 : -1;
  };

  function DownSortFunction(a: any, b: any) {
    let dateA = new Date(a.date).getTime();
    let dateB = new Date(b.date).getTime();
    return dateA < dateB ? 1 : -1;
  };

  function removeTodolist(todolistId: string){
    let newTodolists = todolists.filter(td => td.id !== todolistId)
    setTodolists(newTodolists)
    delete tasksObj[todolistId]
    setTasks({...tasksObj})
  }

  function removeTask(id: string, todolistId: string){
    let tasks = tasksObj[todolistId]
    let filteredTasks = tasks.filter(task => task.id !== id)
    tasksObj[todolistId] = filteredTasks
    setTasks({...tasksObj})
  }

  function addTask(newTaskTitle: string, todolistId: string){
    let newTask = {
      userId: 1,
      id: getRandomID(),
      title: newTaskTitle,
      completed: false
    }
    let tasks = tasksObj[todolistId]
    let newTasks = [newTask, ...tasks]
    tasksObj[todolistId] = newTasks

    setTasks({...tasksObj})
}

  function changeCompleted(id: string, todolistId: string){
    let tasks = tasksObj[todolistId]
    let newTasks = [...tasks]
    newTasks.forEach(task => { 
      if(task.id === id && task.completed === true){
        task.completed = false
      } else if (task.id === id && task.completed === false){
        task.completed = true
      }
    })
    tasksObj[todolistId] = newTasks
    setTasks({...tasksObj})
  }

  function changeFilter(value: FilterValuesType, todolistsId: string){
    let todolist = todolists.find(todolist => todolist.id === todolistsId)
    if(todolist){
      todolist.filter = value
      setTodolists([...todolists])
    }
  }

  function addTodolist(title: string){
    let todolist: TodoListType = {
      id: getRandomID(),
      title: title,
      description: getTodayDate(),
      filter: 'all'
    }
    setTasks({...tasksObj, [todolist.id]: []})
    setTodolists([todolist, ...todolists])
  }

  function changeTaskTitle(id: string, newTitle: string, todolistId: string){
    let todolistTasks = tasksObj[todolistId]
    let task = todolistTasks.find(t => t.id === id)
    if(task){
      if(newTitle.trim() !== ''){
        task.title = newTitle
        setTasks({...tasksObj})
      }
    }
  }

  let [filterState, setFilterState] = useState([
    'active-filter filter-btn up-filter-btn-active', 'filter-btn down-filter-btn'
  ])

  let [disabledState, setDisabledState] = useState([
    true, false
  ])

  const onUpFilterHandler = () => {
    filterDateTodolists('up')
    let newFilterState = ['active-filter filter-btn up-filter-btn-active', 'filter-btn down-filter-btn']
    let newDisabledState = [true, false]
    setFilterState(newFilterState)
    setDisabledState(newDisabledState)
  }

  const onDownFilterHandler = () =>{
    filterDateTodolists('down')
    let newFilterState = ['filter-btn up-filter-btn', 'active-filter  filter-btn down-filter-btn-active']
    let newDisabledState = [false, true]
    setFilterState(newFilterState)
    setDisabledState(newDisabledState)
  }

  return (
    <div className="App">
      <h1 className={'app-heading todolist-heading'}>TODO App</h1>
      <div className={'todolist-form'}>
        <h3 className={'todolist-heading todolist-form-heading'}>Add new todolist</h3>
      <AddItemForm addItem={(title: string) => {addTodolist(title)}}></AddItemForm>
      </div>
      <div className={'filter-todo-btns'}>
          <button disabled={disabledState[0]} className={filterState[0]} onClick={onUpFilterHandler}></button>
          <button disabled={disabledState[1]} className={filterState[1]} onClick={onDownFilterHandler}></button>
        </div>
      <div className={'todolists'}>
        {
          todolists.map((todolist) => {
            let tasksForTodoList = tasksObj[todolist.id]

            if (todolist.filter === "completed"){
              tasksForTodoList = tasksForTodoList.filter(task => task.completed === true)
            }
            if (todolist.filter === "active"){
              tasksForTodoList = tasksForTodoList.filter(task => task.completed === false)
            }

            return <TodoList
            key={todolist.id}
            id={todolist.id} 
            title={todolist.title}
            description={todolist.description} 
            tasks={tasksForTodoList}
            removeTodolist={removeTodolist} 
            removeTask={removeTask} 
            changeFilter={changeFilter}
            addTask={addTask}
            changeCompleted={changeCompleted} 
            changeTaskTitle={changeTaskTitle}
            filter={todolist.filter}></TodoList>
          })
        }
        </div>
      <div className={'footer'}>Create by <a href={'https://github.com/ivkovalevv'} className={'link'}>Ivkovalevv</a> © 2023
      <a href={'https://github.com/ivkovalevv'} target='_blank' className={'gh-icon'}></a></div>
    </div>
  );
}


export default App;
