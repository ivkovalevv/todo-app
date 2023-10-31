import React, { ChangeEvent, KeyboardEvent, useState } from 'react';

export type AddItemFormPropsType = {
    addItem: (title: string) => void,
  }
  
export function AddItemForm(props: AddItemFormPropsType){
const [newTaskTitle, setNewTaskTitle] = useState('')
const [error, setError] = useState<string | null>(null)

const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value)
}
const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null)
    if(e.code == "Enter"){
    if(newTaskTitle.trim() !== ''){
        props.addItem(newTaskTitle.trim())
        setNewTaskTitle('')
    } else {
        setError('Title is required!')
    }
    }
}
const addTask = () => {
    if(newTaskTitle.trim() !== ''){
    props.addItem(newTaskTitle.trim())
    setNewTaskTitle('')
    } else {
    setError('Title is required!')
    }
}

return(
    <div>
        <input value={newTaskTitle} 
        onChange={onNewTitleChangeHandler}
        onKeyPress={onKeyPressHandler}
        className={error ? 'error input-title' : 'input-title'}>
        </input>
        <button className={'btn-add'} onClick={addTask}>Add</button>
        {error && <div className='error-message'>{error}</div>}
    </div>
)
}