import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";

const filter_reducer = (state, action) => {
  if (action.type === LOAD_PRODUCTS) {
    let maxPrice = action.payload.map((itm) => itm.price);
    maxPrice = Math.max(...maxPrice);
    let minPrice = action.payload.map((itm) => itm.price);
    minPrice = Math.min(...minPrice);

    return {
      ...state,
      iniAll: [...action.payload],
      filtered: [...action.payload],
      filters: {
        ...state.filters,
        price: maxPrice,
        max: maxPrice,
        min: minPrice,
      },
    };
  }
  if (action.type === SET_LISTVIEW) {
    return { ...state, grid: false };
  }
  if (action.type === SET_GRIDVIEW) {
    return { ...state, grid: true };
  }
  if (action.type === UPDATE_SORT) {
    return { ...state, sort: action.payload };
  }
  if (action.type === SORT_PRODUCTS) {
    const { filtered, sort } = state;
    let tempArray = [...filtered];
    if (sort === "price-lowest") {
      tempArray = filtered.sort((a, b) => a.price - b.price);
    }
    if (sort === "price-highest") {
      tempArray = filtered.sort((a, b) => b.price - a.price);
    }

    if (sort === "name-a") {
      tempArray = filtered.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
    }
    if (sort === "name-z") {
      tempArray = filtered.sort((a, b) => {
        return b.name.localeCompare(a.name);
      });
    }
    return { ...state, filtered: tempArray };
  }
  if (action.type === UPDATE_FILTERS) {
    const { name, value } = action.payload;
    return { ...state, filters: { ...state.filters, [name]: value } };
  }
  if (action.type === FILTER_PRODUCTS) {
    const { iniAll } = state;
    const { text, category, company, colors, price, shipping } = state.filters;
    let tempStore = [...iniAll];
    if (text) {
      tempStore = tempStore.filter((prod) => {
        return prod.name.toLowerCase().includes(text);
      });
    }
    if (category !== "all") {
      tempStore = tempStore.filter((prod) => {
        return prod.category === category;
      });
    }
    if (company.toLowerCase() !== "all") {
      tempStore = tempStore.filter((prod) => {
        return prod.company === company.toLowerCase();
      });
    }
    if (colors !== "all") {
      tempStore = tempStore.filter((prod) => {
        return prod.colors.find((hue) => hue === colors);
      });
    }
    tempStore = tempStore.filter((prod) => prod.price <= price )

    if (shipping) {
      tempStore = tempStore.filter((prod) => {
        return prod.shipping === true;
      });
    }
    return { ...state, filtered: tempStore };
  }
  if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      filters: {
        ...state.filters,
        text: "",
        company: "all",
        category: "all",
        colors: "all",

        price: state.filters.max,
        shipping: false,
      },
    };
  }

  //return state;
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;
