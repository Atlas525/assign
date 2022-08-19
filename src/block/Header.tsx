import { FC, useMemo } from "react";
import { Divider, Space } from "antd";
import { useLocation, NavLink } from "react-router-dom";
import { LayoutGroup, motion } from "framer-motion";
import { MENUS } from "../Router";
import LogoUrl from "../assets/sinosteel-logo.png";

const Header: FC = () => {
  const pathname = useLocation().pathname;
  const firstMenuPath = pathname.split("/").filter((p) => p)[0];
  const filter = MENUS.flat(Infinity).filter(
    (M) => M.path === firstMenuPath
  )?.[0];
  const secondMenus = useMemo(() => filter.children, [filter]);

  return (
    <div className="flex bg-white p-0 h-[62px] leading-[62px]">
      <div className="logo">
        <img src={LogoUrl} className="w-[64px] h-[60px] inline-block" />
      </div>
      <h1 className="text-[20px] text-[#001330] text-opacity-80 m-0 ml-[16px] mr-[30px]">
        中钢设备有限公司
      </h1>
      <LayoutGroup>
        <div className="flex text-[20px] gap-x-10">
          {secondMenus?.map((s) => (
            <NavLink key={s.key} to={s.fullPath} className="mx-2.5">
              {({ isActive }) => (
                <Item key={s.key} text={s.name} active={isActive} />
              )}
            </NavLink>
          ))}
        </div>
      </LayoutGroup>

      <div className="ml-auto mr-[20px] text-[#7F8997] text-[16px]">
        <Space split={<Divider type="vertical" />}>
          <div>zxczxc</div>
          <div className="rounded-full">zxcxz</div>
        </Space>
      </div>
    </div>
  );
};

interface ItemProps {
  active: boolean;
  text: string;
}
const Item: FC<ItemProps> = ({ active, text }) => {
  const className = active
    ? "text-[#3E4155] relative"
    : "text-[#7F8997] text-opacity-80 relative";
  const underline = active ? (
    <motion.div
      className="absolute h-[3px] bg-blue-500 bottom-[-1px] left-0 right-0"
      layoutId="underline"
    />
  ) : null;

  return (
    <div className={className}>
      {text}
      {underline}
    </div>
  );
};

export default Header;
