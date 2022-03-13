import { Action, createReducer, on } from '@ngrx/store';

import { Todo } from './models/todo.model';
import { crearTodo, toggle, editar, borrar, toggleAll, limpiarCompletados } from './todo.actions';

export const estadoInicial:Todo[] = [
      new Todo('Salvar al mundo'),
      new Todo('CRUD Alumnos'),
      new Todo('Aprender REDUX'),
      new Todo('Dormir')
];
 
const _todoReducer = createReducer(
  estadoInicial,
  on(crearTodo, (state, {texto}) => [...state, new Todo( texto )]),
  on(toggle, (state, {id}) => state.map( todo => {
        if( todo.id == id){
              return {...todo, completado: !todo.completado}
              }else{return todo;}
        })
  ),
  on(editar, (state, {id , texto}) => {
      return state.map( todo => {
            if( todo.id == id){
                  return {
                        ...todo,
                        texto: texto
                  }
            }else{
                  return todo;
            }
      });
  }),
  on(borrar, (state, {id}) => state.filter( todo => todo.id !== id)),
  on(toggleAll, (state, {completado}) => state.map(todo => { return {...todo,completado: completado} })),
  on(limpiarCompletados, (state) => state.filter( todo => !todo.completado)),
);
 
export function todoReducer(state:Todo[] = estadoInicial, action: Action) {
  return _todoReducer(state, action);
}