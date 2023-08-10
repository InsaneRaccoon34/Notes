import React from 'react';
import _ from "lodash";
import NoteDetails from "./noteDetails";
import {css, StyleSheet} from "aphrodite-jss";

const NotesList = ({notes, updateNote, deleteNote}) => {

    return (
        <div className={css(styles.notesListContainer)}>
            {_.map(notes, note => (
                <NoteDetails
                    key={note.id}
                    initNote={note}
                    updateNote={updateNote}
                    deleteNote={deleteNote}
                />
            ))}
        </div>
    );
};

export default NotesList;

const styles = StyleSheet.create({
    notesListContainer: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, 25rem)',
        gridGap: 'clamp(.5rem, 1rem, 3rem)',
        justifyContent: 'center',

        margin: '3rem'
    }
})
