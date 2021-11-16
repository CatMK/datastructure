export class Stack {
    private items: any[] = new Array();

    push(value: any) {
      this.items.push(value);
    };

    pop() {
      return this.items.pop();
    };

    peek() {
      return this.items[this.items.length - 1];
    };

    isEmpty() {
      return this.items.length === 0;
    };

    clear() {
      return this.items = [];
    };

    size() {
      return this.items.length;
    }
  }