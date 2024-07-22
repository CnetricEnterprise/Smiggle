/* eslint complexity: off */

import { history as historyRouter } from 'instantsearch.js/es/lib/routers';

const routeStateDefaultValues = {
  query: '',
  page: '1',
  brands: undefined,
  category: '',
  rating: '',
  price: '',
  free_shipping: 'false',
  sortBy: 'instant_search',
  hitsPerPage: '20',
};

const encodedCategories = {
  Cameras: 'Cameras & Camcorders',
  Cars: 'Car Electronics & GPS',
  Phones: 'Cell Phones',
  TV: 'TV & Home Theater',
};

const decodedCategories = Object.keys(encodedCategories).reduce((acc, key) => {
  const newKey = encodedCategories[key];
  const newValue = key;

  return {
    ...acc,
    [newKey]: newValue,
  };
}, {});

function getCategorySlug(name) {
  const encodedName =
    decodedCategories[name] || name;

  return encodedName.split(' ').map(encodeURIComponent).join('+');
}

function getCategoryName(slug) {
  const decodedSlug =
    encodedCategories[slug] || slug;

  return decodeURIComponent(decodedSlug.replace(/\+/g, ' '));
}

const originalWindowTitle = document.title;

const router = historyRouter({
  cleanUrlOnDispose: false,
  windowTitle({ category, query }) {
    const queryTitle = query ? `Results for "${query}"` : '';

    return [queryTitle, category, originalWindowTitle]
      .filter(Boolean)
      .join(' | ');
  },

  createURL({ qsModule, routeState, location }) {
    const { protocol, hostname, port = '', pathname, hash } = location;
    const portWithPrefix = port === '' ? '' : `:${port}`;
    const urlParts = location.href.match(/^(.*?)\/search/);
    const baseUrl =
      (urlParts && urlParts[0]) ||
      `${protocol}//${hostname}${portWithPrefix}${pathname}search`;

    const categoryPath = routeState.category
      ? `${getCategorySlug(routeState.category)}`
      : '';
    const queryParameters = {};

    if (
      routeState.query &&
      routeState.query !== routeStateDefaultValues.query
    ) {
      queryParameters.query = encodeURIComponent(routeState.query);
    }
    if (routeState.page && routeState.page !== routeStateDefaultValues.page) {
      queryParameters.page = routeState.page;
    }
    if (
      routeState.brands &&
      routeState.brands !== routeStateDefaultValues.brands
    ) {
      queryParameters.brands = routeState.brands.map(encodeURIComponent);
    }
    if (
      routeState.rating &&
      routeState.rating !== routeStateDefaultValues.rating
    ) {
      queryParameters.rating = routeState.rating;
    }
    if (
      routeState.price &&
      routeState.price !== routeStateDefaultValues.price
    ) {
      queryParameters.price = routeState.price;
    }
    if (
      routeState.free_shipping &&
      routeState.free_shipping !== routeStateDefaultValues.free_shipping
    ) {
      queryParameters.free_shipping = routeState.free_shipping;
    }
    if (
      routeState.sortBy &&
      routeState.sortBy !== routeStateDefaultValues.sortBy
    ) {
      queryParameters.sortBy = routeState.sortBy;
    }
    if (
      routeState.hitsPerPage &&
      routeState.hitsPerPage !== routeStateDefaultValues.hitsPerPage
    ) {
      queryParameters.hitsPerPage = routeState.hitsPerPage;
    }

    const queryString = qsModule.stringify(queryParameters, {
      addQueryPrefix: true,
      arrayFormat: 'repeat',
    });

    return `${baseUrl}/${categoryPath}${queryString}${hash}`;
  },

  parseURL({ qsModule, location }) {
    const pathnameMatches = location.pathname.match(/search\/(.*?)\/?$/);
    const category = getCategoryName(
      (pathnameMatches && pathnameMatches[1]) || ''
    );

    const queryParameters = qsModule.parse(location.search.slice(1));
    const {
      query = '',
      page = 1,
      brands = [],
      price,
      free_shipping,
      hitsPerPage,
      sortBy,
      rating,
    } = queryParameters;

    const allBrands = (
      Array.isArray(brands) ? brands : [brands].filter(Boolean)
    );

    return {
      category,
      query: decodeURIComponent(query),
      page: page?.toString(),
      brands: allBrands.map(decodeURIComponent),
      rating: rating?.toString(),
      price: price?.toString(),
      free_shipping: free_shipping?.toString(),
      sortBy: sortBy?.toString(),
      hitsPerPage: hitsPerPage?.toString(),
    };
  },
});

const getStateMapping = ({ indexName }) => ({
  stateToRoute(uiState) {
    const indexUiState = uiState[indexName];
    return {
      query: indexUiState.query,
      page: (indexUiState.page && String(indexUiState.page)) || undefined,
      brands: indexUiState.refinementList && indexUiState.refinementList.brand,
      category:
        indexUiState.hierarchicalMenu &&
        indexUiState.hierarchicalMenu['hierarchicalCategories.lvl0'] &&
        indexUiState.hierarchicalMenu['hierarchicalCategories.lvl0'].join('/'),
      rating:
        (indexUiState.ratingMenu &&
          indexUiState.ratingMenu.rating &&
          String(indexUiState.ratingMenu.rating)) ||
        undefined,
      price: indexUiState.range && indexUiState.range.price,
      free_shipping:
        (indexUiState.toggle && String(indexUiState.toggle.free_shipping)) ||
        undefined,
      sortBy: indexUiState.sortBy,
      hitsPerPage: Number(indexUiState.hitsPerPage),
    };
  },

  routeToState(routeState) {
    const hierarchicalMenu = {};
    if (routeState.category) {
      hierarchicalMenu['hierarchicalCategories.lvl0'] =
        routeState.category.split('/');
    }

    const refinementList = {};
    if (routeState.brands) {
      refinementList.brand = routeState.brands;
    }

    const range = {};
    if (routeState.price) {
      range.price = routeState.price;
    }

    return {
      [indexName]: {
        query: routeState.query,
        page: Number(routeState.page),
        hierarchicalMenu,
        refinementList,
        ratingMenu: {
          rating: Number(routeState.rating),
        },
        range,
        toggle: {
          free_shipping: Boolean(routeState.free_shipping),
        },
        sortBy: routeState.sortBy,
        hitsPerPage: Number(routeState.hitsPerPage),
      },
    };
  },
});

const getRouting = (indexName) => ({
  router,
  stateMapping: getStateMapping({ indexName }),
});

export default getRouting;
