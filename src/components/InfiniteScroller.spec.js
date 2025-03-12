import { describe, it, expect, beforeAll, afterAll, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import InfiniteScroller from '@/components/InfiniteScroller.vue';
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
beforeAll(() => {
    originalIntersectionObserver = globalThis.IntersectionObserver;
    globalThis.IntersectionObserver = IntersectionObserverMock;
});
afterAll(() => {
    globalThis.IntersectionObserver = originalIntersectionObserver;
});
// Helper to generate items.
const generateItems = (count) => Array.from({ length: count }, (_, i) => ({ id: i, text: `Item ${i}` }));
describe('InfiniteScroller.vue', () => {
    it('initializes displayedItems with initialCount items', () => {
        const items = generateItems(25);
        const wrapper = mount(InfiniteScroller, {
            props: { items, initialCount: 10, batchSize: 5 },
            slots: {
                default: ({ item }) => `<div class="slot-item">${item.text}</div>`
            },
        });
        expect(wrapper.vm.displayedItems.length).toBe(10);
        expect(wrapper.findAll('.item').length).toBe(10);
    });
    it('handles items array smaller than initialCount', () => {
        const smallItems = generateItems(5);
        const wrapper = mount(InfiniteScroller, {
            props: { items: smallItems, initialCount: 10, batchSize: 5 },
            slots: {
                default: ({ item }) => `<div class="slot-item">${item.text}</div>`
            },
        });
        // Should display all available items.
        expect(wrapper.vm.displayedItems.length).toBe(5);
    });
    it('updates displayedItems when items prop changes', async () => {
        const initialItems = generateItems(5);
        const newItems = generateItems(15);
        const wrapper = mount(InfiniteScroller, {
            props: { items: initialItems, initialCount: 10, batchSize: 5 },
            slots: {
                default: ({ item }) => `<div class="slot-item">${item.text}</div>`
            },
        });
        expect(wrapper.vm.displayedItems.length).toBe(5);
        await wrapper.setProps({ items: newItems });
        // After update, displayedItems should be the first 10 of newItems.
        expect(wrapper.vm.displayedItems.length).toBe(10);
    });
    it('loads more items when bottom sentinel intersects', async () => {
        const items = generateItems(25);
        const wrapper = mount(InfiniteScroller, {
            props: { items, initialCount: 10, batchSize: 5 },
            slots: {
                default: ({ item }) => `<div class="slot-item">${item.text}</div>`
            },
        });
        const bottomObserver = wrapper.vm.bottomObserver;
        // First trigger: should load 5 more items.
        bottomObserver.trigger(true);
        expect(wrapper.vm.displayedItems.length).toBe(15);
        // Trigger twice more.
        bottomObserver.trigger(true);
        bottomObserver.trigger(true);
        // Should not exceed total items.
        expect(wrapper.vm.displayedItems.length).toBe(25);
        // Further triggers won't add items.
        bottomObserver.trigger(true);
        expect(wrapper.vm.displayedItems.length).toBe(25);
    });
    it('emits "at-top" event correctly when top sentinel intersects', async () => {
        var _a, _b;
        const items = generateItems(25);
        const wrapper = mount(InfiniteScroller, {
            props: { items, initialCount: 10, batchSize: 5 },
            slots: {
                default: ({ item }) => `<div class="slot-item">${item.text}</div>`
            },
        });
        const topObserver = wrapper.vm.topObserver;
        // Simulate the top sentinel entering view.
        topObserver.trigger(true);
        expect((_a = wrapper.emitted('at-top')) === null || _a === void 0 ? void 0 : _a[0]).toEqual([{ oldValue: false, newValue: true }]);
        // Simulate leaving view.
        topObserver.trigger(false);
        expect((_b = wrapper.emitted('at-top')) === null || _b === void 0 ? void 0 : _b[1]).toEqual([{ oldValue: true, newValue: false }]);
    });
    it('disconnects IntersectionObservers on unmount', () => {
        // Spy on disconnect by using a custom IntersectionObserver.
        const disconnectSpy = vi.fn();
        class IntersectionObserverSpy extends IntersectionObserverMock {
            disconnect() {
                disconnectSpy();
            }
        }
        const originalObserver = globalThis.IntersectionObserver;
        globalThis.IntersectionObserver = IntersectionObserverSpy;
        const wrapper = mount(InfiniteScroller, {
            props: { items: generateItems(25), initialCount: 10, batchSize: 5 },
            slots: {
                default: ({ item }) => `<div class="slot-item">${item.text}</div>`
            },
        });
        wrapper.unmount();
        // Expect both top and bottom observers to call disconnect (2 times in total).
        expect(disconnectSpy).toHaveBeenCalledTimes(2);
        globalThis.IntersectionObserver = originalObserver;
    });
});
//# sourceMappingURL=InfiniteScroller.spec.js.map