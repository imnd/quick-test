<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
    <header>
        <div class="wrapper">
            <nav>
                <RouterLink to="/">Home</RouterLink>
                <RouterLink to="/tasks">Tasks list</RouterLink>
            </nav>
        </div>
    </header>

    <RouterView />
</template>

<style lang="scss" scoped>

header {
    line-height: 1.5;
    max-height: 100vh;
}

nav {
    width: 100%;
    font-size: 12px;
    text-align: center;

    a {
        display: inline-block;
        padding: .5rem 1rem;
        border-left: 1px solid var(--color-border);

        &:first-of-type {
            border: 0;
        }

        &.router-link-exact-active {
            color: var(--color-text);
        }

        &.router-link-exact-active:hover {
            background-color: transparent;
        }
    }
}

@media (min-width: 1024px) {
    header {
        display: flex;
        padding-right: calc(var(--section-gap) / 2);

        .wrapper {
            display: flex;
            place-items: flex-start;
            flex-wrap: wrap;
        }
    }

    nav {
        text-align: left;
        margin-left: -1rem;
        font-size: 1rem;
        padding: 0 0 1rem;
    }
}
</style>
