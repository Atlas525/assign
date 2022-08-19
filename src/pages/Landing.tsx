import { FC, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { MENUS, resolveMenuToPath } from "@/Router";
import { Spin } from "antd";

const Page: FC = () => {
  const navigate = useNavigate();

  const user = useMemo(() => [], []);

  useEffect(() => {
    if (user) {
      navigate(resolveMenuToPath(MENUS[0]));
    }
  }, [user]);

  const body = useMemo(() => {
    if (!user) {
      return <Spin />;
    }
  }, [user]);

  return (
    <div className="h-full w-full flex justify-center items-center">{body}</div>
  );
};

export default Page;
