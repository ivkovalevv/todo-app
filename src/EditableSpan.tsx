import React, { useState, ChangeEvent, KeyboardEvent } from "react";

export type EditableSpanPropsType = {
    title: string,
    onChange: (newValue: string) => void
}

export function EditableSpan(props: EditableSpanPropsType){
    let [editMode, setEditMode] = useState(false)
    const activateEditMode = () => {
        setEditMode(true)
        setBtnStyles('editable-btn editable-btn-check')
    }
    const activateViewMode = () => {
        setEditMode(false)
        props.onChange(title)
        setBtnStyles('editable-btn editable-btn-edit')
    }

    const [title, setTitle] = useState(props.title)

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.code == "Enter"){
        if(title.trim() !== ''){
            setTitle(title)
            activateViewMode()
        }
        }
    }

    const [btnStyles, setBtnStyles] = useState('editable-btn editable-btn-edit')

    return editMode 
    ? <div className={'editaple-title-container'}>
        <input autoFocus value={title} onChange={onNewTitleChangeHandler} onKeyPress={onKeyPressHandler} className={'item-title input-edit'}></input>
        <button onClick={activateViewMode} className={btnStyles}></button>
    </div>
    : <div className={'editaple-title-container'}>
        <span onDoubleClick={activateEditMode} className={'item-title'}>{props.title}</span>
        <button onClick={activateEditMode} className={btnStyles}></button>
    </div>
}