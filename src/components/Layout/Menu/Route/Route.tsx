import { ReactNode } from "react";
import Link from "next/link";
import Flex from "@/components/Layout/Flex";
import NavButton from "@/components/Layout/Menu/Route/NavButton";
import { Route as RouteType } from "@/utils/route";
import { SxProps } from "@mui/system";

interface Props {
  route: RouteType | undefined;
  icon: ReactNode;
  label?: string;
  sx?: SxProps;
}

export default function Route({ route, icon, label, sx }: Props) {
  if (!route) {
    return <></>;
  }

  const href = route.href;
  return (
    <Link href={href} passHref>
      <NavButton href={href} sx={sx}>
        <Flex alignCenter sx={{ gap: 1.5, width: "100%", ml: 1, fontSize: 15 }}>
          {icon}
          <span>{label || route.label}</span>
        </Flex>
      </NavButton>
    </Link>
  );
}
