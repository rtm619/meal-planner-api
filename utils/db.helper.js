module.exports = {
  add: async (model, data) => {
    try {
      return await model.create(data)
    } catch (err) {
      throw new Error(err)
    }
  },
  get: async (model, filter) => {
    try {
      return await model.find(filter)
    } catch (err) {
      throw new Error(err)
    }
  },
  update: async (model, filter, updatedObject) => {
    try {
      return await model.update(filter, updatedObject)
    } catch (err) {
      throw new Error(err)
    }
  },
  delete: async (model, filter) => {
    try {
      return await model.remove(filter)
    } catch(err) {
      throw new Error(err)
    }
  }
}