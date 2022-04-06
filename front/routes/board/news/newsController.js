exports.newsList = (req,res)=>{
    res.render('./board/news/newsList')
}

exports.newsWrite = (req,res)=>{
    res.render('./board/news/newsWrite')
}

exports.newsView = (req,res)=>{
    res.render('./board/news/newsView')

}

exports.newsUpdate = (req,res)=>{
    res.render('./board/news/newsUpdate')
}