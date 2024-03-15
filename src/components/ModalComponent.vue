<template>
    <div v-if="isOpen" class="modal-mask">
        <div class="modal-wrapper">
            <div class="modal-container" ref="target">
                <div class="modal-header">
                    <slot name="header"></slot>
                </div>
                <div class="modal-body">
                    <slot name="content"></slot>
                </div>
                <div class="modal-footer">
                    <slot name="footer">
                        <button class="success" @click.stop="buttonSubmit">Save</button>
                    </slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps, defineEmits, ref } from 'vue';
import { onClickOutside } from '@vueuse/core'

defineProps({
    isOpen: Boolean,
});

const emit = defineEmits(['modal-close']);

const target = ref(null)
onClickOutside(target, () => emit('modal-close'))

const buttonSubmit = () => {
    emit('modal-close');
    emit('submit');
}

import { onMounted } from 'vue';

onMounted(() => {
    let self = this;
    window.addEventListener('keyup', function (event) {
        if (event.key === 'Escape') {
            emit('modal-close');
        }
    });
});

</script>

<style lang="scss" scoped>
@import '@/assets/base.scss';
@import '@/assets/mixins.scss';

.modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: $mask-color;
}

.modal-container {
    @include flex-col(.8rem);

    width: 32rem;
    margin: 150px auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px $shadow-color;

    .modal-footer {
        @include flex-row(.8rem);
    }
}
</style>