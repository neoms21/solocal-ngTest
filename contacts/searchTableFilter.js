app.filter('searchTable', function () {
    return function (items, props) {

        var out = [];
        if ( items == null || items.length === 0 || !props.query)
            return items;

        var text = props.query.toLowerCase();
        items.forEach(function (item) {

            if (item['firstName'].substr(0,1).toLowerCase() === text || item['lastName'].substr(0,1).toLowerCase()=== text) {
                out.push(item);
            }

        });
        return out;
    }
});