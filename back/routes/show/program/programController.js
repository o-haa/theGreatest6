const express = require('express')
const pool = require('../../../db.js')

let response = {
    result:[],
    errno:1
}

exports.main = (req,res, next) =>{
    next()
}

exports.showWrite = async (req,res)=>{
    console.log('back / showWrite 라우터 접속!')

    const {category, xrated, title, ticketMonth, ticketDate, ticketHour, place, showMain, showSub, showDirector, showCompany} = req.body
    
    const sql = `INSERT INTO shows(show_title,show_category_idx,show_xrated,show_company,show_director,show_like,show_open_flag,show_content) VALUES (?,?,?,?,?,10,20,'40');`

    const prepare = [title,category,xrated,showCompany,showDirector]
    
    try{
        const [result] = await pool.execute(sql,prepare)
        const response = {
            result,
            error:0,
        }
        res.json(response)
    }
    catch(e){
        console.log("showWrite 에러발생")
    }

}

exports.showList = async (req,res)=>{
    console.log('back / showList 라우터 접속!')

    const sql = `SELECT show_idx, show_title, show_category_idx, show_xrated FROM shows ORDER BY show_idx DESC`

    try{
        const [result] = await pool.execute(sql)
        response = {
            // ...response,
            result,
            error:0,
        }
        res.json(response)
    }
    catch(e){
        console.log("showList 에러발생")
    }
    
}

exports.showCard = (req,res)=>{
    console.log('back / showCard 라우터 접속!')
}

exports.showCalendar = (req,res)=>{
    console.log('back / showCalendar 라우터 접속!')
}

exports.showView = async (req,res)=>{
    console.log('back / showView 라우터 접속!')

    const {idx} = req.params
    const sql = `select * from shows where show_idx=${idx};`

    try{
        const [result] = await pool.execute(sql)
        response = {
            result,
            error:0,
        }
        res.json(response)
    }
    catch(e){
        console.log("showView 에러발생")
    }
}

exports.showModify = (req,res)=>{
    console.log('back / showModify 라우터 접속!')
}

exports.showDelete = async (req,res)=>{
    console.log('back / showDelete 라우터 접속!')
    let {idx} = req.params
    
    try{
        const sql = `DELETE FROM shows WHERE show_idx='${idx}'`
        const [result] = await pool.execute(sql)
    }
    catch(e){
        console.log("showModify 에러발생")
    }
}

exports.showCalendar = (req,res)=>{
    console.log('back / showCalendar 라우터 접속!')
}