require.config({
  paths: { 
    router: 'MainRouter'
  },
});

// Define the application entry point
define(['router'], function (router) {
    router.initialize();
});