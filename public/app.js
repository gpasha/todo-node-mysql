  new Vue({
    vuetify : new Vuetify(),
    el: '#app',
    data() {
      return {
        isDark: true,
        show: true,
        todoTitle: '',
        todos: []
      }
    },
    created() {
      fetch('/api/todos')
        .then(res => res.json())
        .then(todos => this.todos = todos)
        .catch(e => console.log(e))
    },
    methods: {
      addTodo() {
        const title = this.todoTitle.trim()
        if (!title) {
          return
        }
        fetch('/api/todos', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify({title})
        })
          .then(res => res.json())
          .then(({todo}) => {
            console.log('todo: ', todo)
            this.todos.push(todo)
            this.todoTitle = ''
          })
          .catch(e => console.log('error: ', e))
      },
      completeTodo(id) {
        console.log(id);
        fetch(`/api/todos/${id}`, {
          method: 'PUT',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify({done: true})
        })
          .then(res => res.json())
          .then(todo => {
            const indexTodo = this.todos.findIndex(t => t.id === todo.id)
            this.todos[indexTodo].updatedAt = todo.updatedAt
          })
          .catch(e => console.log(e)) 
      },
      removeTodo(id) {
        fetch(`/api/todos/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-type': 'application/json'
          }
        })
          .then(res => {
            this.todos = this.todos.filter(todo => todo.id !== id)
          })
          .catch(e => console.log(e))
      }
    },
    filters: {
      capitalize(value) {
        return value.toString().charAt(0).toUpperCase() + value.slice(1)
      },
      date(value, withTime) {
        const options = {
          year: 'numeric',
          month: 'long',
          day: '2-digit'
        }
        if (withTime) {
          options.hour = '2-digit',
          options.minute = '2-digit',
          options.second = '2-digit'
        }
        return new Intl.DateTimeFormat('ru-RU', options).format(new Date(value))
      }
    }
  })