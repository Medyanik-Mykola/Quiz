let questF = document.querySelector(".question")
let answer_button = document.querySelectorAll(".answer")

function randint(min, max){
    return Math.round(Math.random() * (max - min) + min)
}

let signs = ["+", "-", "*", "/"]

function grs(){
    return signs[randint(0, 3)]
}

function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
    array[randomIndex], array[currentIndex]];
  }
  return array;
}

class Question{
    constructor(){
        let a = randint(1, 30)
        let b = randint(1, 30)
        let sign = grs()
        this.question = `${a} ${sign} ${b}`
        if (sign == "+"){
            this.correct = Math.round(a + b)
        } else if (sign == "-"){
            this.correct = Math.round(a - b)
        } else if (sign == "*"){
            this.correct = Math.round(a * b)
        } else if (sign == "/"){
            this.correct = Math.round(a / b)
        }
        this.answers = [
            randint(this.correct - 15, this.correct - 1),
            randint(this.correct - 15, this.correct - 1),
            randint(this.correct + 15, this.correct + 1),
            randint(this.correct + 15, this.correct + 1),
            this.correct
        ]
        shuffle(this.answers)
     
    }
    display(){
        questF.innerHTML = this.question
        for (let i = 0; i < this.answers.length; i += 1){
            answer_button[i].innerHTML = this.answers[i]
        }
    }
}

let count_true = 0
let count_false = 0
let total_answers = 0
let show_true_field = document.querySelector(".show_true_field")
let show_false_field = document.querySelector(".show_false_field")
let accuracy_field = document.querySelector(".accuracy_field")

let current_question = new Question()
current_question.display()

for (let i = 0; i < answer_button.length; i += 1){
    answer_button[i].addEventListener("click", function(){
        if (answer_button[i].innerHTML == current_question.correct){
            answer_button[i].style.background = "#32CD32"
            count_true += 1
            show_true_field.innerHTML = "Правильних відповідей: " + count_true
        } else {
            answer_button[i].style.background = "#DC143C"
            count_false += 1
            show_false_field.innerHTML = "Неправильних відповідей: " + count_false
        }
            anime({
                targets: answer_button[i],
                background: "#2b95ff",
                duration: 500,
                easing: "linear",
            })
        current_question = new Question()
        current_question.display()
        total_answers+= 1
        let accuracy = ((count_true / total_answers) * 100).toFixed(2);
        accuracy_field.innerHTML = "Точність: " + accuracy + "%";
    })

    
}

const modal = document.querySelector('.backdrop');

const modalBtnClose = document.querySelector('.modal-bth-close');

const toggleModal = () => modal.classList.toggle('is-hidden');


modalBtnClose.addEventListener('click', toggleModal);


