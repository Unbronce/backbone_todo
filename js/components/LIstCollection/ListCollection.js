import Backbone from "backbone";
import _ from "underscore";

import ListModel from "../ListModel/ListModel";

const ListCollection = Backbone.Collection.extend({
  model: ListModel,
});

export default ListCollection;
