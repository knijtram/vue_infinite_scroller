[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![CI](https://github.com/knijtram/vue_infinite_scroller/actions/workflows/ci.yml/badge.svg)](https://github.com/OWNER/REPO/actions/workflows/ci.yml)

# Vue Infinite Scroller

A simple and efficient Vue 3 component designed for smoothly displaying large lists of items through infinite scrolling.

## Overview

Vue Infinite Scroller provides an intuitive, high-performance solution for handling large data sets by dynamically loading items as users scroll. Ideal for applications requiring optimized rendering of extensive lists such as user lists, product catalogs, location browsers, or log entries.

## Features

- **Efficient rendering:** Loads and renders items incrementally, improving page load times.
- **Easy integration:** Quickly integrates into any Vue 3 project.
- **Customizable:** Configurable options allow flexible control over loading and display behavior.

## Installation

Install via npm:

```bash
npm install @knijtram/vue-infinite-scroller
```

### Prerequisites

- Vue 3

## Usage

For detailed usage examples, please refer to the demo folder in the [repository](#).

Basic implementation:

```vue
<template>
  <InfiniteScroller :items="items" :initialCount="10" :batchSize="10">
    <template #default="{ item }">
      <!-- Custom rendering logic -->
      <div>{{ item }}</div>
    </template>
  </InfiniteScroller>
</template>

<script>
import { ref } from 'vue';
import InfiniteScroller from '@knijtram/vue-infinite-scroller';

export default {
  components: { InfiniteScroller },
  setup() {
    const items = ref([...]); // Your data here
    return { items };
  }
};
</script>
```

## Configuration

The component can be customized with the following props:

| Prop           | Type   | Description                                | Default |
| -------------- | ------ | ------------------------------------------ | ------- |
| `items`        | Array  | List of items to display.                  | `[]`    |
| `initialCount` | Number | Initial number of items displayed on load. | `10`    |
| `batchSize`    | Number | Number of items to load per scroll event.  | `10`    |

## License

This project is licensed under the MIT License.

## Author

Martijn Kuipers

<a href="https://www.buymeacoffee.com/knijtram" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" ></a>
