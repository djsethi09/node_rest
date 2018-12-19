module.exports = function(app,db){
    var ObjectID = require('mongodb').ObjectID;
    //now heres what we need to define as routes. 
    //home route or index url
    app.get('/notes',(req,res)=>{
        console.log('Index page was hit');
        //get list of notes
        db.collection('notes').find({}).toArray((err,items)=>{
            if(err)
            res.send({"error":"Some error occured"});
            else
            res.send(items);
        })
        //res.send("Hello People");
    });
    app.get('/note/:id',(req,res)=>{
        console.log('Index page was hit');
        const idToFetch = req.params.id;
        //get list of notes
        db.collection('notes').findOne({'_id':new ObjectID(idToFetch)},(err,item)=>{
            if(err)
            res.send({"error":"Some error occured"});
            else
            res.send(item);
        })
        //res.send("Hello People");
    });

    //similar to get, we can have post,put,delete or other http methods as well for our routes
    app.post('/notes',(req,res)=>{
        //insert a new note in mongo here
        const noteToInsert = {title:req.body.title,description:req.body.description};
        db.collection('notes').insert(noteToInsert,(err,result)=>{
            if(err)
            res.send({'Error':"Some error has occured"});
            else
            res.send(result.ops[0]);
        })
        res.send("Posting notes");
    });
    app.delete('/note/:id',(req,res)=>{
        const idToRemove = req.params.id;
        //get list of notes
        db.collection('notes').remove({'_id':new ObjectID(idToRemove)},(err,result)=>{
            if(err)
            res.send({'Error':"Some error has occured"});
            else
            res.send({'Success':"Item removed"});
        })
        //res.send("Deleting note");
    });
    app.put('/note/:id',(req,res)=>{
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        const note = { description: req.body.description, title: req.body.title };
        db.collection('notes').update(details, note, (err, result) => {
            if(err)
            res.send({'Error':"Some error has occured"});
            else
            res.send(result);
        })
    });
//now in next step we are going to deal with Mongodb to check its actual data working with the CRUD api.
};
//thats crud in node mongo rest!
//module.exports exports the function defined in a file to be used outside