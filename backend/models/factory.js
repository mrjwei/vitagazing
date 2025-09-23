const mongoose = require('mongoose');

function modelFactory(modelName, schemaDefinition, options = {}) {
    const schema = new mongoose.Schema(schemaDefinition, options);
    if (options.pre) {
      for (const {hook, fn} of options.pre) {
        schema.pre(hook, fn);
      }
    }
    return mongoose.model(modelName, schema);
}

module.exports = modelFactory;
