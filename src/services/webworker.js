
export class WebworkerService {

  constructor() {
    this.workerToUrl = new WeakMap();
    this.promiseToWorker = new WeakMap();
  }

  run(workerFunction) {
    const url = this.getOrCreateWorkerUrl(workerFunction);
    return this.runUrl(url, data);
  }

  runUrl(url, data) {
    const worker = new Worker(url);
    const promise = this.createPromiseForWorker(worker, data);
    const promiseCleaner = this.createPromiseCleaner(promise);

    this.promiseToWorker.set(promise, worker);

    promise
      .then(promiseCleaner)
      .catch(promiseCleaner);

    return promise;
  }

  createPromiseForWorker(worker, data) {
    return new Promise((resolve, reject) => {
        worker.addEventListener('message', (event) => resolve(event.data));
        worker.addEventListener('error', reject);
        worker.postMessage(data);
      });
  }

  getOrCreateWorkerUrl(fn) {
    if(!this.workerToUrl.has(fn)) {
      const url = this.createWorkerUrl(fn);
      this.workerToUrl.set(fn, url);
      return url;
    }
    return this.workerToUrl.get(fn);
  }

  createWorkerUrl(resolve) {
    const resolveString = resolve.toString();
    const webWorkerTemplate = `
            self.addEventListener('message', function(e) {
                postMessage((${resolveString})(e.data));
            });
        `;
    const blob = new Blob([webWorkerTemplate], { type: 'text/javascript' });
    return URL.createObjectURL(blob);
  }

  createPromiseCleaner(promise) {
    return (event) => {
      this.removePromise(promise);
      return event;
    };
  }

  removePromise() {
    const worker = this.promiseToWorker.get(promise);
    if(worker) {
      worker.terminate();
    }
    this.promiseToWorker.delete(promise);
    return promise;
  }

  terminate(promise) {
    return this.removePromise(promise);
  }
}