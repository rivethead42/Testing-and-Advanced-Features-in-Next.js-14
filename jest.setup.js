import '@testing-library/jest-dom';

// Mock fetch
global.fetch = jest.fn();

global.Blob = class Blob {
  constructor(content, options = {}) {
    this._content = content;
    this.type = options.type || '';
    this.name = '';
  }
  arrayBuffer() {
    return Promise.resolve(Buffer.from(this._content));
  }
};

global.FormData = class FormData {
  constructor() {
    this.data = new Map();
  }
  append(key, value, filename) {
    this.data.set(key, { value, filename });
  }
  get(key) {
    return this.data.get(key)?.value;
  }
};