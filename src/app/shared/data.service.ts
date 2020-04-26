export class DataService {
  getDetails() {
    return new Promise<string>(resolve => {
      setTimeout(() => {
        resolve('Data');
      }, 1500);
    });
  }
}
