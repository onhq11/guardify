import Menu from "@/components/Layout/Menu/Menu";
import Label from "@/components/Layout/Menu/Label";
import Flex from "@/components/Layout/Flex";
import Route from "@/components/Layout/Menu/Route/Route";
import { routes } from "@/config/routes";
import { RxDashboard } from "react-icons/rx";
import { GrDashboard } from "react-icons/gr";
import Topbar from "@/components/Layout/Topbar/Topbar";
import { CiServer } from "react-icons/ci";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Flex>
      <Menu>
        <Label>Dashboard</Label>
        <Route route={routes.panel} icon={<GrDashboard />} />
        <Route route={routes.servers} icon={<CiServer />} />
        <Route route={routes.index} icon={<RxDashboard />} />
        <Route route={routes.index} icon={<RxDashboard />} />
        <Route route={routes.index} icon={<RxDashboard />} />
        <Route route={routes.index} icon={<RxDashboard />} />
        <Route route={routes.index} icon={<RxDashboard />} />
        <Route route={routes.index} icon={<RxDashboard />} />

        <Label>Dashboard</Label>
        <Route route={routes.panel} icon={<GrDashboard />} />
        <Route route={routes.index} icon={<RxDashboard />} />
        <Route route={routes.index} icon={<RxDashboard />} />
      </Menu>
      <Flex column sx={{ flex: 1, height: "100vh" }}>
        <Topbar />
        <Flex column sx={{ mx: 4, flex: 1, mb: 4, mt: 6 }}>
          {children}
        </Flex>
      </Flex>
    </Flex>
  );
}
