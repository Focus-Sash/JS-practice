export class EventEmitter {
  constructor() {
    this._listeners = new Map();
  }


  // type：イベント名、listener：イベントリスナー
  addEventListener(type, listner) {
    if (!this._listeners.has(type)) {
      this._listeners.set(type, new Set());
    }
    const listenerSet = this._listeners.get(type);
    listenerSet.add(listner);
  }

  // type：イベント名
  emit(type) {
    const listenerSet = this._listeners.get(type);
    if (!listenerSet) {
      return;
    }
    listenerSet.forEach((listener) => {
      listener.call(this);
    });
  }

  removeEventListner(type, listener) {
    const listenerSet = this._listners.get(type);
    if (!listenerSet) {
      return;
    }
    listenerSet.forEach((ownListener) => {
      if (ownListener === listener) {
        listenerSet.delete(listener);
      }
    });
  }
}
