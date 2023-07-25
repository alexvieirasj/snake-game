//Tudo começa depois que a janela estiver carregada
window.onload = function() {

    let stage = document.getElementById('stage');
    let context = stage.getContext('2d'); //tipo 2d

    //espera uma tecla ser pressionada
    document.addEventListener("keydown", keyPush);

    //Chama a função do jogo
    setInterval(game, 80);


    const velocity = 1;

    let velocity_X = 0;
    let velocity_Y = 0;
    let position_X = 10; //inicio/cabeça da snake
    let position_Y = 15;
    let lenght_piece = 20;  //tamanho da peça
    let number_pieces = 20; 
    let apple_X = 15; //posição inicial da maça
    let apple_Y = 15; //posição inicial da maça

    let trail = []; //tamanho da calda
    let tail = 5;


    function game(){
        position_X += velocity_X;
        position_Y += velocity_Y;

        //testa de cobra chega até a borda da tela
        if(position_X < 0 ) {
            position_X = number_pieces - 1;
        }

        if(position_X > number_pieces -1 ){
            position_X = 0;
        }

        if(position_Y < 0 ) {
            position_Y = number_pieces - 1;
        }

        if(position_Y > number_pieces -1 ){
            position_Y = 0;
        }

        //faz a pintura da tela
        context.fillStyle = 'black';
        context.fillRect(0, 0, stage.width, stage.height);

        //pinta a maçã
        context.fillStyle = 'red';
        context.fillRect(apple_X * lenght_piece, apple_Y * lenght_piece, lenght_piece, lenght_piece);

        //pintar a cobra e o rastro dela
        context.fillStyle = 'gray';
        for (let i = 0; i < trail.length; i++) {
            context.fillRect(trail[i].x * lenght_piece, 
            trail[i].y * lenght_piece, 
            lenght_piece -1, lenght_piece -1); 

            //verifica se cabeça da cobra bateu na propria cauda, tem que dar game over
            if(trail[i].x == position_X && trail[i].y == position_Y){
                velocity_X = 0;
                velocity_Y = 0;
                tail = 5;
            }
        }

        
            //salva as posições atuais, por que não bateu na cauda
            trail.push({ x:position_X, y:position_Y })

            //testa se o tamanho do rastro ta maior que a calda
            while(trail.length > tail){
                trail.shift(); //tira o primeiro elemento do array
            }

            //aumenta o rastro
            if(apple_X == position_X && apple_Y == position_Y){
                tail++;

                //posiciona a maça para outro lugar do tabuleiro
                apple_X = Math.floor(Math.random() * number_pieces);
                apple_Y = Math.floor(Math.random() * number_pieces);
            }

    } 

    function keyPush(event){
        
        switch (event.keyCode) {
            case 37: //Left
                velocity_X  = -velocity;
                velocity_Y = 0;
                break;
            case 38: //Up
                velocity_X  = 0;
                velocity_Y = -velocity;
                break;
            case 39: //Right
                velocity_X  = velocity;
                velocity_Y = 0;
                break;
            case 40: //Down
                velocity_X  = 0;
                velocity_Y = velocity;
                break;
            default:
                break;
        }
    }


}