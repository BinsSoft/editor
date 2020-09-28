

module.exports = {
    signUp : function(req, res) {
		var postData = req.body;
		
		global.models.users.checkEmailExist(postData.email, (checkData)=>{
			if(checkData) {
				res.send(global.config.app.send("AC-SU-0001",'Email  is exist please try other one',false));
				
			} else {

				global.models.users.saveUser(postData, (data)=>{
					res.send(global.config.app.send("AC-SU-0002", "Success"));
				})
			}
		})
	},
	signin : function(req, res) {
        var postData = req.body;
		global.models.users.checkLogin(postData, (checkData) => {
			if (checkData.status == true) {
				res.send(global.config.app.send("AC-SI-0001", {"user": checkData.user}));
			} else {
                res.send(global.config.app.send("AC-SI-0002", "Login failed: check username and password", false));
			}
		});
	},
	resetPassword : function(req, res) {
		global.models.users.resetPassword(req.body, (responsedata)=>{
			res.send({status:true});
		})
	},

	uploadFile: function(req, res) {
		let data = req.body;
		setTimeout(()=>{
			res.send(data);
		},3000);
	}
}