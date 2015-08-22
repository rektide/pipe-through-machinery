var through2= require("through2")

function PipeThroughMachinery(machineFn, machine){
	return throught2(function(chunk, encoding, callback){
		machineFn.call(machine, chunk).exec({
			success: function(result){
				callback(null, result)
			},
			error: function(err){
				callback(err)
			}
		})
	})
}
module.exports = PipeThroughMachinery


