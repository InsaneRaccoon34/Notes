import {css, StyleSheet} from "aphrodite-jss";
import {FloatButton} from "antd";
import NotesList from "./components/notesList";
import {useEffect, useState} from "react";
import { v4 as uuid } from "uuid";
import _ from "lodash";

function App() {
    const [notes, setNotes] = useState([])

    useEffect(() => {
        console.log(notes)
    }, [notes])

    const createNote = () => {
        setNotes(prevState => [...prevState, {
            title: `Note ${_.size(notes) + 1*1}`,
            content: 'new body',
            id: uuid()
        }])
    }

    const updateNote = (note) => {
        let prevNotes = [...notes]
        let initNoteToUpdate = _.findIndex(prevNotes, { 'id': note.id })

        prevNotes[initNoteToUpdate] = note

        setNotes(prevNotes)
    }

    return (
        <div className={css(styles.App)}>
            <header className={css(styles.header)}>

            </header>
            <div className={css(styles.body)}>
                <NotesList
                    notes={notes}
                    updateNote={updateNote}
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
        backgroundColor: 'black'
    },

    body: {

    }
})
