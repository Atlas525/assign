import { FC, ReactNode, useMemo } from "react";
import { Layout } from "antd";
import { LayoutGroup, motion } from "framer-motion";
import { useLocation, NavLink } from "react-router-dom";
import { MENUS, resolveMenuToPath } from "../Router";

const { Sider } = Layout;

const Menu: FC = () => {
  const pathname = useLocation().pathname;
  const firstMunePath = pathname.split("/").filter((p) => p)[0];
  // TODO need to refactor by react-router hook
  const activeKey = MENUS.filter((m) => m.path === firstMunePath).map(
    (i) => i.path
  )[0];

  return (
    <Sider width={96} className="bg-[#294B66] h-full text-white">
      <LayoutGroup id="left-menu">
        <div className="flex flex-col gap-y-6 mt-[20px]">
          {MENUS.map((m) => (
            <NavLink key={m.key} to={resolveMenuToPath(m)}>
              {({ isActive }) => (
                <Item
                  text={m.name}
                  active={isActive || m.path === activeKey}
                  icon={m.icon}
                />
              )}
            </NavLink>
          ))}
        </div>
      </LayoutGroup>
    </Sider>
  );
};

interface ItemProps {
  icon?: ReactNode;
  text: string;
  active: boolean;
}

const Item: FC<ItemProps> = ({ text, icon, active }) => {
  const className =
    "flex flex-col text-[14px] h-[90px] justify-center items-center relative";
  const activeBg = active ? (
    <motion.div
      className="border-l-[4px] border-white bg-[#1B70B9] w-full h-full absolute"
      layoutId="active"
    />
  ) : null;
  const remindClassName = "absolute right-3 top-1.5";
  return (
    <div className={className}>
      {activeBg}
      <div className="z-10">{icon}</div>
      <div className="z-10">{text}</div>
    </div>
  );
};

export default Menu;
