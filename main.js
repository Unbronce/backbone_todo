import $ from "jquery";
import Backbone from "backbone";
import _ from "underscore";

import ListCollection from "./js/components/LIstCollection/ListCollection";
import ListView from "./js/components/LIstView/ListView";

const MainView = Backbone.View.extend({
  el: "#app",
  events: {
    "click #formButton": "_addTodo",
  },

  template: _.template($("#formField").html()),

  initialize: function () {
    this.collection = new ListCollection();
    this.listenTo(this.collection, "add", this._renderList);
  },

  render: function () {
    this.$el.html(this.template(this.collection));
    return this;
  },

  _renderList: function () {
    const $listContainer = this.$("#listContainer");
    $listContainer.empty();
    localStorage.clear();
    this.collection.each(function (model) {
      const item = localStorage.getItem("item");
      if (item) {
        const arr = JSON.parse(localStorage.getItem("item")).concat(model);
        localStorage.setItem("item", JSON.stringify(arr));
      } else {
        localStorage.setItem("item", JSON.stringify([model]));
      }
      const listView = new ListView({ model });
      $listContainer.append(listView.render().$el);
    });
  },

  _addTodo: function () {
    this.collection.add({ value: $("#formFieldInput").val() });
    this.$("#formFieldInput").val("");
  },

  _renderFromLocalStorage: function () {
    const toDoList = JSON.parse(localStorage.getItem("item"));
    this.collection.add(toDoList);
    const $toDoList = this.$("#listContainer");
    $toDoList.empty();
    this.collection.each(function (model) {
      const listView = new ListView({ model });
      $toDoList.append(listView.render().$el);
    });
  },
});

const mainView = new MainView();
mainView.render();
mainView._renderFromLocalStorage();
