'use strict';
const Schema = global.mongoose.Schema;
const table = 'admin';
const schema = new Schema(
		    { username : String }, 
		    { password : String }
		);
const model = global.mongoose.model(table, schema);
const Admin = {
	checkPhoneExist : function(phoneno, callback) {
		model.findOne({phoneno:phoneno})
		.exec()
		.then(function(data){
			callback(data);
		})
	},
	checkLogin : function(postData, callback) {
		model.findOne({username: postData.username, password: postData.password}).exec().then(function(data){
			if(data) {
				callback({status:true, user : data});
			} else {
				callback({status: false});
			}
		})
	},

	resetPassword : function(postData,callback)
	{
		model.update({ _id : new ObjectId(postData.id) }, {
            $set : {
              "password" : postData.password
            }
          }, {upsert: true}, (err,data)=>{
			callback(data);
		} )
	}
};

module.exports = Admin;