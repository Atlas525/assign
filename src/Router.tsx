import { FC, ReactNode, useMemo } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import { NotFound, SignIn, Landing } from "./pages";
import { MenuOverviewIcon, MenuBorrowIcon } from "@/assets";
import { AnimatePresence, motion } from "framer-motion";

export enum PathName {
  BASE = "assign",
  DASHBOARD = "dashboard",
  BORROW = "borrow",
  BORROW_INDEX = "index",
  BORROW_REVIEW = "review",
}

interface IMenu {
  key: string;
  name: string;
  path: string;
  // TODO fullPath 需要去掉option
  fullPath: string;
  index?: boolean;
  element?: ReactNode;
  children?: IMenu[];
  icon?: ReactNode;
}

const joinParentPath = (menu: IMenu, parent?: IMenu) => {
  return {
    ...menu,
    fullPath: parent ? [parent.fullPath, menu.path].join("/") : `/${menu.path}`,
  };
};

const joinParentPathRec = (menu: IMenu, parent?: IMenu): IMenu => {
  const p = joinParentPath(menu, parent);
  const children = p.children;
  return {
    ...p,
    children: children?.map((childMenu) => joinParentPathRec(childMenu, p)),
  };
};

const fullPathGenerate = (menus: unknown): IMenu[] =>
  (menus as IMenu[]).map((m) => joinParentPathRec(m));

export const MENUS: IMenu[] = fullPathGenerate([
  {
    key: PathName.DASHBOARD,
    name: "总览",
    path: PathName.DASHBOARD,
    icon: <MenuOverviewIcon />,
    element: <NotFound />,
  },
  {
    key: PathName.BORROW,
    name: "借阅管理",
    path: PathName.BORROW,
    icon: <MenuBorrowIcon />,
    children: [
      {
        key: PathName.BORROW_INDEX,
        name: "我要借阅",
        index: true,
        element: <NotFound />,
      },
      {
        key: PathName.BORROW_REVIEW,
        name: "借阅待审核",
        path: PathName.BORROW_REVIEW,
        element: <NotFound />,
      },
    ],
  },
]);

const resolveMenusToPath = (menus: IMenu[]): string => {
  const index = menus.findIndex((m) => m.index);
  const fixedIndex = index === -1 ? 0 : index;
  return resolveMenuToPath(menus[fixedIndex]);
};

export const resolveMenuToPath = (menu: IMenu): string => {
  if (menu.element) {
    return menu.fullPath;
  }
  if (menu.children && menu.children.length > 0) {
    return resolveMenusToPath(menu.children);
  }
  return PathName.BASE;
};

export const MyRouter: FC = () => {
  return (
    <Routes>
      {/* redirect */}
      <Route path="/" element={<Landing />}></Route>
      <Route element={<Layout />}>
        {MENUS.map((f) => (
          <Route element={f.element} key={f.key} path={f.path}>
            {f.children?.map((s) => (
              <Route
                index={s.index}
                path={s.path}
                key={s.key}
                element={
                  <AnimatePresence exitBeforeEnter>
                    <motion.div
                      key={s.key}
                      animate={{ opacity: 1, y: 0 }}
                      initial={{ opacity: 0, y: 20 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.2 }}
                    >
                      {s.element}
                    </motion.div>
                  </AnimatePresence>
                }
              />
            ))}
          </Route>
        ))}
      </Route>
    </Routes>
  );
};

export default MyRouter;
