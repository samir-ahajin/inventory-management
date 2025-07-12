module.exports = {
    getDefaultpage:(req,res)=>{
        res.render('index',{title:'Home',script:''})
           
    }
}