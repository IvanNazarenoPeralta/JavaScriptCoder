
let Name = prompt('Ingrese su nombre y apellido');
let savedPIN = '123';

function login() {
    let ingresar = false;

    for (let i = 2; i >= 0; i--){
        let userPIN = prompt('Ingresa tu constraseña. Tienes '+(i+1)+' intentos');
        if  (userPIN === savedPIN){
            alert('hola '+Name+' bienvenida al simulador de plazo fijo.');;
            ingresar = true;
            break;}
        else{
        alert('ERROR. TE QUEDAN '+i+'intentos')}}
return ingresar;
}
let tasa = 34.45;
if (login ()){
    let opcion = prompt('ingrese una opcion: \n1- Conocé la tasa vigente. \n2- Simulador de plazo fijo. \n3- Politica de inversion. \n Presiona X para finalizar.');
    while(opcion != 'X' && opcion != 'x'){
        switch (opcion){
            case '1': 
                alert ('La tasa de interes en nuestros plazos fijos es de ' + tasa+'% anual. Esto es equivalente a un rendimiento diario de '+ tasa/365 + ' %');
                break;
            case '2': 
                let capital = parseFloat(prompt('ingrese la cantidad de dinero a invertir'));
                let dias = parseFloat(prompt('Ingrese la cantidad de dias que desea establecer el plazo fijo'));
                if(capital>=1000 && dias>=30){
                
                        let resultado = (capital*dias);
                        let resultado1 = (resultado*((tasa/100)/365));
                        alert ('En base a su capital, el rendimiento esperado para la cantidad de dias seleccionado es de $ '+ resultado1);
                        alert('Al final de los '+ dias+ ' dias seleccionados, se le acreditara $' +capital+resultado1 + ' a su cuenta.');}
                else{alert('Por favor revise nuestra politica de inversion.');}
                
                break;
            default:
                alert ('elegiste una opcion invalida');
                break;
            case '3':    
                alert('El monto minimo de inversion es de $1000 y el plazo minimo es de 30 dias.')

        }        
         opcion = prompt('ingrese una opcion: \n1- Conocé la tasa vigente. \n2- simulador de plazo fijo. \n3- Politica de inversion.\n Presiona X para finalizar.');
    }
}else{alert('Te enviamos un correo para blanquear tu clave. Revisa tu casilla')};

alert('Muchas gracias por utilizar nuestro simulador. Adios!')
