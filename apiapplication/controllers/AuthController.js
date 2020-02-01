

module.exports = {
    signup : function(req, res) {
		var postData = req.body;
		postData.phoneno = (postData.phoneno).toString();
		global.systems.model.expense.users.checkPhoneExist(postData.phoneno, (checkData)=>{
			if(checkData) {
				res.send({status : 0, message : 'Phone no is exist please try other one'});
			} else {

				global.systems.model.expense.users.insert(postData, (data)=>{
					res.send({status : 1, message : 'success'});
				})
			}
		})
	},
	signin : function(req, res) {
        var postData = req.body;
        console.log(postData);
		var postElements = {
			username : postData.username,
			password : postData.password
        }
        
		global.models.Admin.checkLogin(postElements, (checkData) => {
			if (checkData.status == true) {
				res.send(global.config.app.send("AC-SI-0001", {"user": checkData.user}));
			} else {
                res.send(global.config.app.send("AC-SI-0002", "Login failed: check username and password", false));
			}
		});
	},
	resetPassword : function(req, res) {
		global.models.Admin.resetPassword(req.body, (responsedata)=>{
			res.send({status:true});
		})
	}
}