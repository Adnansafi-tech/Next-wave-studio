"use client";

import { store } from "@/features/Store";
import { Provider } from "react-redux";
import dynamic from "next/dynamic";

const NoSSRReduxProvider = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default dynamic(() => Promise.resolve(NoSSRReduxProvider), {
  ssr: false,
});
