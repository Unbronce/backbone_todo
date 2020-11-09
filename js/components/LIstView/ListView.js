import $ from "jquery";
import Backbone from "backbone";
import _ from "underscore";

const ListView = Backbone.View.extend({
  events: {
    "click #delToDo": "_deletTodo",
    "click #editToDo": "_editToDo",
    "click #editorSave": "_editedTodo",
    "click .value": "_doneTodo",
  },

  template: _.template($("#list").html()),

  initialize: function () {
    this.listenTo(this.model, "destroy", this.remove);
    this.listenTo(this.model, "change", this._isDone);
  },

  render: function () {
    this.$el.html(this.template(this.model.toJSON()));
    this.$(".editorBlock").hide();
    return this;
  },

  _deletTodo: function () {
    const arr = JSON.parse(localStorage.getItem("item"));
    const newArr = arr.filter((model) => model.id !== this.model.get("id"));
    localStorage.setItem("item", JSON.stringify(newArr));
    this.model.trigger("destroy", this.model);
  },

  _editToDo: function () {
    this.$(".editor").attr("id", this.model.get("id"));
    this.$(".editor").val(this.model.get("value"));
    this.$(".toDoBlock").hide();
    this.$(".editorBlock").show();
  },

  _editedTodo: function () {
    this.model.set({ value: this.$(".editor").val() });
    const modelValue = this.model.get("value");
    const modelID = this.model.get("id");
    const arr = JSON.parse(localStorage.getItem("item"));
    const newArr = arr.map((model) => {
      if (model.id === modelID) {
        return {
          ...model,
          value: modelValue,
        };
      }
      return model;
    });
    localStorage.setItem("item", JSON.stringify(newArr));
    this.$(".editorBlock").hide();
    this.$("#listItem").empty();
    this.render();
  },

  _isDone: function () {
    const modelID = this.model.get("id");
    const arr = JSON.parse(localStorage.getItem("item"));
    const newArr = arr.map((model) => {
      if (model.id === modelID) {
        return {
          ...model,
          done: this.model.get("done"),
        };
      }
      return model;
    });
    localStorage.setItem("item", JSON.stringify(newArr));

    if (this.model.get("done")) {
      this.$(".inputChek").prop("checked", true);
      this.$(".value").css("text-decoration", "line-through");
    } else {
      this.$(".inputChek").prop("checked", false);
      this.$(".value").css("text-decoration", "none");
    }
  },

  _doneTodo: function () {
    this.$(".value").attr("for", this.model.get("id"));
    this.$(".inputChek").attr("id", this.model.get("id"));

    if (this.$(".inputChek").is(":checked")) {
      this.model.set({ done: false });
      this.$(".inputChek").prop("checked", true);
    } else {
      this.model.set({ done: true });
      this.$(".inputChek").prop("checked", false);
    }
  },
});

export default ListView;
