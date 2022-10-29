import { Links } from "./routes";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

const App = () => {
    return (
         // @ts-ignore
        <QueryClientProvider client={queryClient}>
                <Links/>
        </QueryClientProvider>
    )
}

export default App;
