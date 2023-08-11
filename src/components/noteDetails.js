import React, {useEffect, useState} from 'react';
import {Button, Card, Input} from "antd";
import {css, StyleSheet} from "aphrodite-jss";

const { TextArea } = Input

const NoteDetails = ({ initNote, updateNote, deleteNote }) => {
    const [isEditable, setIsEditable] = useState()
    const [isChanged, setIsChanged] = useState(false)
    const [note, setNote] = useState(initNote)

    const { title, content, id, isDefault } = initNote

    useEffect(() => {
        //console.log(`Is editable ${isEditable}`)
    }, [isEditable])


    const updateContent = e => {
        const { value, id } = e.target
        setIsChanged(true)

        setNote(prevState => ({
            ...prevState,
            [id]: value
        }))
    }

    const onSave = () => {
        setIsChanged(false)
        updateNote(note)
    }

    return(
        <Card
            onMouseEnter={() => setIsEditable(true)}
            onMouseLeave={() => setIsEditable(false)}
            key={id}
            style={{
                width: '25rem',
                transition: '0.5s'
            }}
            title={
                <Input
                    placeholder={isDefault ? title : ''}
                    defaultValue={isDefault ? '' : title}
                    onChange={updateContent}
                    id='title'
                />
            }
        >
            <div className={css(styles.contentBlock)}>
                <TextArea
                    style={{
                        resize: 'none',
                        height: '100%'
                    }}
                    bordered={true}
                    onChange={updateContent}
                    id='content'
                    defaultValue={content}
                >
                    {content}
                </TextArea>
                {isEditable || isChanged || true ?
                    <div className={css(styles.editButtonsBlock)}>
                        <Button
                            disabled={!isChanged}
                            onClick={onSave}
                        >Save</Button>
                        <Button
                            danger={true}
                            onClick={() => deleteNote(note)}
                        >
                            delete
                        </Button>
                    </div>
                    : <></>
                }
            </div>
        </Card>
    )
};

export default NoteDetails;

const styles = StyleSheet.create({
    contentBlock: {
        display: 'flex',
        flexDirection: 'column',
        height: '15rem'
    },
    editButtonsBlock: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '1.2rem'
    }
})

