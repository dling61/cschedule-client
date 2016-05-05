
var PoolMember = Backbone.Model.extend();

var PoolMembers = Backbone.Collection.extend({

    model: PoolMember,

    //url: 'task/30001/assignmentpool',

    /*
    parse: function(resp, xhr) {
        return resp.apgroup[0].member;
    }
    */
});
