const express = require('express'),
      bodyParser = require('body-parser'),
      MongoClient = require('mongodb').MongoClient,
      assert = require('assert'),
      ObjectId = require('mongodb').ObjectId,
      path = require('path');

const mongodb_url = "mongodb://mguser:password1234@ds119304.mlab.com:19304/quizdb";
console.log(mongodb_url);
// initialize the express app object
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// init router
var router = express.Router();

app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.json({limit: '50mb'}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', router);

MongoClient.connect(mongodb_url, { useNewUrlParser: true }, function(err, client){
    console.log(err);
    assert.equal(null, err);
    console.log("Connecting to mongodb ....");
    

    if (err) {
        console.log('Unable to connect to the mongoDB server. Error:', err);
        process.exit();
    }
    else {
        console.log('Connection established to', mongodb_url);
        db = client.db();
    
        quizCollection = db.collection('quiz');

        router.post('/newQuiz', function(req, res, next){
            console.log(req.body);
            var newPopQuizForm = req.body;

            var newPopQuiz = {
                question: newPopQuizForm.question,
                answers: [],
                correctAnswer: newPopQuizForm.correctAnswer
            }

            newPopQuiz.answers.push({selection: 'a', value: newPopQuizForm.answer1});
            newPopQuiz.answers.push({selection: 'b', value: newPopQuizForm.answer2});
            newPopQuiz.answers.push({selection: 'c', value: newPopQuizForm.answer3});
            newPopQuiz.answers.push({selection: 'd', value: newPopQuizForm.answer4});
            
            quizCollection.insertOne(newPopQuiz,function(err, result){
                console.log(result);
                res.redirect('/list-quizes');
            });
        });

        router.post('/saveEditQuiz', (req, res, next)=>{
            var _answers = [];
            var id = req.body.id;
            console.log("Update Quiz");
            console.log("id > " + id);
            var oid = new ObjectId(id);
            _answers.push({selection: 'a', value: req.body.answer1});
            _answers.push({selection: 'b', value: req.body.answer2});
            _answers.push({selection: 'c', value: req.body.answer3});
            _answers.push({selection: 'd', value: req.body.answer4});
            console.log("req.body.question > " + req.body.question);
            console.log("req.body._answers > " + _answers);

            quizCollection.updateOne({_id: oid},{$set: {
                question: req.body.question,
                answers: _answers,
                correctAnswer: req.body.correctAnswer
            } }, (err, result)=>{
                //console.log(result);
                res.redirect('/list-quizes');
            });
        });

        router.post('/deleteQuiz', (req, res, next)=>{
            var id = req.body.id;
            console.log("delete Quiz");
            console.log("id > " + id);
            var oid = new ObjectId(id);
            quizCollection.deleteOne({_id: oid}, (err, result)=>{
                res.redirect('/list-quizes');
            });
        });
        
        router.get('/show-EditQuiz/:id', (req,res, next)=>{
            var _id = req.params.id;
            console.log("_id" + _id);
            var oid = new ObjectId(_id)
            quizCollection.findOne({_id: oid},(err, result)=>{
                console.log(JSON.stringify(result));
                var editQuiz = {
                    id: _id,
                    question: result.question,
                    answer1: result.answers[0].value,
                    answer2: result.answers[1].value,
                    answer3: result.answers[2].value,
                    answer4: result.answers[3].value,
                    correctAnswer: result.correctAnswer
                }

                res.render('editQuiz' ,{editQuiz: editQuiz});
            });
        });

        router.get('/show-DeleteQuiz/:id', (req,res, next)=>{
            var _id = req.params.id;
            console.log("_id" + _id);
            var oid = new ObjectId(_id)
            quizCollection.findOne({_id: oid},(err, result)=>{
                console.log(JSON.stringify(result));
                var deleteQuiz = {
                    id: _id,
                    question: result.question,
                    answer1: result.answers[0].value,
                    answer2: result.answers[1].value,
                    answer3: result.answers[2].value,
                    answer4: result.answers[3].value,
                    correctAnswer: result.correctAnswer
                }

                res.render('deleteQuiz' ,{deleteQuiz: deleteQuiz});
            });
        });
        
        
        router.get('/show-newQuizform', (req, res,next)=>{
            res.render('newQuiz', {});
        })

        router.get('/list-quizes', (req,res,next)=>{
            quizCollection.find({}).project({correctAnswer: 0}).toArray(function(err, quizes){
                console.log("from mongodb...");
                //console.log(JSON.stringify(quizes));
                res.render('listQuiz', {quizes: quizes});
            });
        })

        router.get('/quiz', function(req,res,next){
            quizCollection.find({}).project({correctAnswer: 0}).toArray(function(err, quizes){
                console.log("from mongodb...");
                console.log(JSON.stringify(quizes));
                res.json(quizes);
            });
        });
        
        router.post('/check-answer', function(req,res,next){
            var answer = req.body;
            var isCorrect = false;
            console.log(answer.answer);
            console.log(answer.id);
            var oid  = new ObjectId(answer.id);
            quizCollection.findOne({_id: oid},(err, result)=>{
                console.log(JSON.stringify(result));
                console.log(result.correctAnswer)
                if(result.correctAnswer === answer.answer){
                    console.log("CORRECT !");
                    isCorrect = true
                }else{
                    console.log("NOT CORRECT !");
                }
                res.json({result: isCorrect});
            });
            
        });
    }    
})

app.listen(3000, function(){
    console.log("App is running on port " + 3000);
})