var restify=require('restify')
var server=restify.createServer();
server.use(restify.fullResponse());
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(restify.authorizationParser());

var place=require('./server.js');
var db=require('./mongo.js');

server.del('/library',function(req,res){
    console.log('DELETE/library');
    db.clear(dbResult=>{
        console.log('mongo:'+dbResult);
        res.setHeader('content-type','application/json');
        res.send(202,'Query cahce deleted');
        res.end();
    })
});

var port=process.env.PORT;
server.listen(port,function(err){
    if(err){
        console.error(err);
    }else{
        console.log('App is ready at:'+port);
    }
})

server.get('/library',function(req,res){
    console.log('GET/library');
    const searchTerm= req.query.q;
    console.log('q=+searchTerm');
    if(!searchTerm){//searchTerm is null|| undefined||0 console.log('No keyword for search');
    res.setHeader('content-type','application/json');
    res.send(400,'Query is empty');
    res.end();
    return;
}
db.getByQuery(searchTerm,function(data){
    if(data!=null){ //Array.isArray(data) && data.length)
    var jdata=JSON.parse(data.results);
    console.log('use persisted data');
    res.setHeader('content-type','application/json');
    res.send(jdata.code,jdata.data); 
    res.end();
    }else{
        place.search(searchTerm,function(bkData){
            console.log(bkData.message);
            res.setHeader('content-type','application/json');
            res.status(bkData.code);
            res.send(bkData.code,bkData.data);
            res.end();
            bkData.query=searchTerm;
            db.addQuery(bkData,dbResult=>{
                console.log('mongo'+dbResult);
            })
        })
    }
    })
});