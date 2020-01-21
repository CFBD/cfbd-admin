<template>
    <div>
        <b-navbar toggleable="md" type="dark" variant="secondary">
            <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
            <b-navbar-brand to="/">CFBD Admin</b-navbar-brand>
            <b-collapse is-nav id="nav_collapse">
                <b-navbar-nav class='ml-auto'>
                    <b-button v-if='!profile' variant='primary' href="/login">
                        Login
                    </b-button>
                    <b-button v-else variant='warning' href='/logout'>
                        Logout
                    </b-button>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
</template>

<script>
    export default {
        props: ['profile']
    };

</script>

<style lang="scss">

</style>
