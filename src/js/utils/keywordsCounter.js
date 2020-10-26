/* eslint-disable no-param-reassign */
export default function keywordsCounter(api) {
  const keyList = document.querySelector('.results__key-list');

  api.getArticles()
    .then((res) => {
      const array = res.data.map((item) => item.keyword);
      const objectKeywords = array.reduce((count, key) => {
        count[key] = 1 + count[key] || 1;
        return count;
      }, {});

      if (Object.keys(objectKeywords).length <= 2) {
        keyList.textContent = (Object.keys(objectKeywords).join(', '));
      }
      if (Object.keys(objectKeywords).length > 2) {
        keyList.textContent = `${Object.keys(objectKeywords)[0]}, ${Object.keys(objectKeywords)[1]} и ${Object.keys(objectKeywords).length - 2} другим`;
      }
    })
    .catch((err) => Promise.reject(new Error(err.message)));
}
