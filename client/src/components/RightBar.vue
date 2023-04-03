<template>
  <div :class="windowIsSmall ? 'mobile' : 'pc'" class="container_right-block">
    <div class="input-field_todos">
      <img src="../icons/plus.svg">
      <input @keyup.enter="addTodo" v-model="todoValue" type="text" placeholder="Add note...">
    </div>
    <!-- todos -->

    <!-- ALL TODOS -->
    <div v-if="this.$store.state.selectedList.title === 'All notes'" class="all-todos">

      <!-- important todos -->
      <div class="important-todos">
        <div v-for="todo in allImportantTodos" :key="todo.id" class="todo">
          <div>
            <input class="selected-checkbox" type="checkbox">
            <!-- slice text if there are more than 120 characters -->
            <h3>{{ todo.title?.length > 120 ? `${todo.title.slice(0, 120)}...` : todo.title }}</h3>
          </div>
          <div class="checkbox-operation">
            <input v-on:change="checkImportant(todo)" class="important-checkbox active" type="checkbox">
            <input class="more-checkbox" readonly type="checkbox"> 
          </div>
        </div>
      </div>

      <!--not selected, not important todos-->
      <div>
        <!-- filter all todos -->
        <div v-for="todo in todos.filter(todo => todo.statusSelected == false && todo.statusImportant == false)" :key="todo.id" class="todo">
        <div>
          <!-- doCheck() for adding todo to selectTodos array -->
          <input v-on:change="checkSelected(todo)" class="selected-checkbox" type="checkbox">
          <!-- slice text if there are more than 120 characters -->
          <h3>{{ todo.title?.length > 120 ? `${todo.title.slice(0, 120)}...` : todo.title }}</h3>
        </div>
        <div class="checkbox-operation">
          <input v-on:change="checkImportant(todo)" readonly class="important-checkbox" type="checkbox"> 
          <input @click="todo.more = !todo.more" class="more-checkbox" readonly type="checkbox"> 
        </div>

        <!--background for closing modal 'options'-->
        <div v-if="todo.more" @click="todo.more = !todo.more" class="background"></div>
        <!--options-->
        <div v-if="todo.more" class="options">
          <div @click="editTodoFunctions(todo)" class="edit-tool">
              <input readonly class="edit-checkbox">
              <h3>Edit</h3>
           </div>

           <div @click="todo.remove = !todo.remove, todo.more = !todo.more" class="remove-tool">
               <input readonly class="delete-checkbox">
               <h3>Remove</h3> 
           </div>
        </div>   
      </div>
      </div>

      <!-- selected todos -->
      <div class="selected-todos">
        <div v-for="todo in allSelectedTodos" :key="todo.id" class="todo selected">
          <div>
            <input v-on:change="checkSelected(todo)" class="selected-checkbox active" type="checkbox">
            <!-- slice text if there are more than 120 characters -->
            <h3>{{ todo.title?.length > 120 ? `${todo.title.slice(0, 120)}...` : todo.title }}</h3>
          </div>
          <div class="checkbox-operation">
            <input class="more-checkbox" readonly type="checkbox"> 
          </div>
        </div>
      </div>
    </div>



    <!-- PERSONAL TODOS -->
    <div v-else class="all-todos">

      <!--important todos-->
      <div class="important-todos">
        <div v-for="personalTodo in personalTodos.filter(todo => todo.statusImportant == true)" :key="personalTodo.id" class="todo">
          <div>
            <input class="selected-checkbox" type="checkbox">
            <!-- slice text if there are more than 120 characters -->
            <h3>{{ personalTodo.title?.length > 120 ? `${personalTodo.title.slice(0, 120)}...` : personalTodo.title }}</h3>
          </div>
          <div class="checkbox-operation">
            <input v-on:change="checkImportant(personalTodo)" class="important-checkbox active" type="checkbox">
            <input class="more-checkbox" readonly type="checkbox"> 
          </div>
        </div>
      </div>

      <!--not selected, not important todos-->
      <div>
        <div v-for="personalTodo in personalTodos.filter(todo => todo.statusSelected == false && todo.statusImportant == false)" :key="personalTodo.id" class="todo">
            <div>
                <input v-on:change="checkSelected(personalTodo)"  class="selected-checkbox" type="checkbox">
                <!-- slice text if there are more than 120 characters  -->
                <h3>{{ personalTodo.title?.length > 120 ? `${personalTodo.title.slice(0, 120)}...` : personalTodo.title }}</h3>
            </div>
            <div class="checkbox-operation">
              <input v-on:change="checkImportant(personalTodo)" readonly class="important-checkbox" type="checkbox"> 
              <input @click="personalTodo.more = !personalTodo.more" class="more-checkbox" readonly type="checkbox"> 
            </div>
            <!--background for closing modal 'options'-->
            <div v-if="personalTodo.more" @click="personalTodo.more = !personalTodo.more" class="background"></div>
            <!--options-->
            <div v-if="personalTodo.more" class="options">
              <div @click="editTodoFunctions(personalTodo)" class="edit-tool">
                  <input readonly class="edit-checkbox">
                  <h3>Edit</h3>
               </div>
             
               <div @click="personalTodo.remove = !personalTodo.remove, personalTodo.more = !personalTodo.more" class="remove-tool">
                   <input readonly class="delete-checkbox">
                   <h3>Remove</h3> 
               </div>
            </div>  
        </div>
      </div>

      <!--selected todos-->
      <div class="selected-todos">
        <div v-for="personalTodo in personalTodos.filter(todo => todo.statusSelected == true)" :key="personalTodo.id" class="todo selected">
          <div>
            <input @click="checkSelected(personalTodo)" class="selected-checkbox active" type="checkbox">
            <!-- slice text if there are more than 120 characters -->
            <h3>{{ personalTodo.title?.length > 120 ? `${personalTodo.title.slice(0, 120)}...` : personalTodo.title }}</h3>
          </div>
          <div class="checkbox-operation">
            <input class="more-checkbox" readonly type="checkbox"> 
          </div>
        </div>
      </div>
    </div>

    <!-- if there are no todos -->
    <div v-if="this.todos.length == 0 && this.allImportantTodos.length == 0 && this.allSelectedTodos.length == 0" class="empty-box">
      <img src="../icons/box.svg" alt="">
    </div>


    <!-- Remove popup -->
    <div v-for="todo in todos" :key="todo.id" :class="todo.remove ? 'active': 'notactive'" class="popup-background remove-popup-background">
      <div class="delete-popup">
      <div class="delete-popup_content">
        <img @click="todo.remove = !todo.remove" class="close-icon" src="../icons/close-btn.svg">
        <img class="delete-popup-icon" src="../icons/info.svg" alt="">
        <h3>Are you sure you want remove this note?</h3>
        <div class="delete-popup-buttons">
          <button @click="removeTodo(todo)" class="popup-btn">Yes, remove</button>
          <button @click="todo.remove = !todo.remove" class="cancel-btn">Cancel</button>
        </div>
      </div>
    </div>
    </div>

        <!-- Edit popup -->
        <div v-for="todo in todos" :key="todo.id" :class="todo.edit ? 'active': 'notactive'" class="popup-background edit-popup-background">
          <div class="edit-popup">
            <div class="edit-popup-content">
              <img @click="todo.edit = !todo.edit" class="close-icon" src="../icons/close-btn.svg">
              <input v-model="editedTodoValue" type="text" class="edit-popup-input">
              <button v-bind:value="editedTodoValue" @click="editTodo(todo)" class="popup-btn">Edit</button>
            </div>
          </div>
      </div>
    
  </div>
