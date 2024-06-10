import Menu from "@/components/Layout/Menu/Menu";
import Flex from "@/components/Layout/Flex";
import Route from "@/components/Layout/Menu/Route/Route";
import { RxDashboard } from "react-icons/rx";
import { GrDashboard } from "react-icons/gr";
import Topbar from "@/components/Layout/Topbar/Topbar";
import { CiServer } from "react-icons/ci";
import { routes } from "@/config/routes/routes";
import { protectedRoutes } from "@/config/routes/protectedRoutes";

export default function AuthorizedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Flex>
      <Menu>
        <Route route={protectedRoutes.panel} icon={<GrDashboard />} />
        <Route route={protectedRoutes.servers} icon={<CiServer />} />
        <Route route={routes.index} icon={<RxDashboard />} />
      </Menu>
      <Flex column sx={{ flex: 1, height: "100vh" }}>
        <Topbar />
        <Flex column sx={{ mx: 4, flex: 1, mb: 4, mt: 6, overflowX: "auto" }}>
          {children}
        </Flex>
      </Flex>
    </Flex>
  );
}
