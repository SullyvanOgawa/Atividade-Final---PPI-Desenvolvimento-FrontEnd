export default function autenticar(requsicao, resposta, next){
    if(requsicao.session.usuarioLogin){
        next();
    }else{
        resposta.redirect("/login");
    }
}