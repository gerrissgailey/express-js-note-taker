
const express = require("express")
const notesData = require('../db/db');
const fs = require("fs");


console.log(notesData);
module.exports = (app) => {

  app.get('/api/notes', (req, res) => {
    return res.json(JSON.parse(fs.readFileSync('./db/db.json')));
  });

  app.post('/api/notes', (req, res) => {
    
    let addNote = req.body;
    console.log("Note to be added: ", addNote);

    notesData.push(addNote);

    addNote.id = notesData.indexOf(addNote);

    fs.writeFileSync("./db/db.json", JSON.stringify(notesData));

    res.json()
  });
    
  app.delete('/api/notes/:id', (req, res) => {
    let id = parseInt(req.params.id);
    let deleteItem = notesData.filter(item => item.id != id);
    
    deleteItem.forEach(element => element.id = deleteItem.indexOf(element));
    
    fs.writeFileSync('./db/db.json', JSON.stringify(deleteItem));
    
    res.json()
  });
};
