class Router {
   
   constructor(routes){
      this.routes = routes;
      this._loadInitialRoute();
   }
   
   loadRoute(...urlSements){
   // attempt to match the URL to a route.
   const matchedRoute = this._matchUrlToRoute(urlSegments);
   
   //push a history entry with the new URL
   //we pass an empty object and an empty string as the historystate
   //and title arguments, but their values do not really matter here
   
   const url = '/${urlSegments.join('/')}';
   history.pushState({}, '', url);
   
   //Append the template of the matched route to the DOM,
   // inside the element with the attribute data-router-outlet
   
   const routerOutletElement = document.querySelectorAll('[data-router-outlet]')[0];
   
   routerOutletElement.innerHTML = matchedRoute.template;
   
   }
   
   _matchUrlToRoute(urlSegments){
     //try and match the URL to a route.
     const matchedRoute = this.routes.find(route => {
        //we assume that the route path always starts with a slash, and so
        // the first item in the segment array will always be an empty string
        //Slice the array at index 1 to ignore this empty string.
        
        const routePathSegments = route.path.split('/').slice(1);
        
        //if there are different numbers of segments, then the route doesnt match
        if (routePathSegments.length !== urlSegments.length){
            return false;
        }
        
        //if each segment in the url atches the corresponding segment in the route path
        //or the route path segment starts with a ':' then route is matchedd
        
        const match = routePathSegments.every((routePathSegment, i) =>{
            return routePathSegment === urlSegments[i] || routePathSegment[0] == ':';
            
        });
        
        //if the route matches the URL, pull out any params from the URL,
        if(match){
        
           routePathSegments.forEach((segment, i) =>{
              if(segment[0] == ':'){
                  const propName =segment.slice(1);
                  routeParams[propName] = decodeURIComponent(urlSegments[i]);
              }
           
           });
        }
        return match;

});

return { ...matchedRoute, params: routeParams };
}
