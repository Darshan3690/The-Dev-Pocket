import '@testing-library/jest-dom';

// Polyfill global Request for Next's Request/Response helpers when running in Node
if (typeof (global as any).Request === 'undefined') {
  // Minimal, lightweight Request polyfill sufficient for tests that only need
  // to construct Request-like objects. This avoids adding native deps like
  // undici and keeps tests fast and hermetic.
  (global as any).Request = class Request {
    url: string;
    method: string;
    headers: Record<string, string>;
    constructor(input: any, init: any = {}) {
      this.url = typeof input === 'string' ? input : input?.url || '';
      this.method = init.method || 'GET';
      const rawHeaders = init.headers || {};
      // simple Headers-like object with `get` to satisfy Next's helpers
      this.headers = {
        get: (name: string) => {
          const key = Object.keys(rawHeaders).find(k => k.toLowerCase() === name.toLowerCase());
          if (!key) return null;
          return rawHeaders[key];
        },
      };
      this._body = init?.body;
    }
    async json() {
      if (typeof this._body === 'string') return JSON.parse(this._body);
      return this._body;
    }
    async text() {
      if (typeof this._body === 'string') return this._body;
      return JSON.stringify(this._body);
    }
    clone() {
      return new (global as any).Request(this.url, { method: this.method, headers: this.headers, body: this._body });
    }
  };

  // Minimal Response polyfill
  (global as any).Response = class Response {
    status: number;
    headers: Record<string, string>;
    body: any;
    constructor(body: any = null, init: any = {}) {
      this.body = body;
      this.status = init.status || 200;
      const rawHeaders = init.headers || {};
      if (rawHeaders && typeof rawHeaders.get === 'function') {
        // Already a Headers-like object
        this.headers = rawHeaders;
      } else {
        this.headers = {
          get: (name: string) => {
            const key = Object.keys(rawHeaders).find(k => k.toLowerCase() === name.toLowerCase());
            if (!key) return null;
            return rawHeaders[key];
          },
        };
      }
    }
    static json(body: any, init: any = {}) {
      return new (global as any).Response(body, { status: init.status || 200, headers: init.headers || {} });
    }
    async json() {
      if (typeof this.body === 'string') return JSON.parse(this.body);
      return this.body;
    }
    async text() {
      if (typeof this.body === 'string') return this.body;
      return JSON.stringify(this.body);
    }
    clone() {
      return new (global as any).Response(this.body, { status: this.status, headers: this.headers });
    }
  };
}
