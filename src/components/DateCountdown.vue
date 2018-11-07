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
            <span>
				<span data-seconds>-</span> Seconds,
			</span>
        </slot>
    </div>
</template>

<script>

    export default {
        props: {
            until: String,
            expiredText: {default: 'Now Expired'},
        },
        data() {
            return {
                remaining: null
            };
        },
        created() {
            this.remaining = this.getTimeDifference(this.until);
        },
        mounted() {
            this.refreshEverySecond();
        },
        computed: {
            finished() {
                return this.remaining && this.remaining.completed;
            }
        },
        methods: {
            getTimeDifference(date, now = null) {
                const startDate = typeof date === 'string' ? new Date(date) : date;

                if (!now) now = Date.now();

                let controlled = false;
                let precision = 0;

                const total = parseInt(
                    (Math.max(0, controlled ? startDate : startDate - now) / 1000).toFixed(
                        Math.max(0, Math.min(20, precision))
                    ) * 1000,
                    10
                );

                const seconds = total / 1000;

                return {
                    total,
                    days: Math.floor(seconds / (3600 * 24)),
                    hours: Math.floor((seconds / 3600) % 24),
                    minutes: Math.floor((seconds / 60) % 60),
                    seconds: Math.floor(seconds % 60),
                    milliseconds: Number(((seconds % 1) * 1000).toFixed()),
                    completed: total <= 0,
                };
            },
            refreshEverySecond() {
                let interval = setInterval(() => {
                    this.remaining = this.getTimeDifference(this.until);

                    if (this.$el.querySelector('[data-days]'))
                        this.$el.querySelector('[data-days]').innerText = this.remaining.days;

                    if (this.$el.querySelector('[data-hours]'))
                        this.$el.querySelector('[data-hours]').innerText = this.remaining.hours;

                    if (this.$el.querySelector('[data-minutes]'))
                        this.$el.querySelector('[data-minutes]').innerText = this.remaining.minutes;

                    if (this.$el.querySelector('[data-seconds]'))
                        this.$el.querySelector('[data-seconds]').innerText = this.remaining.seconds;

                    if (this.$el.querySelector('[data-milliseconds]'))
                        this.$el.querySelector('[data-milliseconds]').innerText = this.remaining.milliseconds;

                }, 1000);

                this.$on('finished', () => clearInterval(interval));
            }
        }
    }
</script>