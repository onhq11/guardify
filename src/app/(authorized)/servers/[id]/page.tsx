"use client";

import { useContext, useEffect } from "react";
import { HeadingContext } from "@/components/Provider/HeadingProvider";

export default function () {
  const { setTitle } = useContext(HeadingContext);

  useEffect(() => {
    if (setTitle) {
      setTitle("rak");
    }
  }, []);

  return <h1>rak</h1>;
}
