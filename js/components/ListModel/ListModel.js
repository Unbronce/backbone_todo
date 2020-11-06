import Backbone from "backbone";
import _ from "underscore";
import { v4 as uuidv4 } from "uuid";

const ListModel = Backbone.Model.extend({
  defaults() {
    return {
      value: "",
      id: uuidv4(),
    };
  },
});

export default ListModel;