</template>

<script>

import axios from 'axios'
export default {
  props: ['someProps', 'windowIsSmall'],
  data() {
    return {
      /* all todos*/
      todos: [],
      /* personal todos */
      personalTodos: [],
      /* for counter in LeftBar */
      todosLength: 0,
    }
  },
  async mounted() {
    const response = await axios.get('http://localhost:3000/get_todos')
    const allTodos = response.data
    this.todos = allTodos.filter(todo => todo.userEmail == this.$store.state.userEmail)
    this.$store.commit('setTodos', this.todos)
  },
  methods: {
    async addTodo() {
      // body of todo 
      const newTodo = {
        title: this.todoValue,
        id: Math.random(),
        familyList: this.$store.state.selectedList.title,
        statusSelected: false,
        statusImportant: false,
        moreOption: false,
        editOption: false, 
        removeOption: false,
        userEmail: this.$store.state.userEmail
      }

      // send todo to server
      const response = await axios.post('http://localhost:3000/todos', newTodo)
      // this.todos.push(response.data)
      this.$store.commit('addTodo', response.data)
      this.todoValue = ''
    },
    /* remove this todo */
    async removeTodo(todo) {
      await axios.delete(`http://localhost:3000/todos/${todo._id}`, todo)
      // this.todos = this.todos.filter((t) => t !== todo)
      this.$store.commit('deleteTodo', todo._id)
    },
    /* edit input === this todo.title, close popups */
    editTodoFunctions(todo) {
      this.editedTodoValue = todo.title
      todo.edit = !todo.edit
      todo.more = !todo.more
    },
    /* edit this todo.title */
    async editTodo(todo) {
      todo.title = this.editedTodoValue
      await axios.put(`http://localhost:3000/todos/${todo._id}`, todo)
      todo.edit = false
    },

    /* selected todos function */
    async checkSelected (todo) {
      if (todo.statusSelected) {
        todo.statusSelected = false
      } else if (!todo.statusSelected) {
        todo.statusSelected = true
      }
      await axios.put(`http://localhost:3000/todos/${todo._id}`, todo)
    },
    /* important todos function */
    async checkImportant(todo) {
      if (todo.statusImportant) {
        todo.statusImportant = false
      } else if (!todo.statusImportant) {
        todo.statusImportant = true
      }
      await axios.put(`http://localhost:3000/todos/${todo._id}`, todo)
  },

  },
  /* filter all todos by todo.family property for creating extra array (personalTodos) */
  computed:{
    todos: function() {
      return this.$store.state.todos
    },
    personalTodos: function() {
      return this.$store.state.todos.filter(todo => todo.familyList === this.$store.state.selectedList.title)
    },
    allImportantTodos: function() {
      return this.todos.filter(todo => todo.statusImportant == true)
    },
    allSelectedTodos: function() {
      return this.todos.filter(todo => todo.statusSelected == true)
    },
  }

}
</script>

