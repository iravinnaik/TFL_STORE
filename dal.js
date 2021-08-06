

var mysql=require('mysql');
var dbServer={
    host:'localhost',
    user:'root',
    password:'1234',
    database:'exam'
    
};

var connection=mysql.createConnection(dbServer);


connection.connect(function(err){
    console.log(err);  
});

var getAll=function(){
    var selectAllQuery="select * from orders ";
    connection.query(selectAllQuery,function(err, data){
        if(err){
            console.log("error : "+err);
        }
        else
        {
            console.log(data);
        }
    });
}

var getById=function(id){
    var selectByIdQuery="select * from orders where ordered="+id;
    connection.query(selectByIdQuery,function(err, data){
        if(err){
            console.log("error : "+err);
        }
        else
        {
            console.log(data);
        }
    });
}



getAll();
getById(2);