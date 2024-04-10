function handleTest(req,res){
    return res.status(200).send({
        message:"Hello User",
        testsuccess:true,
    })
}

module.exports={
    handleTest,
}