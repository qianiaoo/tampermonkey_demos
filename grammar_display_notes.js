// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://host.lang.hiroshima-cu.ac.jp/*
//      @include https://code.jquery.com/jquery-3.2.1.min.js
// @grant        unsafeWindow
// ==/UserScript==

(function() {
    'use strict';


    function alal(){
        alert("alalal");
    };
　//　;
   //   $('#vue').after('<button v-if="! isQuizMode" type="button" class="btn 1"><i class="fas fa-caret-left fa-fw" aria-hidden="true"></i>メニューに戻る</button>');

   //  $('#loginBtn').after('<button v-if="! isQuizMode" type="button" class="btn 1"><i class="fas fa-caret-left fa-fw" aria-hidden="true"></i>メニューに戻る</button>');
   //  $('#loginBtn').after('<p id="txt">这是一个段落 </p>')
    //$(".btn.k_btn_f.btn-danger").remove();
    $(".btn.k_btn_f.btn-danger").remove();
$('.panel-heading').before('<button type="button" @click="submit2()" id="okbtn" class="btn k_btn_f btn-danger2"><i class="fas fa-check-circle fa-fw" aria-hidden="true"></i>OK</button>');
    $('.panel-heading').before('<button type="button" @click="submit3()" id="okbtn" class="btn k_btn_f btn-danger3"><i class="fas fa-check-circle fa-fw" aria-hidden="true"></i>??</button>');

//
//    $("#loginBtn").bind("click",function(){
//    alert("这个段落被点击了。");
//});
//    $("button.btn.1").on("click",function(){
//    alert("这个监听器被点击了。");
//});
//    $(".btn.k_btn_f.btn-danger").click(function() {
//    alal();
//});


  //      alert(window.frames.document.querySelector('#vue').__vue__.token);
var token1 = window.frames.document.querySelector('#vue').__vue__.token;
    //alert(window.frames.document.querySelector('#vue').__vue__.token);
  var vue1 = unsafeWindow.vue;
var vue2 =  window.frames.document.querySelector('#vue').__vue__;
//     var isQuizMode = false;
// var isQuizPracticeMode = false;
//
// var useGroupRetry = true;
// var isGroupRetryMode = false;
// var isGiveUpCount = false;
//
// var isSpotLessonMode = false;
// var responseWaiting = false;
// var lastTime;

var isQuizMode = unsafeWindow.isQuizMode;
var isQuizPracticeMode = unsafeWindow.isQuizPracticeMode;

var useGroupRetry = unsafeWindow.useGroupRetry;
var isGroupRetryMode = unsafeWindow.isGroupRetryMode;
var isGiveUpCount = unsafeWindow.isGiveUpCount;

var isSpotLessonMode = unsafeWindow.isSpotLessonMode;
var responseWaiting = unsafeWindow.responseWaiting;
var lastTime;
var token= vue2.token
var materialId= vue2.materialId
var materialNoWithRoundCount= vue1.materialNoWithRoundCount
var materialNo= vue1.materialNo

var userAnswer= vue1.userAnswer
var retryCounter= vue1.retryCounter
var shuffleIndexes= vue1.shuffleIndexes

var isPassed= vue1.isPassed
var isPassedPoint= vue1.isPassedPoint
var showCorrectAnswer= vue1.showCorrectAnswer
var note= vue1.note
var marks= vue1.marks

var requestReviewBtnShow= vue1.requestReviewBtnShow
var requestReviewBtnChecked= vue1.requestReviewBtnChecked
var requestReviewBtnEnabled= vue1.requestReviewBtnEnabled
var isReview= vue1.isReview
isQuizMode= vue1.isQuizMode
var commentTime= vue1.commentTime

 unsafeWindow.vue.$destroy()
var vm = new Vue({
	el: '#vue',
	data: {
		token: token,
		materialId: materialId,
		materialNoWithRoundCount: materialNoWithRoundCount,
		materialNo: materialNo,

		userAnswer: userAnswer,
		retryCounter: retryCounter,
		shuffleIndexes: shuffleIndexes,

		isPassed: isPassed,
		isPassedPoint: isPassedPoint,
		showCorrectAnswer: showCorrectAnswer,
		note: note,
		marks: marks,

		requestReviewBtnShow: requestReviewBtnShow,
		requestReviewBtnChecked: requestReviewBtnChecked,
		requestReviewBtnEnabled: requestReviewBtnEnabled,
		isReview: isReview,
		isQuizMode: isQuizMode,
		commentTime: commentTime,
	},
	computed: {
		isAG: function() {
			return this.materialId.indexOf("AG") == 0;
		},
		isRetry: function() {
			if( isGroupRetryMode ) return true;
			if( isSpotLessonMode ) return true;
			return (! this.isPassed) && (this.retryCounter > 0);
		},
		submitBtnName: function() {
			return isQuizMode? "提出する" :"採点する";
		},
		headingMsg: function() {
			if( useGroupRetry && this.isPassed && ! this.isPassedPoint ) {
				var msg = "間違いです。";
				if( isGiveUpCount ) msg += "結果を確認できますが、";
				msg += "<span class='k_red'>後でもう一度出題されます。</span>";
				return msg;
			}
			return ( this.isPassed )? "結果を確認してから、次の課題に進んでください。" :
					"下の空欄にあてはまるものを(A)〜(D)の中から選んでください。";
		},
		retryMsg: function() {
			if( isGroupRetryMode ) return "再挑戦 1回目";
			if( isSpotLessonMode ) return "弱点克服学習";
			return "再挑戦 "+ this.retryCounter;
		}
	},
	methods: {
		submit: function() {
            alert("submit()")
			var quizNext = ( isQuizMode && ! isQuizPracticeMode );
			if( quizNext ) document.getElementById("vue").style.display ="none";
			submit( this.$data, quizNext );
		},
		next: function() {
			var forward = 'webapi/lesson/grammar';
			if(this.isReview) forward += '/review/-1';
			else if(isSpotLessonMode) forward += '/spot/';
			exit( this.$data, forward );
		},
		menu: function() {
			exit( this.$data, 'lesson' );
		},
		markCheck: function(index, mark) {
			return this.marks[this.shuffleIndexes[index]] === mark;
		},
        submit2: function() {
	//alert("submit222222");
            var ans = $('input:radio:checked').val();

            vm.userAnswer = ans;

            var quizNext = ( isQuizMode && ! isQuizPracticeMode );
			if( quizNext ) document.getElementById("vue").style.display ="none";
			submit( this.$data, quizNext );
		},
        submit3: function() {
            var ans = $('input:radio:checked').val();

            vm.userAnswer = ans;
            alert(vm.userAnswer);
        }
	}
});
    debugger;
   unsafeWindow.vue = vm;

function submit( data, quizNext ) {
	if( responseWaiting ) return;
	responseWaiting = true;
	var url = "/e-learning-1-g-l/webapi/lesson/grammar/submit";
	axios.post( url, data )
	.then(function(response) {
		 // console.log(response.status, response.statusText, response.data);
        debugger;
		var result = response.data;
        $('.col-xs-12.col-sm-11.k_a_area').append('<div class="row"><p id="txt">' +result.notes+" </p></div>");
var ok = result.isPassed;
        $("#okbtn").text("Your answer is :" + ok);
		if( result.isPassed === undefined ) {
			var error = { "response": { "data": "" } };
			goException(error);
		 }
		vm.isPassed = result.isPassed;
		vm.isPassedPoint = result.isPassedPoint;
		vm.showCorrectAnswer = result.showCorrectAnswer;
		vm.note = result.notes;
		vm.marks = result.marks;
		vm.requestReviewBtnShow = result.requestReviewBtnShow;
		vm.requestReviewBtnChecked = result.requestReviewBtnChecked;
		vm.requestReviewBtnEnabled = result.requestReviewBtnEnabled;
		if( ! result.isPassed ) {
			vue.retryCounter++;
			window.alert( "間違いです。もう一度挑戦してください。" );
		}
		responseWaiting = false;
		lastTime = new Date().getTime();
		if( quizNext ) vue.next();
	})
	.catch(function(error) {
		goException(error);
	});
	document.getElementById("vue").scrollIntoView(true);
}

function exit( data, forward ) {
	if( responseWaiting ) return;
	responseWaiting = true;
	vue.commentTime = Math.round((new Date().getTime() - lastTime) / 1000);
	var url = "/e-learning-1-g-l/webapi/lesson/grammar/exit";
	axios.post( url, data )
	.then(function(response) {
		//  console.log(response.status, response.statusText, response.data);
		jump( forward );
	})
	.catch(function(error) {
		goException(error);
	});
}




})();
