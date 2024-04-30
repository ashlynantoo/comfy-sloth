import { GiCompass, GiDiamondHard, GiStabbedNote } from "react-icons/gi";
import axios from "axios";

const baseUrl = "http://localhost:3000/api/v1";

export const customFetch = axios.create({
  baseURL: baseUrl,
});

export const navLinks = [
  { id: 1, url: "/", text: "home" },
  { id: 2, url: "/about", text: "about" },
  { id: 3, url: "/products", text: "products" },
  { id: 4, url: "/checkout", text: "checkout" },
];

export const services = [
  {
    id: 1,
    icon: <GiCompass />,
    title: "mission",
    text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates, ea. Perferendis corrupti reiciendis nesciunt rerum velit autem unde numquam nisi",
  },
  {
    id: 2,
    icon: <GiDiamondHard />,
    title: "vision",
    text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates, ea. Perferendis corrupti reiciendis nesciunt rerum velit autem unde numquam nisi",
  },
  {
    id: 3,
    icon: <GiStabbedNote />,
    title: "history",
    text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates, ea. Perferendis corrupti reiciendis nesciunt rerum velit autem unde numquam nisi",
  },
];

export const formatPrice = (price) => {
  const dollarPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format((price / 100).toFixed(2));
  return dollarPrice;
};

export const getUniqueValues = (array, attribute) => {
  let values = array.map((arrayItem) => {
    return arrayItem[attribute];
  });
  if (attribute === "colors") {
    values = values.flat();
  }
  const uniqueValues = ["all", ...new Set(values)];
  return uniqueValues;
};
