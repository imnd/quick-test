<template>
    <main>
        <h1>Tasks list</h1>
        <div class="tasks-list">
            <div class="task" :class="task.isFinished ? 'finished' : ''" v-for="(task, key) in tasks.todos">
                <div>
                    <h3>{{ task.title }}</h3>
                    <p>{{ task.contents }}</p>
                </div>
                <div class="buttons">
                    <button class="primary" @click="openEditTaskModal(task)">Edit</button>
                    <button class="danger" @click="openDeleteTaskModal(task)">Delete</button>
                </div>
            </div>
        </div>

        <button class="success" @click="openAddTaskModal">Add task</button>

        <!-- Add task modal -->
        <ModalComponent
            :isOpen="isAddModalOpened"
            @modal-close="closeAddTaskModal"
            @submit="addTask"
        >
            <template #header><h2>Add task</h2></template>
            <template #content>
                <form>
                    <div class="form-row">
                        <label for="title">Title</label>
                        <input name="title" v-model="taskTitle" />
                    </div>
                    <div class="form-row">
                        <label for="contents">What to do</label>
                        <textarea name="contents" v-model="taskContents" />
                    </div>
                </form>
            </template>
        </ModalComponent>

        <!-- Delete task modal -->
        <ModalComponent
            :isOpen="isDeleteModalOpened"
            @modal-close="closeDeleteTaskModal"
        >
            <template #header><h2>Delete task?</h2></template>
            <template #footer>
                <button class="danger" @click.stop="deleteTask">Yes</button>
                <button class="success" @click.stop="closeDeleteTaskModal">Cancel</button>
            </template>
        </ModalComponent>

        <!-- Edit task modal -->
        <ModalComponent
            :isOpen="isEditModalOpened"
            @modal-close="closeEditTaskModal"
        >
            <template #header><h2>Edit task</h2></template>
            <template #content>
                <form>
                    <div class="form-row">
                        <label for="title">Title</label>
                        <input name="title" v-model="editedTask.title" />
                    </div>
                    <div class="form-row">
                        <label for="contents">What to do</label>
                        <textarea name="contents" v-model="editedTask.contents" />
                    </div>
                    <div class="form-row row">
                        <input type="checkbox" name="is-finished" v-model="editedTask.isFinished" />
                        <label for="is-finished">Is finished</label>
                    </div>
                </form>
            </template>
            <template #footer>
                <button class="success" @click.stop="closeEditTaskModal">Close</button>
            </template>
        </ModalComponent>
    </main>
</template>

<script setup>
import { ref } from 'vue';
import ModalComponent from '@/components/ModalComponent.vue';

import { useTasksStore } from '@/stores/tasks';
const tasks = useTasksStore();
let editedTask = null;
let taskToDelete = null;

// Add task
let taskTitle = '';
let taskContents = '';

const isAddModalOpened = ref(false);
const openAddTaskModal = () => isAddModalOpened.value = true;
const closeAddTaskModal = () => isAddModalOpened.value = false;
const addTask = () => {
    tasks.add({
        title: taskTitle,
        contents: taskContents
    });
    taskTitle = '';
    taskContents = '';
}

// Delete task
const isDeleteModalOpened = ref(false);
const openDeleteTaskModal = (task) => {
    isDeleteModalOpened.value = true;
    taskToDelete = task;
}
const closeDeleteTaskModal = () => isDeleteModalOpened.value = false;
const deleteTask = () => {
    tasks.delete(taskToDelete.id);
    closeDeleteTaskModal();
}

// Edit task
const isEditModalOpened = ref(false);
const openEditTaskModal = (task) => {
    isEditModalOpened.value = true;
    editedTask = task;
}
const closeEditTaskModal = () => isEditModalOpened.value = false;

</script>

<style lang="scss" scoped>
@import '@/assets/mixins.scss';
@import '@/assets/base.scss';

.tasks-list {
    @include flex-col(.5rem);
    margin-bottom: 1rem;

    .task {
        @include flex-row(2rem);
        border: 1px solid $base-color;
        border-radius: .4rem;
        padding: 1rem;
        justify-content: space-between;

        &.finished {
            background-color: bisque;
        }

        div {
            @include flex-col(.4rem);

            h3 {
                font-weight: bold;
            }

            &.buttons {
                align-items: flex-end;
                justify-content: flex-end;
            }
        }
    }
}

.row {
    @include flex-row(.5rem);
}
</style>
