//librerias
const http=require('http');
const express=require('express');
const app=express();
const sqlite3=require('sqlite3').verbose();
const path=require('path');

//recursos
app.use(express.static(__dirname+'/'));

//Configuracion del servidor
app.set("view engine", "ejs");
app.set("views", path.join(__dirname,""));
app.use(express.urlencoded({extended:false}));
app.listen(3000);
console.log("Server run");

//Base de datos
const db_name=path.join(__dirname,"db","quiz.db");
const db=new sqlite3.Database(db_name,err=>{
    if(err){
        return console.error(err.message);
    }else{
        console.log("Conexion exitosa con la base de datos")
    }
})

//rutas
app.get('/',(req,res)=>{
    res.render('index.ejs')
});
//seleccionamos todos los valores de la tabla indiceambiental
app.get('/indiceambiental',(req,res)=>{
    const sql="SELECT * FROM indiceambiental ORDER BY id"
    db.all(sql,[],(err,rows)=>{
        if(err){
            return console.error(err.message);
        }
        else{
            res.render("indiceambiental.ejs",{mo:rows});
        }
    })
})

app.get('/indiceambiental',(req,res)=>{
    res.render('indiceambiental.ejs',{modelo:{}})
});

//se inserta los datos en la tabal indice ambiental
app.post('/indiceambiental',(req,res)=>{
    const sql="INSERT INTO indiceambiental (INA) values(?)";
    const nuevo_dato=[(0.5*req.body.temperatura)+(0.15*req.body.nivel)+(0.2*req.body.humedad)];
    console.log(nuevo_dato);
    db.run(sql,nuevo_dato, err=>{
    if(err){
        return console.error(err.message);
    }
    else{
        res.redirect('/indiceambiental')
        
    }
})
});
//muestra los datos soliciatdos en la consulta
app.get('/humedad',(req,res)=>{
    const sql="SELECT * FROM Humedad ORDER BY id"
    db.all(sql,[],(err,rows)=>{
        if(err){
            return console.error(err.message);
        }
        else{
            res.render("humedad.ejs",{modelo:rows});
        }
    })
})
app.get('/nivel',(req,res)=>{
    const sql="SELECT * FROM Nivel ORDER BY id"
    db.all(sql,[],(err,rows)=>{
        if(err){
            return console.error(err.message);
        }
        else{
            res.render("nivel.ejs",{modelo:rows});
        }
    })
})
app.get('/temperatura',(req,res)=>{
    const sql="SELECT * FROM Temperatura ORDER BY id"
    db.all(sql,[],(err,rows)=>{
        if(err){
            return console.error(err.message);
        }
        else{
            res.render("temperatura.ejs",{modelo:rows});
        }
    })
})
