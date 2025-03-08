/// <reference types="../../node_modules/.vue-global-types/vue_3.5_0_0_0.d.ts" />
var _a;
import { ref, defineComponent } from 'vue';
export default defineComponent({
    name: 'InfiniteScroller',
    props: {
        items: {
            type: Array,
            default: () => []
        },
        initialCount: {
            type: Number,
            default: 10
        },
        batchSize: {
            type: Number,
            default: 10
        }
    },
    emits: ['at-top'],
    watch: {
        items: {
            handler(value) {
                this.displayedItems = value.slice(0, this.initialCount);
            }
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
    setup(props) {
        const displayedItems = ref([]);
        const scrollContainer = ref(null);
        const topSentinel = ref(null);
        const bottomSentinel = ref(null);
        const topObserver = ref(null);
        const bottomObserver = ref(null);
        displayedItems.value = props.items.slice(0, props.initialCount);
        return {
            displayedItems,
            scrollContainer,
            topObserver,
            bottomObserver,
            topSentinel,
            bottomSentinel
        };
    },
    mounted() {
        if (this.bottomSentinel && this.scrollContainer) {
            this.bottomObserver = new IntersectionObserver((entries) => {
                const entry = entries[0];
                if (entry.isIntersecting) {
                    this.loadMore();
                }
            }, {
                root: this.scrollContainer,
                rootMargin: '0px 0px 100px 0px',
                threshold: 0
            });
            this.bottomObserver.observe(this.bottomSentinel);
        }
        if (this.topSentinel && this.scrollContainer) {
            this.topObserver = new IntersectionObserver((entries) => {
                const entry = entries[0];
                if (entry.isIntersecting) {
                    this.$emit('at-top', { oldValue: false, newValue: true });
                }
                else {
                    this.$emit('at-top', { oldValue: true, newValue: false });
                }
            }, {
                root: this.scrollContainer,
                rootMargin: '0px 0px 0px 0px',
                threshold: 0
            });
            this.topObserver.observe(this.topSentinel);
        }
    },
    beforeUnmount() {
        if (this.topObserver)
            this.topObserver.disconnect();
        if (this.bottomObserver)
            this.bottomObserver.disconnect();
    }
});
debugger; /* PartiallyEnd: #3632/script.vue */
const __VLS_ctx = {};
let __VLS_components;
let __VLS_directives;
// CSS variable injection 
// CSS variable injection end 
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ref: "scrollContainer",
    ...{ class: "infinite-container" },
});
/** @type {typeof __VLS_ctx.scrollContainer} */ ;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ref: "topSentinel",
    ...{ class: "top-sentinel" },
});
/** @type {typeof __VLS_ctx.topSentinel} */ ;
const __VLS_0 = {}.TransitionGroup;
/** @type {[typeof __VLS_components.TransitionGroup, typeof __VLS_components.TransitionGroup, ]} */ ;
// @ts-ignore
const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
    name: "fade",
    tag: "div",
    ...{ class: "items-wrapper" },
}));
const __VLS_2 = __VLS_1({
    name: "fade",
    tag: "div",
    ...{ class: "items-wrapper" },
}, ...__VLS_functionalComponentArgsRest(__VLS_1));
__VLS_3.slots.default;
for (const [item, index] of __VLS_getVForSourceType((__VLS_ctx.displayedItems))) {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        key: ((_a = item.id) !== null && _a !== void 0 ? _a : index),
        ...{ class: "item" },
    });
    var __VLS_4 = {
        item: (item),
    };
}
var __VLS_3;
__VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
    ref: "bottomSentinel",
    ...{ class: "bottom-sentinel" },
});
/** @type {typeof __VLS_ctx.bottomSentinel} */ ;
/** @type {__VLS_StyleScopedClasses['infinite-container']} */ ;
/** @type {__VLS_StyleScopedClasses['top-sentinel']} */ ;
/** @type {__VLS_StyleScopedClasses['items-wrapper']} */ ;
/** @type {__VLS_StyleScopedClasses['item']} */ ;
/** @type {__VLS_StyleScopedClasses['bottom-sentinel']} */ ;
// @ts-ignore
var __VLS_5 = __VLS_4;
var __VLS_dollars;
let __VLS_self;
//# sourceMappingURL=InfiniteScroller.vue.js.map