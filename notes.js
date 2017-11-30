const fs = require('fs');
const _ = require('lodash');
var fetchNotes = ()=>{
    try{ //in case file doesn't exist. This will just set the var = empty array
        var notesString = fs.readFileSync("notes-data.json");
        return JSON.parse(notesString);
    }
    catch(e)
    {
        return [];
    }
};
var saveNotes = (notes)=>{
    fs.writeFileSync("notes-data.json", JSON.stringify(notes));
};
var addNote = (title,body)=>{
    var notes=fetchNotes();
    var note={
        title, //title: title
        body
    };
    //in case duplicates exists
    //filter is an array function. gets called for every item in the array

    var duplicateNotes = notes.filter((note)=>note.title === title);
    if (duplicateNotes.length===0){ //checks for duplicates
        notes.push(note); //adds note to array
        saveNotes(notes);
        return note;
    }


};
var getAll = ()=>{
    return fetchNotes();
};
var removeNote = (title)=>{
    var notes = fetchNotes();
    var cleanNotes = notes.filter((note)=>note.title !== title);//like doing a NOT IN with SQL
    saveNotes(cleanNotes);

    return notes.length !== cleanNotes.length;
};
var getNote = (title)=>{
    var notes = fetchNotes();
    var note = notes.filter((note)=>note.title === title);//like doing a NOT IN with SQL
    return note[0];
};

var logNote = (note) =>{
    //break on this line, use repl to output note
    debugger;
    console.log('--');
    console.log(`Title: ${note.title}`);
    console.log(`Body: ${note.body}`);
};


module.exports={ //defining an entire object that's set to exports
    addNote, // addNote: addNote these two are identicle. setting the addnote variable to the addNote property
    getAll,
    removeNote,
    getNote,
    logNote
};

