"use client";

import { useContext, useEffect } from "react";
import { HeadingContext } from "@/components/Provider/HeadingProvider";
import { InstancesAPI } from "@/api/Instances";
import { useParams } from "next/navigation";

export default async function () {
  const { id } = useParams();
  const data = await InstancesAPI.READ.readInstance(1);
  const { setTitle } = useContext(HeadingContext);

  useEffect(() => {
    console.log(data);
    if (setTitle) {
      setTitle(data.name);
    }
  }, []);

  return <h1>rak</h1>;
}
