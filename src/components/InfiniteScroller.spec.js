"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const vitest_1 = require("vitest");
const test_utils_1 = require("@vue/test-utils");
const InfiniteScroller_vue_1 = tslib_1.__importDefault(require("@/components/InfiniteScroller.vue"));
// Create a mock IntersectionObserver to simulate intersection events.
class IntersectionObserverMock {
    constructor(callback, options) {
        this.target = null;
        this.callback = callback;
        this.options = options;
    }
    observe(target) {
        this.target = target;
    }
    disconnect() {
        // This method can be spied on.
    }
    // Helper to simulate intersection events.
    trigger(isIntersecting) {
        const entry = {
            target: this.target,
            isIntersecting,
            intersectionRatio: isIntersecting ? 1 : 0,
            time: Date.now(),
            boundingClientRect: {},
            intersectionRect: {},
            rootBounds: null,
        };
        this.callback([entry]);
    }
}
// Override the global IntersectionObserver with our mock.
let originalIntersectionObserver;
(0, vitest_1.beforeAll)(() => {
    originalIntersectionObserver = globalThis.IntersectionObserver;
    globalThis.IntersectionObserver = IntersectionObserverMock;
});
(0, vitest_1.afterAll)(() => {
    globalThis.IntersectionObserver = originalIntersectionObserver;
});
// Helper to generate items.
const generateItems = (count) => Array.from({ length: count }, (_, i) => ({ id: i, text: `Item ${i}` }));
(0, vitest_1.describe)('InfiniteScroller.vue', () => {
    (0, vitest_1.it)('initializes displayedItems with initialCount items', () => {
        const items = generateItems(25);
        const wrapper = (0, test_utils_1.mount)(InfiniteScroller_vue_1.default, {
            props: { items, initialCount: 10, batchSize: 5 },
            slots: {
                default: ({ item }) => `<div class="slot-item">${item.text}</div>`
            },
        });
        (0, vitest_1.expect)(wrapper.vm.displayedItems.length).toBe(10);
        (0, vitest_1.expect)(wrapper.findAll('.item').length).toBe(10);
    });
    (0, vitest_1.it)('handles items array smaller than initialCount', () => {
        const smallItems = generateItems(5);
        const wrapper = (0, test_utils_1.mount)(InfiniteScroller_vue_1.default, {
            props: { items: smallItems, initialCount: 10, batchSize: 5 },
            slots: {
                default: ({ item }) => `<div class="slot-item">${item.text}</div>`
            },
        });
        // Should display all available items.
        (0, vitest_1.expect)(wrapper.vm.displayedItems.length).toBe(5);
    });
    (0, vitest_1.it)('updates displayedItems when items prop changes', async () => {
        const initialItems = generateItems(5);
        const newItems = generateItems(15);
        const wrapper = (0, test_utils_1.mount)(InfiniteScroller_vue_1.default, {
            props: { items: initialItems, initialCount: 10, batchSize: 5 },
            slots: {
                default: ({ item }) => `<div class="slot-item">${item.text}</div>`
            },
        });
        (0, vitest_1.expect)(wrapper.vm.displayedItems.length).toBe(5);
        await wrapper.setProps({ items: newItems });
        // After update, displayedItems should be the first 10 of newItems.
        (0, vitest_1.expect)(wrapper.vm.displayedItems.length).toBe(10);
    });
    (0, vitest_1.it)('loads more items when bottom sentinel intersects', async () => {
        const items = generateItems(25);
        const wrapper = (0, test_utils_1.mount)(InfiniteScroller_vue_1.default, {
            props: { items, initialCount: 10, batchSize: 5 },
            slots: {
                default: ({ item }) => `<div class="slot-item">${item.text}</div>`
            },
        });
        const bottomObserver = wrapper.vm.bottomObserver;
        // First trigger: should load 5 more items.
        bottomObserver.trigger(true);
        (0, vitest_1.expect)(wrapper.vm.displayedItems.length).toBe(15);
        // Trigger twice more.
        bottomObserver.trigger(true);
        bottomObserver.trigger(true);
        // Should not exceed total items.
        (0, vitest_1.expect)(wrapper.vm.displayedItems.length).toBe(25);
        // Further triggers won't add items.
        bottomObserver.trigger(true);
        (0, vitest_1.expect)(wrapper.vm.displayedItems.length).toBe(25);
    });
    (0, vitest_1.it)('emits "at-top" event correctly when top sentinel intersects', async () => {
        var _a, _b;
        const items = generateItems(25);
        const wrapper = (0, test_utils_1.mount)(InfiniteScroller_vue_1.default, {
            props: { items, initialCount: 10, batchSize: 5 },
            slots: {
                default: ({ item }) => `<div class="slot-item">${item.text}</div>`
            },
        });
        const topObserver = wrapper.vm.topObserver;
        // Simulate the top sentinel entering view.
        topObserver.trigger(true);
        (0, vitest_1.expect)((_a = wrapper.emitted('at-top')) === null || _a === void 0 ? void 0 : _a[0]).toEqual([{ oldValue: false, newValue: true }]);
        // Simulate leaving view.
        topObserver.trigger(false);
        (0, vitest_1.expect)((_b = wrapper.emitted('at-top')) === null || _b === void 0 ? void 0 : _b[1]).toEqual([{ oldValue: true, newValue: false }]);
    });
    (0, vitest_1.it)('disconnects IntersectionObservers on unmount', () => {
        // Spy on disconnect by using a custom IntersectionObserver.
        const disconnectSpy = vitest_1.vi.fn();
        class IntersectionObserverSpy extends IntersectionObserverMock {
            disconnect() {
                disconnectSpy();
            }
        }
        const originalObserver = globalThis.IntersectionObserver;
        globalThis.IntersectionObserver = IntersectionObserverSpy;
        const wrapper = (0, test_utils_1.mount)(InfiniteScroller_vue_1.default, {
            props: { items: generateItems(25), initialCount: 10, batchSize: 5 },
            slots: {
                default: ({ item }) => `<div class="slot-item">${item.text}</div>`
            },
        });
        wrapper.unmount();
        // Expect both top and bottom observers to call disconnect (2 times in total).
        (0, vitest_1.expect)(disconnectSpy).toHaveBeenCalledTimes(2);
        globalThis.IntersectionObserver = originalObserver;
    });
});
//# sourceMappingURL=InfiniteScroller.spec.js.map