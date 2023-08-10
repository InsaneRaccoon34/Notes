import React, {useState} from 'react';
import {Button, Card, Input} from "antd";

const { TextArea } = Input

const NoteDetails = ({ initNote, updateNote }) => {
    const [isChanged, setIsChanged] = useState(false)
    const [note, setNote] = useState(initNote)

    const { title, content, id } = initNote


    const updateContent = e => {
        const { value, id } = e.target
        setIsChanged(true)

        setNote(prevState => ({
            ...prevState,
            [id]: value
        }))
    }

    return(
        <Card
            key={id}
            style={{
                width: '25rem',
            }}
            title={
                <Input
                    placeholder={title}
                    onChange={updateContent}
                    id='title'
                />
            }
        >
            <TextArea
                bordered={true}
                onChange={updateContent}
                id='content'
            >
                {content}
            </TextArea>
            <Button
                disabled={!isChanged}
                onClick={() => updateNote(note)}
            >Save</Button>
        </Card>
    )
};

export default NoteDetails;
