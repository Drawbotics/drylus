export function addDocumentReady() {
  document._ready = (callback) => {
    if (document.readyState === 'complete') {
      callback();
    } else {
      document.addEventListener('readystatechange', (event) => {
        callback();
      });
    }
  };
}
