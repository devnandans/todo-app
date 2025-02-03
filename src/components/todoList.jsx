import { TodoItem } from "./todoItem"

export default function TodoList({ todos, toggleTodo, deleteTodo }){
    return (
        <ul className="list">
            {todos.length === 0 && "No Todos Available"}
            {todos.map(todo => {
            return (
                <TodoItem 
                    {...todo}
                    key={todo.id}
                    toggleTodo={toggleTodo}
                    deleteTodo={deleteTodo}
                />
            )
            })}
        </ul>
    )
}