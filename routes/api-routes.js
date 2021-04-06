const express = require("express")
const fs = require("fs");
const { v4: uuidv4 } = require('uuid')

module.exports = (app) => {

  app.get('/api/notes', (req, res) => {
    return res.json(JSON.parse(fs.readFileSync('./db/db.json')));
  });
  
  app.post('/api/notes', (req, res) => {

    const notesData = JSON.parse(fs.readFileSync('./db/db.json', {encoding: 'utf8'}))

    let addNote = req.body;
    
    notesData.push(addNote);
    
    addNote.id = uuidv4();
    
    fs.writeFile("./db/db.json", JSON.stringify(notesData), () => {
      return res.json(addNote);
    });
    
    // return res.json(JSON.parse(fs.readFileSync('./db/db.json')));
    // res.json()
  });
  
  app.delete('/api/notes/:id', (req, res) => {
    const notesData = JSON.parse(fs.readFileSync('./db/db.json', {encoding: 'utf8'}))
    let deleteItem = notesData.filter(item => item.id != req.params.id);
    
    fs.writeFileSync('./db/db.json', JSON.stringify(deleteItem));
    return res.json(JSON.parse(fs.readFileSync('./db/db.json')));
    
    // res.json()
  });
};
