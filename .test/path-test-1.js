var assert= require("assert"),
  machinepackPaths= require("machinepack-paths"),
  pipeThroughMachinery= require(".."),
  streamArray= require("stream-array")

var array= ["/usr", "usr/local/bin", "/root", "etc/default"].map(function(el){ return { path: el } })
var src= streamArray(array)
var through= pipeThroughMachinery(machinepackPaths.parse, machinepackPaths)
var computed= src.pipe(through)

var expects = [
	{root: "/", dir: "/",         base: "usr",     ext: "", name: "usr" },
	{root: "",  dir: "usr/local", base: "bin",     ext: "", name: "bin" },
	{root: "/", dir: "/",         base: "root",    ext: "", name: "root" },
	{root: "",  dir: "etc",       base: "default", ext: "", name: "default" },
]

computed.on("data", function(data){
	console.log(data, ",")
	var expect = expects.shift()
	assert.deepEqual(data, expect)
})
computed.on("error", function(err){
	assert.fail(null, null, err)
})
computed.on("end", function(){
	console.log("done")
})
