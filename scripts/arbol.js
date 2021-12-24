class Node
{
    constructor(data)
    {
        this.data = data;
        this.izq = null;
        this.der = null;
        this.t = 0;
        this.l = 0;
        this.h = 0;
    }
}


class BS_t

{
    constructor()
    {
        this.raiz = null;
    }

    insertar(dato){
      if (this.raiz == null){

        this.raiz = new Node(dato);
        this.raiz.l = 630;
        this.raiz.t = 10;
        this.raiz.h = 0;
      }

      else{
        const insertarRecursivo = function (n,dato,altura){
          if (dato < n.data){
            if (n.izq == null){
              n.izq = new Node(dato);
              n.izq.l = n.l - Math.round(630/Math.pow(2, altura));
              n.izq.t = n.t + 100;
              n.izq.h = altura;

            }
            else {
              insertarRecursivo(n.izq,dato,altura+1);
            }
          }
          else if (dato > n.data){
            if (n.der == null){
              n.der = new Node(dato);
              n.der.l = n.l + Math.round(630/Math.pow(2, altura));
              n.der.t = n.t + 100;
              n.der.h = altura;

            }
            else{
              insertarRecursivo(n.der,dato,altura+1);
            }

          }

        }
        insertarRecursivo(this.raiz,dato,1);
      }
    }



    inOrder(){
      document.getElementById("ABB").innerHTML = "InOrder: ";
      const inOrderRecursivo = function (n){
        if (n != null)
        {
          inOrderRecursivo(n.izq);
          document.getElementById("ABB").innerHTML += n.data + " ";
          inOrderRecursivo(n.der);
        }
        return;
      }
      inOrderRecursivo(this.raiz);
    }


    borrar(){
      const borrarRecursivo = function (n){
        if (n != null)
        {
          borrarRecursivo(n.izq);
          borrarRecursivo(n.der);
          delete n.data;
          delete n.izq;
          delete n.der;
        }
        return;
      }
      borrarRecursivo(this.raiz);
    }

    buscar(dato){

        const buscarRecursivo = function (n,dato){
          if (dato == n.data){
            return n;
          }

          else if (dato < n.data){
            return buscarRecursivo(n.izq,dato);
          }
          else {
            return buscarRecursivo(n.der,dato);
          }


        }
        return buscarRecursivo(this.raiz,dato);

    }

    buscarPadre(dato){

      const buscarPadreRecursivo = function (n,dato){

        if (n.der != null){
          if ( dato == n.der.data){
            return n;
          }
        }
        if (n.izq != null){
          if ( dato == n.izq.data ){
            return n;
          }
        }

        if (dato < n.data){
          return buscarPadreRecursivo(n.izq,dato);
        }
        else {
          return buscarPadreRecursivo(n.der,dato);
        }


      }

      return buscarPadreRecursivo(this.raiz,dato);

  }
}



/*DOM*/



function insertarABB(){

  dato = parseFloat(document.getElementById("numero").value);
  document.getElementById("numero").value = "";
  arbol.insertar(dato);
  var n = arbol.buscar(dato);
  var div = document.querySelector(".container");

  if (n.h != 0){

     var nuevo = agregarNodoCSS(n);
     animarNodo(div,nuevo,n);
  }
  else{

    var nuevo = agregarNodoCSS(n);
  }


}




function calcularPuntos(padre,n){

  let l = Math.abs(padre.l - n.l);
  let c_theta = l/Math.sqrt(Math.pow(l,2) + 10000);
  let s_theta = 100/Math.sqrt(Math.pow(l,2) + 10000);
  if (padre.l > n.l){
    var li_l = padre.l+35*(1-c_theta)-3;
    var ti_l = padre.t+35*(1+s_theta);
    var lf_l = n.l+35*(1+c_theta)-3;
    var tf_l = n.t+35*(1-s_theta)+3;
  }
  else{
    var li_l = padre.l+35*(1+c_theta)-3;
    var ti_l = padre.t+35*(1+s_theta);
    var lf_l = n.l+35*(1-c_theta)-3;
    var tf_l = n.t+35*(1-s_theta)-3;
  }

  var lf_n = n.l;
  var tf_n = n.t;
  var li_n = padre.l;
  var ti_n = padre.t;

  return [li_l,lf_l,ti_l,tf_l,li_n,lf_n,ti_n,tf_n];

}


