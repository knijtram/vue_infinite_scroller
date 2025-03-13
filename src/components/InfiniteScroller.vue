<template>
    <div ref="scrollContainer" class="infinite-container">
        <!-- Sentinel element to observe when near top -->
        <div ref="topSentinel" class="top-sentinel"></div>

        <!-- TransitionGroup for smooth enter animations -->
        <TransitionGroup name="fade" tag="div" class="items-wrapper">
            <div v-for="(item, index) in displayedItems" :key="item.id ?? index" class="item">
                <!-- Render each item using the parent-provided slot content -->
                <slot :item="item" />
            </div>
        </TransitionGroup>

        <!-- Sentinel element to observe when near bottom -->
        <div ref="bottomSentinel" class="bottom-sentinel"></div>
    </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';
import type { PropType } from 'vue'

interface EmitOptions {
    topThreshold: number;
    bottomThreshold: number;
}

export default defineComponent({
    name: 'InfiniteScroller',
    props: {
        items: {
            type: Array as PropType<any[]>,
            default: () => [],
            required: true
        },
        initialCount: {
            type: Number,
            default: 10
        },
        batchSize: {
            type: Number,
            default: 10
        },
        emitOptions: {
            type: Object as PropType<EmitOptions>
        }
    },
    emits: ['at-top', 'at-bottom'],
    watch: {
        items(value: any[]) {
            this.displayedItems = value.slice(0, this.initialCount);
        }
    },
    methods: {
        loadMore() {
            const start = this.displayedItems.length;
            const end = start + this.batchSize;
            const nextItems = this.items.slice(start, end);
            if (nextItems.length > 0) {
                this.displayedItems.push(...nextItems);
            }
        }
    },
    data() {
      return {
          topObserver: null as IntersectionObserver | null,
          bottomObserver: null as IntersectionObserver | null
      }
    },
    setup(props) {
        const displayedItems = ref<any[]>([]);
        const scrollContainer = ref<HTMLElement | null>(null);
        const topSentinel = ref<HTMLElement | null>(null);
        const bottomSentinel = ref<HTMLElement | null>(null);

        displayedItems.value = props.items.slice(0, props.initialCount);

        return {
            displayedItems,
            scrollContainer,
            topSentinel,
            bottomSentinel
        };
    },
    mounted() {
        if (this.bottomSentinel && this.scrollContainer) {
            this.bottomObserver = new IntersectionObserver(
                (entries) => {
                    const entry = entries[0];
                    if (entry.isIntersecting) {
                        this.loadMore();
                        this.$emit('at-bottom', { oldValue: false, newValue: true });
                    } else {
                        this.$emit('at-bottom', { oldValue: true, newValue: false });
                    }
                },
                {
                    root: this.scrollContainer,
                    rootMargin: `0px 0px ${this.emitOptions?.bottomThreshold ?? 100}px 0px`,
                    threshold: 0
                }
            );
            this.bottomObserver.observe(this.bottomSentinel);
        }

        if (this.topSentinel && this.scrollContainer) {
            this.topObserver = new IntersectionObserver(
                (entries) => {
                    const entry = entries[0];
                    if (entry.isIntersecting) {
                        this.$emit('at-top', { oldValue: false, newValue: true });
                    } else {
                        this.$emit('at-top', { oldValue: true, newValue: false });
                    }
                },
                {
                    root: this.scrollContainer,
                    rootMargin: `${this.emitOptions?.topThreshold ?? 0}px 0px 0px 0px`,
                    threshold: 0
                }
            );
            this.topObserver.observe(this.topSentinel);
        }
    },
    beforeUnmount() {
        if (this.topObserver) this.topObserver.disconnect();
        if (this.bottomObserver) this.bottomObserver.disconnect();
    }
});
</script>

<style scoped>
.infinite-container {
    height: 100%;
    overflow-y: auto;
}

.fade-enter-active {
    transition: opacity 0.5s;
}

.fade-enter-from {
    opacity: 0;
}
</style>