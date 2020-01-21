<template>
    <b-container class='page-container'>
        <b-row v-if='!profile'>
            <b-col>
                <b-card title='CFBD Admin' sub-title='Please login to get started'>
                    <b-row>
                        <b-col>
                            <b-button variant='primary' href='/login'>
                            Login
                            </b-button>
                        </b-col>
                    </b-row>
                </b-card>
            </b-col>
        </b-row>
        <b-row v-else>
            <b-col>
                <b-card title='CFBD Admin' sub-title='Pick a team to begin editing rosters'>
                    <b-row>
                        <b-col v-for='conference in conferences' :key='conference' lg='3'>
                            <b-row class='justify-content-center'><strong>{{conference}}</strong></b-row>
                            <b-row v-for='team in getConferenceTeams(conference)' :key='team.school' class='ml-5'>
                                <b-link>{{team.school}}</b-link>
                            </b-row>
                        </b-col>
                    </b-row>
                </b-card>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
export default {
    props: ['profile'],
    data() {
        return {
            teams: []
        };
    },
    computed: {
        conferences() {
            return Array.from(new Set(this.teams.map((t) => t.conference))).sort();
        }
    },
    methods: {
        getConferenceTeams(conference) {
            return this.teams.filter((t) => t.conference === conference);
        }
    },
    created() {
        this.$axios.get('https://api.collegefootballdata.com/teams/fbs').then((results) => {
            this.teams = results.data;
        });
    }
};
</script>

<style lang='scss'>

</style>
