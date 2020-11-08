import $ from "jquery";
import Backbone from "backbone";
import _ from "underscore";

const ListView = Backbone.View.extend({
  events: {
    "click #delToDo": "_deletTodo",
    "click #editToDo": "_editToDo",
    "click #editorSave": "_editedTodo",
  },

  template: _.template($("#list").html()),

  initialize: function () {
    this.listenTo(this.model, "destroy", this.remove);
  },

  render: function () {
    this.$el.html(this.template(this.model.toJSON()));
    this.$(".editor").hide();
    this.$("#editorSave").hide();
    return this;
  },

  _deletTodo: function () {
    this.model.trigger("destroy", this.model);
  },

  _editToDo: function () {
    this.$(".editor").val(this.model.get("value"));
    this.$(".value").hide();
    this.$("#delToDo").hide();
    this.$("#editToDo").hide();
    this.$(".editor").show();
    this.$("#editorSave").show();
  },

  _editedTodo: function () {
    this.model.set({ value: this.$(".editor").val() });
    this.$(".editor").hide();
    this.$("#editorSave").hide();
    this.$("#listItem").empty();
    this.render();
  },
});

export default ListView;
