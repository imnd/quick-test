import { defineStore } from 'pinia'

export const useTasksStore = defineStore('tasks', {
  persist: true,

  state: () => ({
    /** @type {{ text: string, id: number, isFinished: boolean }[]} */
    todos: [],
    /** @type {'all' | 'finished' | 'unfinished'} */
    filter: 'all',
    nextId: 0,
  }),

  getters: {
    finishedTodos(state) {
      // autocompletion! ✨
      return state.todos.filter(todo => todo.isFinished)
    },
    unfinishedTodos(state) {
      return state.todos.filter(todo => !todo.isFinished)
    },

    /**
     * @returns {{ title: string, contents: string, id: number, isFinished: boolean }[]}
     */
    filteredTodos(state) {
      if (this.filter === 'finished') {
        // call other getters with autocompletion ✨
        return this.finishedTodos
      } else if (this.filter === 'unfinished') {
        return this.unfinishedTodos
      }
      return this.todos
    },
  },
  actions: {
    add(task) {
      this.todos.push({
        title: task.title,
        contents: task.contents,
        id: this.nextId++,
        isFinished: false
      });
    },
    delete(id) {
      this.todos = this.todos.filter(todo => todo.id !== id);
    },
    edit(id, data) {
      let tasks = state.todos.filter(todo => todo.id === id);
      let task = tasks[0];
      if (!task) {
        return;
      }

      for (const [key, value] of Object.entries(data)) {
        task[key] = value;
      }
    },
  },
})
