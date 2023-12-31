import React from 'react';
import {FilterValuesType} from './App'
import { AddItemForm } from './AddItemForm';
import { EditableSpanPropsType } from './EditableSpan';
import { EditableSpan } from './EditableSpan';

export type TaskType = {
    userId: number,
    id: string,
    title: string,
    completed: boolean,
}

export type PropsType = {
  array: Array<TaskType>,
  id: string,
  title: string,
  description: string,
  tasks: Array<TaskType>,
  changeCompleted: (id: string, todolistId: string) => void,
  removeTodolist: (todolistId: string) => void
  removeTask: (id: string, todolistId: string) => void,
  changeFilter: (value: FilterValuesType, todolistId: string) => void,
  addTask: (taskTitle: string, todolistId: string) => void,
  changeTaskTitle: (id: string, title: string, todolistId: string) => void,
  filter: FilterValuesType
}

export function TodoList(props: PropsType) {
  const onAllClickFilter = () =>{
    props.changeFilter('all', props.id)
  }
  const onActiveClickFilter = () =>{
    props.changeFilter('active', props.id)
  }
  const onAllCompletedFilter = () =>{
    props.changeFilter('completed', props.id)
  }
  const onDeleteHandler = () => {
    if(window.confirm('You are deleting todolist. Are you sure?')){
      props.removeTodolist(props.id)
    } else {
      return
    }
  }
  const addTask = (title: string) => {
    props.addTask(title, props.id)
  }

  return (
    <div className={'todolist'}>
      <div className={'delete-btn todolist-delete-btn'}
      onClick={onDeleteHandler}></div>
      <h3 className={'todolist-heading'}>{props.title}</h3>
      <p className={'todolist-description'}>{props.description}</p>
      <AddItemForm addItem={addTask}></AddItemForm>
      {(props.array.length <= 1) 
      ? <div></div> 
      : <div className={'filter-btns'}>
        <button className={props.filter === 'all' ? 'active-filter filter-btn' : 'filter-btn'} onClick={onAllClickFilter}>All</button>
        <button className={props.filter === 'active' ? 'active-filter filter-btn' : 'filter-btn'} onClick={onActiveClickFilter}>Active</button>
        <button className={props.filter === 'completed' ? 'active-filter filter-btn' : 'filter-btn'} onClick={onAllCompletedFilter}>Completed</button>
      </div>}
      <ul className={'list'}>
          {
            props.tasks.map(task => {
            const onCheckboxChangeHandler = () => {
              props.changeCompleted(task.id, props.id)
            }

            const onRemoveHandler = () => {
              props.removeTask(task.id, props.id)
            }

            const onChangeTitleHandler = (newValue: string) => {
              props.changeTaskTitle(task.id, newValue, props.id)
            }

            return <li className={task.completed === true ? 'completed item' : 'item'} key={task.id}>
            <input type='checkbox' 
              checked={task.completed}
              onChange={onCheckboxChangeHandler}
              className={'custom-checkbox'}
              id={task.id.toString()}>
            </input>
            <label htmlFor={task.id.toString()}></label>
            <EditableSpan title={task.title} onChange={onChangeTitleHandler}></EditableSpan>
            <button className={'delete-btn'} onClick={onRemoveHandler}></button>
          </li>
          }
          )
        }
      </ul>
    </div>
  );
}

