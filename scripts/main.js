import {Lista, insertarLista} from "./lista.js";
import {BS_t , insertarABB} from "./arbol.js";
import {borrarTodo} from "./reset.js";

window.Lista = Lista;
window.insertarLista = insertarLista;
window.BS_t = BS_t;
window.insertarABB = insertarABB;
window.borrarTodo = borrarTodo;

window.arbol = new BS_t;
window.lista = new Lista;
