document.onreadystatechange = function() {
    const squares = document.querySelectorAll('.grid div');
    const scoreDiplay = document.querySelector('span');
    const startBtn = document.querySelector('.start');

    const width = 10;
    let currentIndex = 0; //first div in our grid
    let appleIndex = 0; //first div in out grid
    let currentSnake = [2,1,0]; // the div in our grid being 2 (or the HEAD), and 0 being the end (TAIL, with all 1's being the bodi from now on)

    let direction = 1;
    let score = 0;
    let speed = 0.9;
    let intervalTime = 0;
    let interval = 0;

    //to start adn restart the game
    const startGame = () =>{
        currentSnake.forEach(index => squares[index].classList.remove('snake'));
        squares[appleIndex].classList.remove('apple');
        clearInterval(interval);
        score = 0;
        randomApple()
        direction = 1;
        scoreDiplay.innerText = score;
        intervalTime = 1000;
        currentSnake =  [2, 1, 0];
        currentIndex = 0;
        currentSnake.forEach(index => squares[index].classList.add('snake'))
        interval = setInterval(moveOutComes, intervalTime);

    }


   //generate new apple once apple is eaten
    const randomApple = () => {
        do{
        appleIndex = Math.floor(Math.random() * squares.length)
        } while(squares[appleIndex].classList.contains('snake')) //making sure apples dont appear on the snake
        squares[appleIndex].classList.add('apple')
    }


    
    //function tha deals with ALL the ove out comes of the Snake
    const moveOutComes = () =>{
        //deals with snake hitting border and snake hitting self
        if(
            (currentSnake[0] + width >= (width * width) && direction === width) || //if snake hits bottom
            (currentSnake[0] % width === width -1 && direction === 1) || //if snake hits right wall
            (currentSnake[0] % width === 0 && direction === -1) || // if snake hits left wall
            (currentSnake[0] - width < 0 && direction === -width) || //if snake hits the top 
            squares[currentSnake[0] + direction] .classList.contains('snake') // if snake goes into  itself
        ){
            return clearInterval(interval); // this will clear the interval if any of the above happen
        }

        const tail = currentSnake.pop(); //removes last item of the array and show it
        squares[tail].classList.remove('snake');
        currentSnake.unshift(currentSnake[0] + direction);

        //deal with snake getting apple
        if(squares[currentSnake[0]].classList.contains('apple')){
            squares[currentSnake[0]].classList.remove('apple');
            squares[tail].classList.add('snake');
            currentSnake.push(tail);
            randomApple();
            score++;
            scoreDiplay.textContent = score;
            clearInterval(interval);
            intervalTime = intervalTime * speed;
            interval = setInterval(moveOutComes, intervalTime);
        }

        squares[currentSnake[0]].classList.add('snake');
    }


    //Assing function to keycodes (moves)
    const control = (e) =>{
        squares[currentIndex].classList.remove('snake');

        if(e.keyCode === 39){
            direction = 1; // if wi press the right arron on ou keyboard
        }else if(e.keyCode === 38 ){
            direction = -width;
        }else if (e.keyCode === 37){
            direction = -1;
        }else if (e.keyCode === 40){
            direction = +width;
        }
    }

    document.addEventListener('keyup', control);
    startBtn.addEventListener('click', startGame);

};