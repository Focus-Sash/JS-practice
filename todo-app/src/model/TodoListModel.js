import { EventEmitter } from "../EventEmitter.js";

let todoIdx = 0;

export class TodoListModel extends EventEmitter {
  // title：Todoアイテムのタイトル
  // completed：Todoアイテムが完了済みならばtrue、そうでない場合はfalse

  constructor(items = []) {
    super();
    this.items = items;
  }

  getTotalCount() {
    return this.items.length;
  }

  getTodoItems() {
    return this.items;
  }

  onChange(listener) {
    this.addEventListener("change", listener);
  }

  emitChange() {
    this.emit("change");
  }

  addTodo(todoItem) {
    this.items.push(todoItem);
    this.emitChange();
  }
}