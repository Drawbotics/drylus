export function addDocumentReady() {
  document._ready = (callback) => {
    document.addEventListener('DOMContentLoaded', (event) => {
      callback();
    });
  };
}
