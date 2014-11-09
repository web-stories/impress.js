window.utils = {
	query: function( key ) {
		var query = window.location.href.split( "?" ).pop();
		return query.split( "&" ).map(function( pair ) {
			if ( pair.split( "=" )[ 0 ] === key ) {
				return pair.split( "=" ).pop();
			}
		})[ 0 ];
	}
};