function agregarNodoCSS(nodo){

  var dato_final = nodo.data.toFixed(2);
  var clase = document.querySelector(".container");
  var n = document.createElement("div");
  n.setAttribute("class", "nodo");
  n.innerHTML = "<p style='color:white; text-align:center'>" + dato_final +"</p>";
  n.style.left = 630 + "px";
  n.style.top = 10 + "px";
  clase.appendChild(n);

  return n;

}






  function animarNodo(div,nuevo,n) {


    var camino = arbol.raiz;
    if (n.data < camino.data){
      var puntos = calcularPuntos(camino,camino.izq);
      camino = camino.izq;

    }
    else{
      var puntos = calcularPuntos(camino,camino.der);
      camino = camino.der;

    }

    var li_l = puntos[0] ,lf_l = puntos[1] ,ti_l = puntos[2];
    var tf_l = puntos[3] ,li_n = puntos[4] ,lf_n = puntos[5];
    var ti_n = puntos[6] , tf_n = puntos[7];
    var x_n = lf_n-li_n;
    var y_n = tf_n-ti_n;
    var slope_n = y_n/x_n;
    var xi_n = li_n;
    var yi_n = ti_n;

    var x_l = lf_l-li_l;
    var y_l = tf_l-ti_l;
    var slope_l = y_l/x_l;
    var i = 0;
    var RandomColor = Math.floor(Math.random()*16777215).toString(16);
    var j = 0;

    var t = setInterval(move,0.6);


    function move(){

        /*
        if (j == 0){
         RandomColor = Math.floor(Math.random()*16777215).toString(16);
         j++;
        }
        */



        if (camino.data == n.data && (Math.round(xi_n) == Math.round(lf_n)) ){
         clearInterval(t);
        }

        else if ((camino.data == n.data) && (Math.round(xi_n) != Math.round(lf_n)) ){

           xi_n += (lf_n-li_n)/65;
           yi_n += slope_n*((lf_n-li_n)/65);
           nuevo.style.left = xi_n + "px";
           nuevo.style.top = yi_n + "px";


           var linea_puntos = document.createElement("div");
           linea_puntos.setAttribute("class","punto");

           linea_puntos.style.left =  (i*(lf_l-li_l))/65+li_l + "px";
           linea_puntos.style.top = slope_l*((i*(lf_l-li_l)) /65 +li_l) -slope_l*li_l + ti_l + "px";
          /* linea_puntos.style.backgroundColor = "#" + RandomColor;*/

           div.appendChild(linea_puntos);

           i++;



        }

        else{

          if (Math.round(xi_n) != Math.round(lf_n)) {

            xi_n += (lf_n-li_n)/65;
            yi_n += slope_n*((lf_n-li_n)/65);
            nuevo.style.left = xi_n + "px";
            nuevo.style.top = yi_n + "px";
            i++;




          }

          else {


            if ((camino.data > n.data)){

              var puntos = calcularPuntos(camino,camino.izq);
              camino = camino.izq;

              li_l = puntos[0] ,lf_l = puntos[1] ,ti_l = puntos[2];
              tf_l = puntos[3] ,li_n = puntos[4] ,lf_n = puntos[5];
              ti_n = puntos[6] , tf_n = puntos[7];
              x_n = lf_n-li_n;
              y_n = tf_n-ti_n;
              slope_n = y_n/x_n;
              xi_n = li_n;
              yi_n = ti_n;


              x_l = lf_l-li_l;
              y_l = tf_l-ti_l;
              slope_l = y_l/x_l;

              nuevo.style.left = xi_n + "px";
              nuevo.style.top = yi_n  + "px";
              i = 0;


            }

            else if (camino.data < n.data){
              var puntos = calcularPuntos(camino,camino.der);
              camino = camino.der;

              li_l = puntos[0] ,lf_l = puntos[1] ,ti_l = puntos[2];
              tf_l = puntos[3] ,li_n = puntos[4] ,lf_n = puntos[5];
              ti_n = puntos[6] , tf_n = puntos[7];
              x_n = lf_n-li_n;
              y_n = tf_n-ti_n;
              slope_n = y_n/x_n;
              xi_n = li_n;
              yi_n = ti_n;

              x_l = lf_l-li_l;
              y_l = tf_l-ti_l;
              slope_l = y_l/x_l;


              nuevo.style.left = xi_n + "px";
              nuevo.style.top = yi_n  + "px";
              i = 0;

            }
          }
        }
    }
  }


function crearLinea(div,li,ti,lf,tf){
  let x = lf-li
  let y = tf-ti
  let slope = y/x;
  var xi = li;
  var yi = ti;


  for (var i = 0; i < 150; i++){
    var puntos = document.createElement("div");
    puntos.setAttribute("class","punto");
    puntos.style.left =  (i*(lf-li))/150+li + "px";
    puntos.style.top = slope*((i*(lf-li))/150+li) -slope*li + ti + "px";

    div.appendChild(puntos);

  }
}

export default {BS_t ,insertarABB };
