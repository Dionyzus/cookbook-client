import { RouteProps } from "./route";
import Layout from "../layout/layout";
import Home from "../page/home";
import About from "../page/about";
import RecipeCollection from "../page/recipe/recipeCollection";
import RecipeDetails from "../page/recipe/recipeDetails";
import RecipeEdit from "../page/recipe/recipeEdit";
import RecipeAdd from "../page/recipe/recipeAdd";

export const routes: Array<RouteProps> = [
  {
    exact: true,
    path: "/",
    Component: Home,
    Layout: Layout,
  },
  {
    exact: true,
    path: "/about",
    Component: About,
    Layout: Layout,
  },
  {
    exact: true,
    path: "/recipes",
    Component: RecipeCollection,
    Layout: Layout,
  },
  {
    exact: true,
    path: "/recipes/new",
    Component: RecipeAdd,
    Layout: Layout,
  },
  {
    exact: true,
    path: "/recipes/view/:index",
    Component: RecipeDetails,
    Layout: Layout,
  },
  {
    exact: true,
    path: "/recipes/edit/:index",
    Component: RecipeEdit,
    Layout: Layout,
  },
];