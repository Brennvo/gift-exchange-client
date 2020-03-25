export default async t =>
  new Promise((_, reject) => {
    setTimeout(() => reject("fail"), t);
  });
