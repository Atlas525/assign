import { FC, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MENUS, resolveMenuToPath } from "@/Router";
import { Input, Button } from "antd";

const Page: FC = () => {
  const [username, setUsername] = useState<string>("");
  const navigateTo = useNavigate();

  const onSignIn = async () => {};

  return (
    <div className="h-full w-full flex justify-center items-center">
      <div className="w-[240px] flex gap-3">
        <Input onBlur={(e) => setUsername(e.target.value)} />
        <Button onClick={onSignIn}>登录</Button>
      </div>
    </div>
  );
};

export default Page;
