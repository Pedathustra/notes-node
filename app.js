const fs = require('fs');
const _ = require('lodash'); //reference as in package.json
const yargs = require('yargs');

const notes = require('./notes.js');

const titleOptions=
    {                        // creating an object, title
        describe: 'Title of note',
        demand:true,
        alias: 't' //shortcut
    };
const bodyOptions={
    describe: 'Body of note',
    demand:true,
    alias: 'b'

}
const argv = yargs // this syntax is called "chaining"
        .command('add', 'Add a new note', {
            title:titleOptions, //title set to tileOptions object defined above
            body:bodyOptions
        })
        .command('list','List all notes')
        .command('read','Read a note', {
            title:titleOptions
        })
        .command('remove','Remove a note',
            {title: titleOptions}
            )
       . help() // this adds the option for help in cmd line.

        .argv;
var command = process.argv[2];


if (command=='add')
{
    var note=notes.addNote(argv.title,argv.body);
    if(note )//   if((typeof note)=="object")
    {
        console.log('Note ' + note.title + ' created!');
        notes.logNote(note);
    } else {
        console.log('Note ' + argv.title + ' NOT created!');
    }
} else if (command=='list')
{
    var allNotes = notes.getAll();
    console.log(`Printing ${allNotes.length} note(s).`);
    allNotes.forEach((note) => notes.logNote(note));


} else if(command=="read")
{
    var note = notes.getNote(argv.title);

    if (note)
    {
        notes.logNote(note);
    }
    else
    {
        console.log("Note " + argv.title  + " NOT found!");
    }


} else if(command=="remove")
    {
    var noteRemoved = notes.removeNote(argv.title);
    var message = noteRemoved ? 'Note was removed' : 'Note not found!';
    console.log(message);
}
   else  {
    console.log('Command not recognized.')
}



