import { routes } from './routeInfo.js';
import NotFound from './notFound.js';

function Router($container) {
  this.$container = $container;
  let currentPage = undefined;

  const findMatchedRoute = () =>
    routes.find((route) => route.path.test(location.pathname));

  const route = () => {
    currentPage = null;
    const TargetPage = findMatchedRoute()?.element || NotFound;
    currentPage = new TargetPage(this.$container);
  };

  const init = () => {
    // Handle URL changes without reloading the page
    window.addEventListener('popstate', () => {
      route();
    });

    // Handle initial URL and subsequent URL changes
    handleURLChange();

    // Listen for custom "historychange" event to update the URL
    window.addEventListener('historychange', ({ detail }) => {
      const { to, isReplace } = detail;

      if (isReplace || to === location.pathname) {
        history.replaceState(null, '', to);
      } else {
        history.pushState(null, '', to);
      }

      route();
    });
  };

  // Function to handle URL changes
  const handleURLChange = () => {
    const newURL = window.location.pathname;
    const isReplace = window.location.search.includes('replace=true');

    if (isReplace || newURL === location.pathname) {
      history.replaceState(null, '', newURL);
    } else {
      history.pushState(null, '', newURL);
    }

    route();
  };

  init();
  route();
}

export default Router;
