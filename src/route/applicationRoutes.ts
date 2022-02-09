import { RouteProps } from "./route";
import Layout from "../layout/layout";
import RecipeCollection from "../page/recipe/recipeCollection";
import RecipeView from "../page/recipe/recipeView";
import RecipeEdit from "../page/recipe/recipeEdit";
import RecipeAdd from "../page/recipe/recipeAdd";
import Home from "../page/recipe/home/home";

export const routes: Array<RouteProps> = [
  {
    exact: true,
    path: "/",
    Component: Home,
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
    Component: RecipeView,
    Layout: Layout,
  },
  {
    exact: true,
    path: "/recipes/edit/:index",
    Component: RecipeEdit,
    Layout: Layout,
  },
];