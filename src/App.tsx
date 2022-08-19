import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { RecoilRoot } from "recoil";
import { PathName, MyRouter } from "./Router";
import { ConfigProvider } from "antd";
import zhCN from "antd/lib/locale/zh_CN";
import "moment/dist/locale/zh-cn";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      // suspense: true,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <BrowserRouter basename={PathName.BASE}>
          <ConfigProvider locale={zhCN}>
            <MyRouter />
          </ConfigProvider>
        </BrowserRouter>
      </RecoilRoot>
    </QueryClientProvider>
  );
}

export default App;
