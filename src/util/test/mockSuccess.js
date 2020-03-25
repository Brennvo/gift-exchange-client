export default async t =>
  new Promise((resolve, _) => {
    setTimeout(() => resolve("fail"), t);
  });
