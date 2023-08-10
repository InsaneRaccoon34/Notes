import React from 'react';
import _ from "lodash";
import NoteDetails from "./noteDetails";

const NotesList = ({notes, updateNote}) => {

    return (
        <div>
            {_.map(notes, note => (
                <NoteDetails
                    key={note.id}
                    initNote={note}
                    updateNote={updateNote}
                />
            ))}
        </div>
    );
};

export default NotesList;
