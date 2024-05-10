import { ReactNode } from "react";
import Link from "next/link";
import Flex from "@/components/Layout/Flex";
import NavButton from "@/components/Layout/Menu/Route/NavButton";
import { Route as RouteType } from "@/utils/route";

interface Props {
  route: RouteType | undefined;
  icon: ReactNode;
  label?: string;
}

export default function Route({ route, icon, label }: Props) {
  if (!route) {
    return <></>;
  }

  return (
    <Link href={route.href} passHref>
      <NavButton href={route.href}>
        <Flex alignCenter sx={{ gap: 1.5, width: "100%", ml: 1, fontSize: 15 }}>
          {icon}
          <span>{label || route.label}</span>
        </Flex>
      </NavButton>
    </Link>
  );
}
