<template>
    <div v-if="remaining">

        <slot v-if="finished" name="finished">
            <div v-text="expiredText"></div>
        </slot>
        <slot v-if="!finished" name="main">
         	<span>
				<span data-days>-</span> Days,
			</span>
            <span>
				<span data-hours>-</span> Hours,
			</span>
            <span>
				<span data-minutes>-</span> Minutes,
			</span>
            <span>
				<span data-seconds>-</span> Seconds,
			</span>
        </slot>
    </div>
</template>

<script>

import moment from 'moment'
    export default {
        props: {
            until: String,
            expiredText: {default: 'Now Expired'},
        },
        data() {
            return {
                now: new Date(),
                remaining: null
            };
        },
        created(){
            this.now = new Date();
            let r = window.moment.duration(Date.parse(this.until) - this.now);
            if (r <= 0) this.$emit('finished');

            this.remaining = {
                total: r,
                days: r.days(),
                hours: r.hours(),
                minutes: r.minutes(),
                seconds: r.seconds()
            };
        },
        mounted() {
            this.refreshEverySecond();
        },
        computed: {
            finished() {
                return this.remaining && this.remaining.total <= 0;
            }
        },
        methods: {
            refreshEverySecond() {
                let interval = setInterval(() => {
                    this.now = new Date();
                    let r = window.moment.duration(Date.parse(this.until) - this.now);
                    if (r <= 0) this.$emit('finished');

                    this.remaining = {
                        total: r,
                        days: r.days(),
                        hours: r.hours(),
                        minutes: r.minutes(),
                        seconds: r.seconds()
                    };

                    this.$el.querySelector('[data-days]').innerText = this.remaining.days;
                    this.$el.querySelector('[data-hours]').innerText = this.remaining.hours;
                    this.$el.querySelector('[data-minutes]').innerText = this.remaining.minutes;
                    this.$el.querySelector('[data-seconds]').innerText = this.remaining.seconds;

                }, 1000);

                this.$on('finished', () => clearInterval(interval));
            }
        }
    }
</script>