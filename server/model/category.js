const mongoose = require('mongoose');
const CategorySchema = mongoose.Schema({
  userEmail: String,
  categories: [mongoose.Schema.Types.Mixed]
});

CategorySchema.statics={
  async getCategory(email){
    let category=await this.where({
      userEmail:email
    }).exec();
    if(category.length==0){
      category=new this({
        userEmail:email,
        categories: {
            services: [],
            friends: []
        }
      })
      await category.save();
    }else{
      category=category[0];
    }
    return category.categories;
  },
  async updateCategory(email,category){
    await this.where({
      userEmail:email
    })
    .update({
      categories:category
    }).exec();
  }
}
module.exports = mongoose.model('Category', CategorySchema);
