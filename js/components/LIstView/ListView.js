import $ from "jquery";
import Backbone from "backbone";
import _ from "underscore";

const ListView = Backbone.View.extend({
  template: _.template($("#list").html()),

  initialize: function () {},

  render: function () {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  },
});

export default ListView;
