/*Clases*/

class Node_L

{
   constructor(data)
   {
     this.data = data;
     this.sig = null;
     this.ant = null;
     this.t = 0;
     this.l = 0;
   }

}



class Lista

{
   constructor()

   {
    this.inicio = null;

   }

   insertar(dato)

   {

     if (this.inicio == null){
       this.inicio = new Node_L(dato);
       this.inicio.sig = null;
       this.inicio.ant = null;
       this.inicio.t = 0;
       this.inicio.l = 0;
     }

     else{
       var lista_aux = this.inicio;
       while (lista_aux.sig != null){
         lista_aux = lista_aux.sig;
       }
       lista_aux.sig = new Node_L(dato);
       lista_aux.sig.sig = null;
       lista_aux.sig.ant = lista_aux;
       lista_aux.sig.t = 0;
       lista_aux.sig.l = lista_aux.l + 100;
     }
   }

   buscar(data)

   {
    var lista_aux = this.inicio;
    while(lista_aux.data != data){
      lista_aux = lista_aux.sig;
    }
    return lista_aux;

   }

   borrar()

   {
    var lista_aux = this.inicio;

    if (lista_aux != null){
      while (lista_aux.sig != null){
        lista_aux = lista_aux.sig;
        delete lista_aux.ant;
      }

    }
   }
}



/*DOM*/

 function agregarNodoLista(nodo){

  var dato_final = nodo.data.toFixed(2);
  var clase = document.querySelector(".lista");
  var n = document.createElement("div");
  n.setAttribute("class", "nodo_L");
  n.innerHTML = "<p style='color:white; text-align:center'>" + dato_final +"</p>";
  n.style.left = 0 + "px";
  n.style.top = 0 + "px";
  clase.appendChild(n);

  return n;

}

function insertarLista(){

  dato = parseFloat(document.getElementById("numero_lista").value);
  document.getElementById("numero_lista").value = "";
  lista.insertar(dato);
  n = lista.buscar(dato);
  var div = document.querySelector(".lista");

  if (n.h != 0){

     var nuevo = agregarNodoLista(n);
     animarNodoLista(div,nuevo,n);
  }
  else{

    var nuevo = agregarNodoLista(n);
  }


}



function animarNodoLista(div,nuevo,n) {

  var yi_n = 0;
  var lf_n = n.l;
  var xi_n = 0;
  var li_n = 0;



  var t = setInterval(move,0.6);


  function move(){


      if (Math.round(xi_n) == Math.round(lf_n) ){
       clearInterval(t);
      }

      if (Math.round(xi_n) != Math.round(lf_n)) {

          xi_n += (lf_n-li_n)/(50*lf_n/100);
          nuevo.style.left = xi_n + "px";
          nuevo.style.top = yi_n + "px";

      if (Math.round(xi_n) >= lf_n-65){
         var linea_puntos = document.createElement("div");
         linea_puntos.setAttribute("class","punto");

         linea_puntos.style.left =  xi_n + "px";
         linea_puntos.style.top = 35 + "px";
         div.appendChild(linea_puntos);

      }



      }
    }
  }


export default Lista;
export default agregarNodoLista;
