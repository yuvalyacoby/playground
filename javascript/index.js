const arr = Array.from(Array(50).keys());

const pagination = {
  limit: 5,
  offset: 0
}

const getFromArray = (s, e) => {
  return {
    results: arr.slice(s, e),
    hasNext: e < arr.length
  }
}

const main = () => {
  const res = [];
  let hasNext = false;
  do {
    const { results, hasNext: _hasNext } = getFromArray(pagination.offset, pagination.offset + pagination.limit);
    res.push(...results);
    hasNext = _hasNext;
    pagination.offset += pagination.limit;
  } while (hasNext);

  console.log(res);
}

main();