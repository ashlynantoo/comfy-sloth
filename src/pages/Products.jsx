import { useDispatch, useSelector } from "react-redux";
import Wrapper from "../assets/wrappers/Products";
import { Filters, FiltersSmall, Path, ProductsContainer } from "../components";
import {
  setProducts,
  filterProducts,
  sortProducts,
} from "../features/products/productsSlice";
import { customFetch } from "../utils";

const url = "/products";

const productsQuery = {
  queryKey: ["products"],
  queryFn: () => {
    return customFetch(url);
  },
};

export const loader = (queryClient, store) => {
  return async () => {
    const { data } = await queryClient.ensureQueryData(productsQuery);
    const { count, products } = data;
    store.dispatch(setProducts(products));
    store.dispatch(sortProducts("price-lowest"));
    return { count, products };
  };
};

const Products = () => {
  const dispatch = useDispatch();
  const { filters, sort } = useSelector((store) => {
    return store.productsState;
  });
  const { text } = filters;

  return (
    <main>
      <Path title="products" />
      <Wrapper className="section section-center page">
        <div className="products">
          <FiltersSmall />
          <Filters />
          <div className="products-container">
            <form
              className="search-form"
              onSubmit={(event) => {
                event.preventDefault();
              }}
            >
              <input
                type="search"
                className="form-input"
                placeholder="search"
                name="text"
                value={text}
                onChange={(event) => {
                  const { name: filterName, value: filterValue } = event.target;
                  dispatch(filterProducts({ filterName, filterValue }));
                  dispatch(sortProducts(sort));
                }}
              />
            </form>
            <ProductsContainer />
          </div>
        </div>
      </Wrapper>
    </main>
  );
};

export default Products;
