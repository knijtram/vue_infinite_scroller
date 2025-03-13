/// <reference types="../../node_modules/.vue-global-types/vue_3.5_0_0_0.d.ts" />
var _a;
import { ref, defineComponent } from 'vue';
export default defineComponent({
    name: 'InfiniteScroller',
    props: {
        items: {
            type: Array,
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
        nothingFoundMessage: {
            type: String,
            default: "No results found"
        },
        emitOptions: {
            type: Object
        }
    },
    emits: ['at-top', 'at-bottom'],
    watch: {
        items(value) {
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
            topObserver: null,
            bottomObserver: null
        };
    },
    setup(props) {
        const displayedItems = ref([]);
        displayedItems.value = props.items.slice(0, props.initialCount);
        return {
            displayedItems
        };
    },
    mounted() {
        var _a, _b, _c, _d;
        const scrollContainer = this.$refs.scrollContainer;
        const topSentinel = this.$refs.topSentinel;
        const bottomSentinel = this.$refs.bottomSentinel;
        if (scrollContainer) {
            if (topSentinel) {
                this.topObserver = new IntersectionObserver((entries) => {
                    const entry = entries[0];
                    if (entry.isIntersecting) {
                        this.$emit('at-top', { oldValue: false, newValue: true });
                    }
                    else {
                        this.$emit('at-top', { oldValue: true, newValue: false });
                    }
                }, {
                    root: scrollContainer,
                    rootMargin: `${(_b = (_a = this.emitOptions) === null || _a === void 0 ? void 0 : _a.topThreshold) !== null && _b !== void 0 ? _b : 0}px 0px 0px 0px`,
                    threshold: 0.5
                });
                this.topObserver.observe(topSentinel);
            }
            if (bottomSentinel) {
                this.bottomObserver = new IntersectionObserver((entries) => {
                    const entry = entries[0];
                    if (entry.isIntersecting) {
                        this.loadMore();
                        this.$emit('at-bottom', { oldValue: false, newValue: true });
                    }
                    else {
                        this.$emit('at-bottom', { oldValue: true, newValue: false });
                    }
                }, {
                    root: scrollContainer,
                    rootMargin: `0px 0px ${(_d = (_c = this.emitOptions) === null || _c === void 0 ? void 0 : _c.bottomThreshold) !== null && _d !== void 0 ? _d : 100}px 0px`,
                    threshold: 0
                });
                this.bottomObserver.observe(bottomSentinel);
            }
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
if (__VLS_ctx.displayedItems.length > 0) {
    for (const [item, index] of __VLS_getVForSourceType((__VLS_ctx.displayedItems))) {
        __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            key: ((_a = item.id) !== null && _a !== void 0 ? _a : index),
            ...{ class: "item" },
        });
        var __VLS_4 = {
            item: (item),
        };
    }
}
else {
    __VLS_asFunctionalElement(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({});
    (__VLS_ctx.nothingFoundMessage);
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