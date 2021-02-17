import React from "react";
import { FooterSmall } from "../components/ui/FooterSmall";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
  Link,
} from "react-router-dom";
import { Dashboard } from "../components/ui/Dashboard";
import { CollaboratorScreen } from "../components/collaborator/CollaboratorScreen";
import { AdministratorScreen } from "../components/administrator/AdministratorScreen";
import { LendScreen } from "../components/lend/LendScreen";
import { LendHistoryScreen } from "../components/lend/LendHistoryScreen";

export const DashboardRoutes = () => {
  return (
    <Router> 
      <nav class="bg-gray-800 pt-2 md:pt-1 pb-1 px-1 mt-0 h-auto fixed w-full z-20 top-0">
      <div class="flex flex-wrap items-center">

      <div class="flex flex-shrink md:w-1/3 justify-center md:justify-start text-white">
                 <a href="#">
                    <span class="text-xl pl-2"><i class="em em-grinning"></i></span>
                </a>
            </div>

            <div class="flex flex-1 md:w-1/3 justify-center md:justify-start text-white px-2">

            </div>

            <div class="flex w-full pt-2 content-center justify-between md:w-1/3 md:justify-end">
            <ul class="list-reset flex justify-between flex-1 md:flex-none items-center">
                    <li class="flex-1 md:flex-none md:mr-3">
                        <a class="inline-block py-2 px-4 text-white no-underline" href="#">Active</a>
                    </li>
                    <li class="flex-1 md:flex-none md:mr-3">
                        <a class="inline-block text-gray-600 no-underline hover:text-gray-200 hover:text-underline py-2 px-4" href="#">link</a>
                    </li>

                    </ul>
            </div>

        </div>
        </nav>
      <div class="flex flex-col md:flex-row">
        <div class="bg-green-900 shadow-xl h-16 fixed bottom-0 mt-12 md:relative md:h-screen z-10 w-full md:w-48">
          <div class="md:mt-12 md:w-48 md:fixed md:left-0 md:top-0 content-center md:content-start text-left justify-between">
            <ul class="list-reset flex flex-row md:flex-col py-0 md:py-3 px-1 md:px-2 text-center md:text-left">
              <li class="mr-3 flex-1">
                <a class="block py-1 md:py-3 pl-0 md:pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-white-800 hover:border-red-500">
                  <Link
                    class="pb-1 md:pb-0 text-xs md:text-base block md:inline-block"
                    to="/menu-principal"
                  >
                    Hacienda El Orosi
                  </Link>
                </a>
              </li>
              <li class="mr-3 flex-1">
              <a class="block py-1 md:py-3 pl-0 md:pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-white-800 hover:border-red-500">
                <Link
                  class="pb-1 md:pb-0 text-xs md:text-base block md:inline-block"
                  to="/listar-administradores"
                >
                  Administradores
                </Link>
                </a>
              </li>
              <li class="mr-3 flex-1">
              <a class="block py-1 md:py-3 pl-0 md:pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-white-800 hover:border-red-500">
                  
                <Link
                  class="pb-1 md:pb-0 text-xs md:text-base block md:inline-block"
                  to="/listar-colaboradores"
                >
                  Colaboradores
                </Link>
                </a>
              </li>
              <li class="mr-3 flex-1">
              <a class="block py-1 md:py-3 pl-0 md:pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-white-800 hover:border-red-500">
                <Link
                  class="pb-1 md:pb-0 text-xs md:text-base block md:inline-block"
                  to="/listar-prestamos"
                >
                  Prestamos
                </Link>
                </a>
              </li>
              <li class="mr-3 flex-1">
              <a class="block py-1 md:py-3 pl-0 md:pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-white-800 hover:border-red-500">
                <Link
                  class="pb-1 md:pb-0 text-xs md:text-base block md:inline-block"
                  to="/prestamo-historial"
                >
                  Historial de Prestamos
                </Link>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <hr />
        <Switch>
          <Route
            exact
            path="/listar-administradores"
            component={AdministratorScreen}
          />
          <Route
            exact
            path="/listar-colaboradores"
            component={CollaboratorScreen}
          />
          <Route exact path="/listar-prestamos" component={LendScreen} />
          <Route
            exact
            path="/prestamo-historial"
            component={LendHistoryScreen}
          />

          <Redirect to="/menu-principal" />
        </Switch>
      </div>

      <FooterSmall />
    </Router>
  );
};
