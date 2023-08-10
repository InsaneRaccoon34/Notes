import {css, StyleSheet} from "aphrodite-jss";
import {FloatButton} from "antd";
import NotesList from "./components/notesList";
import {useEffect, useState} from "react";
import { v4 as uuid } from "uuid";
import localforage from "localforage";
import _ from "lodash";

function App() {
    const [notes, setNotes] = useState([])

    useEffect(() => {
        localforage.getItem('notes')
            .then(res => {
                setNotes(JSON.parse(res))
            })
    }, [])

    useEffect(() => {
        localforage.setItem('notes', JSON.stringify(notes))
            .then(() => {})

        console.log('Notes: ', notes)
    }, [notes])

    const createNote = () => {
        setNotes(prevState => [...prevState, {
            title: `Note ${_.size(notes) + 1*1}`,
            content: '',
            id: uuid(),
            isDefault: true
        }])
    }

    const updateNote = (note) => {
        let prevNotes = [...notes]
        let initNoteToUpdate = _.findIndex(prevNotes, { 'id': note.id })

        prevNotes[initNoteToUpdate] = {
            ...note,
            isDefault: false
        }

        setNotes(prevNotes)
    }

    const deleteNote = (note) => {
        const { id } = note

        let prevNotes = [...notes]
        let newNotes = _.filter(prevNotes, note => note.id !== id)

        setNotes(newNotes)
    }

    return (
        <div className={css(styles.App)}>
            <header className={css(styles.header)}>
                <span>Notes</span>
                <span style={{
                    position: 'absolute',
                    color: 'red',
                    transform: ' translate(30px, -10px) rotate(23deg) scale(.8)',
                    display: 'flex',
                }}>
                    Its beta
                </span>
            </header>
            <div className={css(styles.body)}>
                <NotesList
                    notes={notes}
                    updateNote={updateNote}
                    deleteNote={deleteNote}
                />
            </div>
            <FloatButton
                style={{
                    position: 'absolute',
                    bottom: '3rem',
                    width: '3rem',
                    height: '3rem',
                }}
                type='primary'
                onClick={createNote}
                icon={<>+</>}
                tooltip={['Add a note']}
            />
        </div>
    );
}

export default App;

const styles = StyleSheet.create({
    App: {
        height: '100vh'
    },

    header: {
        height: '5rem',
        backgroundColor: '#0a0a0a',
        color: '#E5E5E5',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },

    body: {

    }
})
