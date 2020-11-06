import $ from "jquery";
import Backbone from "backbone";
import _ from "underscore";

const ListView = Backbone.View.extend({
  events: {
    "click #delToDo": "_deletTodo",
  },

  template: _.template($("#list").html()),

  initialize: function () {
    this.listenTo(this.model, "destroy", this.remove);
  },

  render: function () {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  },

  _deletTodo: function () {
    this.model.trigger("destroy", this.model);
  },
});

export default ListView;
