
function borrarTodo() {

  arbol.borrar();
  delete arbol;

  lista.borrar();
  delete lista;


  var nodosL = document.getElementsByClassName("nodo_L");
  const largo_L = nodosL.length;
  for (var i = 0; i < largo_L; i++){
    nodosL[largo_L-i-1].remove();
  }

  var nodos= document.getElementsByClassName("nodo");
  const largo = nodos.length;
  for (var i = 0; i < largo; i++){
    nodos[largo-i-1].remove();
  }

  var puntos = document.getElementsByClassName("punto");
  const largo_p = puntos.length;
  for (var i = 0; i < largo_p; i++){
    puntos[largo_p-i-1].remove();
  }
  arbol = new ABB_T;
  lista = new Lista;
}

export default borrarTodo;