<style>

  .container_right-block {
    position: relative;
    margin: 0 40px 40px 0;
  }

  .container_right-block.mobile * {
    font-size: 16px;
  }

  .input-field_todos {
    height: 46px;
    background: rgba(66, 121, 205, 0.1);
    border-radius: 4px;
    display: flex;
    align-items: center;
  }

  .input-field_todos input::placeholder {
    color: #427acd77;
  }

  .input-field_todos img {
    margin-right: 0 8px;
  }

  .input-field_todos input {
    width: 100%;
  }

  /* for empty box */

  .empty-box {
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .empty-box img {
    width: 160px;
    height: 168px;
  }

  .all-todos {
    margin-top: 12px;
  }

  .todo {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #fff;
    color: #000;
    border-radius: 4px;
    height: 46px;
    font-size: 12px;
    font-weight: 600;
    margin-bottom: 4px;
  }

  .todo.selected {
    background-color: #F7FAFD;
    text-decoration: line-through;
  }

  .selected-todos {
    margin-top: 12px;
  }

  .todo div {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* checkboxes */

  .selected-checkbox, .important-checkbox {
    -webkit-appearance: none;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .selected-checkbox {
    margin: 0 16px;
    background-color: #ECF2FA;
    height: 18px;
    width: 18px; 
    border-radius: 4px;
  }
  .selected-checkbox.active {
    background-image: url(@/icons/check-box-checked.svg);
    height: 18px;
    width: 18px;
    background-size: 100%;
  }

  .important-checkbox {
    background: url("@/icons/important.svg") no-repeat;
    height: 32px;
    width: 32px;
    background-size: 100%;
    margin-right: 4px;
  }

  .important-checkbox.active {
    background: url("@/icons/important-filled.svg") no-repeat;
    height: 32px;
    width: 32px;
    background-size: 100%;
  }

  .more-checkbox {
    -webkit-appearance: none;
    background: url("@/icons/dots.svg") no-repeat;
    height: 32px;
    width: 32px;
    background-size: 100%;
  }

  .checkbox-operation {
    margin: 0 8px;
  }

  .options {
    position: absolute;
    z-index: 999;
    right: 40px;
    top: -4px;
    width: 138px;
    height: 84px;
    padding: 0 8px;
    display: flex;
    flex-direction: column;

    background: #FFFFFF;
    box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.16);
    border-radius: 8px;
  }

  .options div {
    display: flex;
    cursor: pointer;
    align-self: flex-start;
    height: 32px;
    font-weight: 600;
  }

  .options div input {
    width: 32px;
    height: 32px;
    margin-right: 4px;
  }

  .edit-checkbox {
    background: url("@/icons/edit.svg") no-repeat;
  }

  .delete-checkbox {
    background: url("@/icons/blue-remove.svg") no-repeat;
  }


  .popup-background {
    background: rgba(236, 242, 250, 0.5);
    position: fixed;
    width: 99%;
    height: 99%;
    top: 0;
    left: 0;
    align-items: center;
    justify-content: center;
  }

  .remove-popup-background.notactive, .edit-popup-background.notactive {
    display: none;
  }

  .remove-popup-background.active, .edit-popup-background.active {
    display: flex;
  }

  /* delete popup */
  .delete-popup {
    z-index: 999;
    width: 280px;
    height: 280px;
    background: #FFFFFF;
    border-radius: 8px;
  }

  .delete-popup_content {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .close-icon {
    position: absolute;
    width: 32px;
    height: 32px;
    right: 16px;
    top: 16px;
    cursor: pointer;
  }

  .delete-popup-icon {
    width: 64px;
    height: 64px;
    margin-top: 32px;
  }

  .delete-popup h3 {
    width: 216px;
    height: 48px;
    margin-bottom: 24px;
    text-align: center;
    font-weight: 700;
    font-size: 14px;
    line-height: 24px;
  }

  .delete-popup-buttons {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .popup-btn, .cancel-btn {
    width: 216px;
    height: 40px;
  }

  .popup-btn {
    background: #4279CD;
    border-radius: 4px;
    color: #fff;
  }
  .cancel-btn {
    margin-top: 8px;
    color: #4279CD;
    background: #fff;
  }

  .edit-popup {
    z-index: 999;
    margin: 0 12px;
    width: 424px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    background: #fff;
  }

  .edit-popup-content {
    position: relative;
    width: 100%;
    padding: 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    font-weight: 700;
  }

  .edit-popup-input {
    margin: 58px 0 76px;
    width: 100%;
    height: 42px;
    padding: 0 5px;
    background: #ECF2FA;
    font-size: 14px;
    font-weight: 700;
  }

  /* important todos */

  .important-todos {
    margin-bottom: 12px;
  }

  .background {
    z-index: 997;
    position: fixed;
    display: block;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }

</style>