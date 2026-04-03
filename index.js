import express from "express";
import session from "express-session";
import autenticar from "./Security/autenticator.js";

const host = '0.0.0.0';
const port = 3001;
const app = express();

app.use(session({
    secret: '123456',
    resave: false,
    saveUninitialized: true, 
    cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 1000 * 60 * 60 
    }
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.static('Views/public'));
app.post("/login", (requisicao, resposta) =>{
    const usuario = requisicao.body.usuario;
    const senha = requisicao.body.senha;
    
    if(usuario === 'admin' && senha === '123'){
        requisicao.session.usuarioLogin = true;
        resposta.redirect('/menu.html');
    }else{
        resposta.redirect('/login.html');    
    }
});

app.get("/login", (requisicao, resposta) => {
    resposta.redirect('/login.html');
});

app.get("/logout", (requisicao, resposta) => {
    requisicao.session.destroy(); 
    resposta.redirect('/login.html'); 
});

app.use(autenticar, express.static('views/private'));

app.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});