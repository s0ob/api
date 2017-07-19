 var myApp = angular.module('myApp', ['ngRoute']);

    // configure our routes
    myApp.config(function($routeProvider) {
        $routeProvider

            // route for the home page
            .when('/Home', {
                templateUrl : 'pages/index.html',
                controller  : 'mainController'
            })

            // route for the about page
            .when('/About', {
                templateUrl : 'pages/about.html',
                controller  : 'aboutController'
            })
            

            // route for the contact page
            .when('/Contact', {
                templateUrl : 'pages/contact.html',
                controller  : 'contactController'
            })
            // route for the favorites page
            .when('/Favorites', {
                templateUrl : 'pages/favorites.html',
                controller  : 'favoritesController'
            });
            
            
    });

    // create the controller and inject Angular's $scope
        // create a message to display in our view
       myApp.controller('searchController', function($scope, $http){

		$scope.message = 'Enter the place you interest and press enter to search';
    
		$scope.search = function($event){
        
		console.log('search()');
        
        
		if($event.which == 13){
            
			var s = $scope.searchTerm;
            
			console.log(s);
            
            
			var url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?" + "key=" + key + "&location=" + location + "&radius=" + radius + "&sensor=" + sensor + "&types=" + types + "&keyword=" + search;
            
			$http.get(url).success(function(res){
                
				console.log(res);
                
				$scope.place = res.items;
                
				$scope.searchTerm = ' ';
            
			});
        
		}
    
	}
       });
       myApp.controller('detailController', function($scope, $routeParams) {
  $scope.message = 'This is the detail screen'
  $scope.id = $routeParams.id
  $scope.addToFavourites = function(id,title) {
    console.log('adding: '+id+title+' to favourites.')
    localStorage.setItem(id, id)
    localStorage.setItem(title,title)
  }
})

myApp.controller('favouritesController', function($scope) {
  console.log('fav controller')
  $scope.message = 'This is the favourites screen'
  $scope.delete = function(id) {
    console.log('deleting id '+id)
    localStorage.removeItem(id)
    init()
  }
  var init = function() {
    console.log('getting books')
    var items = Array()
    for (var a in localStorage) {
      items.push(localStorage[a])
    }
    console.log(items)
    $scope.place = items
  }
  init()
})
