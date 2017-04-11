export default function test() {
  return new Promise((resolve) => {
    resolve({
      message: 'test message',
      time: Date.now()
    });
  });
}
