import { Route, Switch } from "react-router";
import Home from "./pages/Home";
import Bangladesh from "./pages/Bangladesh";
import International from "./pages/International";
import Sports from "./pages/Sports";
import Opinion from "./pages/Opinion";
import Business from "./pages/Business";
import Youth from "./pages/Youth";
import Entertainment from "./pages/Entertainment";
import Lifestyle from "./pages/Lifestyle";
import Dashboard from "./pages/Dashboard";
import DetailNews from "./pages/DetailNews";

const NotFound = () => <h2 className="text-center text-red-700">Page not found</h2>;

export const AppRouter = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/details/:id" component={DetailNews} />
    <Route path="/Bangladesh" component={Bangladesh} />
    <Route path="/International" component={International} />
    <Route path="/Sports" component={Sports} />
    <Route path="/Opinion" component={Opinion} />
    <Route path="/Business" component={Business} />
    <Route path="/Youth" component={Youth} />
    <Route path="/Entertainment" component={Entertainment} />
    <Route path="/Lifestyle" component={Lifestyle} />
    <Route path="/dashboard" component={Dashboard} />
    <Route component={NotFound} />
  </Switch>
);
