let newStore;
const paginate = (data, perPage) => {
  
  const pages = Math.ceil(data.length / perPage);
  const newStore = Array.from({ length: pages }, (_, index) => {
    const start = index * perPage;
    return data.slice(start, start + perPage);
  });
  return newStore;
};

export default paginate;
