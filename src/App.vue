<template>
    <div id="app">
        <navigation :profile='profile'></navigation>
        <router-view :profile='profile' />
    </div>
</template>

<script>
    import Navigation from '@/components/Navigation.vue';

    export default {
        components: {
            Navigation
        },
        data() {
            return {
                profile: null
            };
        },
        created() {
            this.$axios.get('/api/profile').then((res) => {
                this.profile = res.data;
            });
        }
    };

</script>


<style lang="scss">
    body {
        background: url('./assets/bg.jpg') no-repeat scroll;
        background-attachment: fixed;
    }

    #app {
        background: rgba(255, 255, 255, .5);
    }

    .spinner-container {
        margin-top: 4em;
    }

    div[class*="col-"],
    .col {
        margin-top: 2em;
    }

    .bottom-row {
        margin-bottom: 2em;
    }

    .page-container {
        margin-top: 2em;

        .title-card {
            .row {
                margin-bottom: 0;
            }

            div[class*="col-"],
            .col {
                margin-top: 0;
            }
        }
    }

    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        padding-bottom: 20px;
    }

    #nav {
        padding: 30px;

        a {
            font-weight: bold;
            color: #2c3e50;

            &.router-link-exact-active {
                color: #42b983;
            }
        }
    }

    html, body, #app {
        min-height: 100%
    }

</style>
