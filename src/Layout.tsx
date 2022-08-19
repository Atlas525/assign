import { FC } from "react";
import { Layout as AntdLayout } from "antd";
import { Header, Menu } from "./block";
import { Outlet } from "react-router-dom";

const { Content } = AntdLayout;

const Layout: FC = () => {
  return (
    <AntdLayout className="h-screen">
      <Header />
      <AntdLayout>
        <Menu />
        <AntdLayout className="h-full w-full overflow-auto">
          <div className="h-full w-full overflow-auto">
            <Content className="m-0 h-full p-[12px]">
              <Outlet />
            </Content>
          </div>
        </AntdLayout>
      </AntdLayout>
    </AntdLayout>
  );
};

export default Layout;
