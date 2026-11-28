import type { MediaItem } from '#lib/types/media.ts';

function isSameItem(a: MediaItem, b: MediaItem) {
  return a.id === b.id && a.type === b.type;
}

class MyList {
  items = $state<MediaItem[]>([]);

  has(item: MediaItem) {
    return this.items.some((listItem) => isSameItem(listItem, item));
  }

  add(item: MediaItem) {
    if (this.has(item)) return;
    this.items.push(item);
  }

  remove(item: MediaItem) {
    this.items = this.items.filter((listItem) => !isSameItem(listItem, item));
  }
}

export const myList = new MyList();
