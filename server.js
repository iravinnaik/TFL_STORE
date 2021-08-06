const { response } = require('express');
var express = require('express');
var path=require('path');
const { commit } = require('./mysqlconnect');
var sql=require('./mysqlconnect');

var app = express();


app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.get("/",function(req, res){
    res.sendFile("index.html");
});
app.get("/api/orders",
        (request,response)=>{
                            var selectAllQuery="select o.customerid,i.itemname,o.orderdate,o.quantity,i.price from orders o,orderitems i;";
                             sql.query(selectAllQuery,function(err, data){
                            if(err){
                                console.log("error : "+err);
                            }
                            else
                            {
                                response.send(data);
                            }
        });
});

            app.get("/api/orders/:id", (request, response)=>{
                let id=request.params.id;
                var selectByIdQuery="select * from orders where orderid="+id;
                sql.query(selectByIdQuery,function(err, data){
                    if(err){
                        console.log("error : "+err);
                    }
                    else
                    {
                        response.send(data);
                    }
                });
});
app.get("/api/orderitems",
        (request,response)=>{
                            var selectAllQuery="select * from orderitems ";
                             sql.query(selectAllQuery,function(err, data){
                            if(err){
                                console.log("error : "+err);
                            }
                            else
                            {
                                response.send(data);
                            }
        });
});
app.get("/api/orderitems/:id", (request, response)=>{
    let id=request.params.id;
    var selectByIdQuery="select * from orderitems where orderitemid="+id;
    sql.query(selectByIdQuery,function(err, data){
        if(err){
            console.log("error : "+err);
        }
        else
        {
            response.send(data);
        }
    });
});
app.get("/api/deleteorder/:id", (request, response)=>{
    let id=request.params.id;
    var selectByIdQuery="delete from orders where ordered="+id;
    sql.query(selectByIdQuery,function(err, data){
        if(err){
            console.log("error : "+err);
        }
        else
        {
            response.send(data);
        }
    });
});

app.post("/api/add",(request,response)=>{
    console.log("POST add to cart is invoked...")
    let orderid=request.body.orderid;
    let orderdate=request.body.orderdate;
    let quantity=request.body.quantity;
    let customerid=request.body.customerid;
    let orderitemid=request.body.orderitemid;
    var selectByIdQuery="insert into orders values ('"+ orderid + "', '" + orderitemid +  "', '" + orderdate + "', '" + customerid + "', '" + quantity +"' );"
    sql.query(selectByIdQuery,function(err, data){
        if(err){
            console.log("error : "+err);
        }
        else
        {
            response.send("order added");        }
    });
  });
  app.get("/api/bill", (request, response)=>{
    var selectQuery="select i.itemname,o.quantity*i.price as total from orders o join orderitems i on o.orderitemid=i.orderitemid;";
    sql.query(selectQuery,function(err, data){
        if(err){
            console.log("error : "+err);
        }
        else
        {
            response.send(data);
        }
    });
});
   
app.listen(9898);
console.log("Express TFLStore App is liestening on port 9898");