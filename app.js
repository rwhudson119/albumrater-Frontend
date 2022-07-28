const express = require('express');
//import express from 'express';
const app = express();
//import app from express();
const bodyParser = require('body-parser');
//import bodyParser from 'body-parser';

const useNavigate = require('react-router-dom/useNavigate')


//import { useNavigate } from 'react-router-dom';

app.use(bodyParser.json());

const navigate  = useNavigate ();

app.get('/', (req, res) =>{
	res.send('<h1>Website</h1>');
	navigate(`/`);
})


app.listen(process.env.PORT || 3000, ()=> {
	console.log('The website app is listening on port 4000!');
})


//import { useNavigate } from 'react-router-dom';