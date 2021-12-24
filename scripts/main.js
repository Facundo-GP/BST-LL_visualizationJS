import {Lista, insertarLista} from "./lista.js";
import {BS_t , insertarABB} from "./arbol.js";
import {borrarTodo} from "./reset.js";

window.Lista = Lista;
window.agregarNodoLista = agregarNodoLista;
window.BS_t = BS_t;
window.insertarABB = insertarABB;
window.borrarTodo = borrarTodo;

var lista = new Lista;
var arbol = new BS_t;
