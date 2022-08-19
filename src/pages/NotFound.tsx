import { Result, Typography } from "antd";
import { FC } from "react";
import { Link } from "react-router-dom";
import { PathName } from "../Router";

const NotFound: FC = () => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="抱歉，您访问的页面不存在"
      extra={
        <Link to={PathName.BASE}>
          <Typography.Link>返回首页</Typography.Link>
        </Link>
      }
    />
  );
};

export default NotFound;
