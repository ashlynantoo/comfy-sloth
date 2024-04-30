import { Contact, FeaturedProducts, Hero, Services } from "../components";
import { filterFeaturedProducts } from "../features/products/productsSlice";
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
    const { products } = data;
    store.dispatch(filterFeaturedProducts(products));
    return null;
  };
};

const Landing = () => {
  return (
    <main>
      <Hero />
      <FeaturedProducts />
      <Services />
      <Contact />
    </main>
  );
};

export default Landing;
