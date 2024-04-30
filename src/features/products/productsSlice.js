import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allProducts: [],
  filteredProducts: [],
  featuredProducts: [],
  singleProduct: {},
  gridView: true,
  sort: "price-lowest",
  filters: {
    text: "",
    company: "all",
    category: "all",
    color: "all",
    minPrice: 0,
    maxPrice: 0,
    price: 0,
    freeShipping: false,
  },
  isFiltersModalOpen: false,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setGridView: (state) => {
      state.gridView = true;
    },
    setListView: (state) => {
      state.gridView = false;
    },
    openFiltersModal: (state) => {
      state.isFiltersModalOpen = true;
    },
    closeFiltersModal: (state) => {
      state.isFiltersModalOpen = false;
    },
    filterFeaturedProducts: (state, action) => {
      const products = action.payload;
      const featuredProducts = products
        .filter((product) => {
          return product.featured === true;
        })
        .slice(0, 3);
      state.featuredProducts = featuredProducts;
    },
    setProducts: (state, action) => {
      const products = action.payload;
      const priceList = products.map((product) => {
        return product.price;
      });
      const maxPrice = Math.max(...priceList);
      state.allProducts = products;
      state.filteredProducts = products;
      state.filters.price = maxPrice;
      state.filters.maxPrice = maxPrice;
    },
    sortProducts: (state, action) => {
      const sort = action.payload;
      state.sort = sort;

      let products = [];

      if (sort === "price-lowest") {
        products = state.filteredProducts.sort((a, b) => {
          return a.price - b.price;
        });
      } else if (sort === "price-highest") {
        products = state.filteredProducts.sort((a, b) => {
          return b.price - a.price;
        });
      } else if (sort === "name-a") {
        products = state.filteredProducts.sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
      } else if (sort === "name-z") {
        products = state.filteredProducts.sort((a, b) => {
          return b.name.localeCompare(a.name);
        });
      }
      state.filteredProducts = products;
    },
    filterProducts: (state, action) => {
      if (action.payload) {
        const { filterName, filterValue } = action.payload;
        state.filters[filterName] = filterValue;
      }

      let products = state.allProducts;
      const { text, category, company, color, price, freeShipping } =
        state.filters;

      if (text !== "") {
        products = products.filter((product) => {
          return product.name.includes(text);
        });
      }

      if (category !== "all") {
        products = products.filter((product) => {
          return product.category === category;
        });
      }

      if (company !== "all") {
        products = products.filter((product) => {
          return product.company === company;
        });
      }

      if (color !== "all") {
        products = products.filter((product) => {
          return product.colors.find((eachColor) => {
            return eachColor === color;
          });
        });
      }

      if (freeShipping) {
        products = products.filter((product) => {
          return product.freeShipping === true;
        });
      }

      products = products.filter((product) => {
        return product.price <= price;
      });

      state.filteredProducts = products;
    },
    clearFilters: (state) => {
      state.filters = {
        ...state.filters,
        company: "all",
        category: "all",
        color: "all",
        price: state.filters.maxPrice,
        freeShipping: false,
      };
    },
  },
});

export default productsSlice.reducer;
export const {
  setGridView,
  setListView,
  openFiltersModal,
  closeFiltersModal,
  filterFeaturedProducts,
  setProducts,
  sortProducts,
  filterProducts,
  clearFilters,
} = productsSlice.actions;
