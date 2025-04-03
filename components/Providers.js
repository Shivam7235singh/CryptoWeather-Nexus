"use client"; // Ensures it's a Client Component

import { Provider } from "react-redux";
import store from "@/store/store.js";

export default function Providers({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
