import { Container, Sprite, Texture, AnimatedSprite, TARGETS, Spritesheet, TimeLimiter } from 'pixi.js'

export class Game extends Container
{
    // Params >>------------------------------------------------------------<<<<

    public static WIDTH = window.innerWidth;
    public static HEIGHT = window.innerHeight;

    // Init >>--------------------------------------------------------------<<<<

    /**
     * @private
     */
    constructor()
    {
        super();
        this.configurate();
        this.balls();
    }

    protected configurate():void
    {
        let bg:Sprite = new Sprite(Texture.from('../assets/bg.jpg'));
        bg.width = Game.WIDTH;
        bg.height = Game.HEIGHT;

        this.addChild(bg);
    }

    // Base >>--------------------------------------------------------------<<<<

    protected balls(): void {
        const ballsInLine = 5
        const gridSize = Number(ballsInLine * 0.8 + '00') 
        const correction = 100
        const diapasons: Array<number[]> = []
        const ballsAddresses = [
            "../assets/ball-yellow.png",
            "../assets/ball-blue.png",
            "../assets/ball-red.png",
            "../assets/ball-green.png",
            "../assets/ball-black.png",
            "../assets/ball-white.png",
            "../assets/ball-high-yellow.png",
            "../assets/ball-purple.png"
        ]

        let ball: Sprite = Sprite.from(ballsAddresses[randomNumber()])
        let ballsLine: Array<Sprite> = []
        let x = 0
        let positionX = ((Game.WIDTH / 2) - (gridSize / 2))
        let positionXStatic = positionX
        let positionY = ((Game.HEIGHT / 2) - (gridSize / 2))
        let itemsNumbers: Array<number> = []
        let balls: Array<Sprite> = []
        let ballsInLineIndexes3Times: Array<number> = []
        let ballsToMove: Array<number> = []
        let ballsWhereYouCanMove: Array<number> = []
        let clickedBallIndexes: Array<number> = []
        let pairs: Array<string> = []
        let arrayActiveIndexes: Array<number> = []
        let count = 0
        let minute = 0;
        let sec = 59;


        firstStart()


        function firstStart() {
            setNumberDiapasonsInLine()
            createBallsSquare()
            if(doWeHaveOptions() === false) {
                console.log('RE-CREATION!');
                balls = []
                x = 0
                positionX = ((Game.WIDTH / 2) - (gridSize / 2))
                positionXStatic = positionX
                positionY = ((Game.HEIGHT / 2) - (gridSize / 2))
                firstStart()
            }
            for(let i = 0; i < balls.length; i++) {
                setMore2BallsInLine([i])
            }

        }


        function doWeHaveOptions(): boolean {
            pairs = []
            ballsToMove = []
            ballsWhereYouCanMove = []

            for(let i = 0; i < balls.length; i++) {
               
                const itemNumberLineNow = Math.floor(i / ballsInLine)

                if(balls[i].texture === balls[i - ballsInLine]?.texture) {
                    
                    if(balls[i].texture === balls[i + ballsInLine - 1]?.texture
                        && diapasons[itemNumberLineNow + 1]?.includes(i + ballsInLine - 1)) {
                        balls[i + ballsInLine - 1].roundPixels = true
                        ballsToMove.push(i + ballsInLine - 1)
                        ballsWhereYouCanMove.push(i + ballsInLine)
                    }

                    if(balls[i].texture === balls[i + ballsInLine + 1]?.texture
                        && diapasons[itemNumberLineNow + 1]?.includes(i + ballsInLine + 1)) {
                        balls[i + ballsInLine + 1].roundPixels = true
                        ballsToMove.push(i + ballsInLine + 1)
                        ballsWhereYouCanMove.push(i + ballsInLine)
                    }

                    if(balls[i].texture === balls[i - ballsInLine * 2 - 1]?.texture
                        && diapasons[itemNumberLineNow - 2]?.includes(i - ballsInLine * 2 - 1)) {
                        balls[i - ballsInLine * 2 - 1].roundPixels = true
                        ballsToMove.push(i - ballsInLine * 2 - 1)
                        ballsWhereYouCanMove.push(i - ballsInLine * 2)
                    }

                    if(balls[i].texture === balls[i - ballsInLine * 2 + 1]?.texture
                        && diapasons[itemNumberLineNow - 2]?.includes(i - ballsInLine * 2 + 1)) {
                        balls[i - ballsInLine * 2 + 1].roundPixels = true
                        ballsToMove.push(i - ballsInLine * 2 + 1)
                        ballsWhereYouCanMove.push(i - ballsInLine * 2)
                    }
                }

                if(balls[i].texture === balls[i - ballsInLine * 2]?.texture) {
                    
                    if(balls[i].texture === balls[i - ballsInLine - 1]?.texture
                        && diapasons[itemNumberLineNow - 1]?.includes(i - ballsInLine - 1)) {
                        balls[i - ballsInLine - 1].roundPixels = true
                        ballsToMove.push(i - ballsInLine - 1)
                        ballsWhereYouCanMove.push(i - ballsInLine)
                    }

                    if(balls[i].texture === balls[i - ballsInLine + 1]?.texture
                        && diapasons[itemNumberLineNow - 1]?.includes(i - ballsInLine + 1)) {
                        balls[i - ballsInLine + 1].roundPixels = true
                        ballsToMove.push(i - ballsInLine + 1)
                        ballsWhereYouCanMove.push(i - ballsInLine)
                    }

                    if(balls[i].texture === balls[i - ballsInLine * 3]?.texture) {
                        balls[i].roundPixels = true
                        ballsToMove.push(i)
                        ballsWhereYouCanMove.push(i - ballsInLine)
                    }

                    if(balls[i].texture === balls[i + ballsInLine]?.texture) {
                        balls[i - ballsInLine * 2].roundPixels = true
                        ballsToMove.push(i - ballsInLine * 2)
                        ballsWhereYouCanMove.push(i - ballsInLine)
                    }
                }

                if(balls[i].texture === balls[i - 1]?.texture
                    && diapasons[itemNumberLineNow]?.includes(i - 1)) {

                    if(balls[i].texture === balls[i - ballsInLine - 2]?.texture
                        && diapasons[itemNumberLineNow - 1]?.includes(i - ballsInLine - 2)) {
                            balls[i - ballsInLine - 2].roundPixels = true
                            ballsToMove.push(i - ballsInLine - 2)
                            ballsWhereYouCanMove.push(i - 2)
                        }

                    if(balls[i].texture === balls[i + ballsInLine - 2]?.texture
                        && diapasons[itemNumberLineNow + 1]?.includes(i + ballsInLine - 2)) {
                            balls[i + ballsInLine - 2].roundPixels = true
                            ballsToMove.push(i + ballsInLine - 2)
                            ballsWhereYouCanMove.push(i - 2)
                        }

                    if(balls[i].texture === balls[i - ballsInLine + 1]?.texture
                        && diapasons[itemNumberLineNow - 1]?.includes(i - ballsInLine + 1)) {
                            balls[i - ballsInLine + 1].roundPixels = true
                            ballsToMove.push(i - ballsInLine + 1)
                            ballsWhereYouCanMove.push(i + 1)
                        }

                    if(balls[i].texture === balls[i + ballsInLine + 1]?.texture
                        && diapasons[itemNumberLineNow + 1]?.includes(i + ballsInLine + 1)) {
                            balls[i + ballsInLine + 1].roundPixels = true
                            ballsToMove.push(i + ballsInLine + 1)
                            ballsWhereYouCanMove.push(i + 1)
                        }
                }

                if(balls[i].texture === balls[i - 2]?.texture
                    && diapasons[itemNumberLineNow]?.includes(i - 2)) {
                    
                    if(balls[i].texture === balls[i - ballsInLine - 1]?.texture
                        && diapasons[itemNumberLineNow - 1]?.includes(i - ballsInLine - 1)) {
                        balls[i - ballsInLine - 1].roundPixels = true
                        ballsToMove.push(i - ballsInLine - 1)
                        ballsWhereYouCanMove.push(i - 1)
                    }

                    if(balls[i].texture === balls[i + ballsInLine - 1]?.texture
                        && diapasons[itemNumberLineNow + 1]?.includes(i + ballsInLine - 1)) {
                        balls[i + ballsInLine - 1].roundPixels = true
                        ballsToMove.push(i + ballsInLine - 1)
                        ballsWhereYouCanMove.push(i - 1)
                    }

                    if(balls[i].texture === balls[i + 1]?.texture
                        && diapasons[itemNumberLineNow]?.includes(i + 1)) {
                        balls[i - 2].roundPixels = true
                        ballsToMove.push(i - 2)
                        ballsWhereYouCanMove.push(i - 1)
                    }

                    if(balls[i].texture === balls[i - 3]?.texture
                        && diapasons[itemNumberLineNow]?.includes(i - 3)) {
                        balls[i].roundPixels = true
                        ballsToMove.push(i)
                        ballsWhereYouCanMove.push(i - 1)
                    }
                }
            }

            if (ballsToMove.length === 0) {
                console.log(`---------------------------`);
                console.log(`Do you have options?`, false);
                return false
            } else {
                console.log(`---------------------------`);
                console.log(`Do you have options?`, true);

                for(let i = 0; i < ballsToMove.length; i++) {
                    pairs.push('You can move ' + `${ballsToMove[i]}` + ' to ' + `${ballsWhereYouCanMove[i]}`)
                    pairs.push('You can move ' + `${ballsWhereYouCanMove[i]}` + ' to ' + `${ballsToMove[i]}`)
                }

                console.log(pairs);

                return true
            }
        }


        function setMore2BallsInLine(arrayActiveIndexes: Array<number>) {
            ballsInLineIndexes3Times = []
            
            for(let i = 0; i < balls.length; i++) {
                const itemNumberLineNow = Math.floor(i / ballsInLine)

                if(arrayActiveIndexes.includes(i)) {
                    if(balls[i].texture === balls[i - ballsInLine]?.texture 
                        && balls[i].texture === balls[i - ballsInLine * 2]?.texture) {
                            if(ballsInLineIndexes3Times.includes(i - ballsInLine)) {
                                ballsInLineIndexes3Times.push(i)
                            } else {
                                ballsInLineIndexes3Times.push(i)
                                ballsInLineIndexes3Times.push(i - ballsInLine)
                                ballsInLineIndexes3Times.push(i - ballsInLine * 2)
                            }
                    }
    
                    if(balls[i].texture === balls[i + ballsInLine]?.texture 
                        && balls[i].texture === balls[i + ballsInLine * 2]?.texture) {
                            if(ballsInLineIndexes3Times.includes(i + ballsInLine)) {
                                ballsInLineIndexes3Times.push(i)
                            } else {
                                ballsInLineIndexes3Times.push(i)
                                ballsInLineIndexes3Times.push(i + ballsInLine)
                                ballsInLineIndexes3Times.push(i + ballsInLine * 2)
                            }
                    }

                    if(balls[i].texture === balls[i + ballsInLine]?.texture 
                        && balls[i].texture === balls[i - ballsInLine]?.texture) {
                                ballsInLineIndexes3Times.push(i)
                                ballsInLineIndexes3Times.push(i + ballsInLine)
                                ballsInLineIndexes3Times.push(i - ballsInLine)
                    }
    
                    if(balls[i].texture === balls[i - 1]?.texture 
                        && balls[i].texture === balls[i - 2]?.texture
                        && diapasons[itemNumberLineNow]?.includes(i - 1)
                        && diapasons[itemNumberLineNow]?.includes(i - 2)) {
                            if(ballsInLineIndexes3Times.includes(i - 1)) {
                                ballsInLineIndexes3Times.push(i)
                            } else {
                                ballsInLineIndexes3Times.push(i)
                                ballsInLineIndexes3Times.push(i - 1)
                                ballsInLineIndexes3Times.push(i - 2)
                            }
                    }
    
                    if(balls[i].texture === balls[i + 1]?.texture 
                        && balls[i].texture === balls[i + 2]?.texture
                        && diapasons[itemNumberLineNow]?.includes(i + 1)
                        && diapasons[itemNumberLineNow]?.includes(i + 2)) {
                            if(ballsInLineIndexes3Times.includes(i + 1)) {
                                ballsInLineIndexes3Times.push(i)
                            } else {
                                ballsInLineIndexes3Times.push(i)
                                ballsInLineIndexes3Times.push(i + 1)
                                ballsInLineIndexes3Times.push(i + 2)
                            }
                    }

                    if(balls[i].texture === balls[i - 1]?.texture 
                        && balls[i].texture === balls[i + 1]?.texture
                        && diapasons[itemNumberLineNow]?.includes(i - 1)
                        && diapasons[itemNumberLineNow]?.includes(i + 1)) {
                            
                                ballsInLineIndexes3Times.push(i)
                                ballsInLineIndexes3Times.push(i - 1)
                                ballsInLineIndexes3Times.push(i + 1)
                    }
                }

                for(let i = 0; i < balls.length; i++) {
                    if(ballsInLineIndexes3Times.includes(i)) {
                        balls[i].texture = Texture.from(ballsAddresses[randomNumber()])
                    }
                }
            }
        }


        function setNumberDiapasonsInLine() {
            for(let i = 0; i < ballsInLine; i++){
                for(let y = 0; y < ballsInLine; y++) {
                    itemsNumbers.push(i * ballsInLine + y)
                }
                diapasons.push(itemsNumbers)
                itemsNumbers = []
            }
        }


        function randomNumber(): number {
            const randomNumber = Number(Math.floor(Math.random() * ballsAddresses.length))
            return randomNumber
        }

        function onClick(event: Event) {
            let clickedBallIndex: number = - 1
            const clickedBall: Object = event.currentTarget

            for(let i = 0; i < balls.length; i++) {
                if(clickedBall === balls[i]){
                    clickedBallIndex = i
                }
            }

            balls[clickedBallIndex].scale.set(1.2)
            clickedBallIndexes.push(clickedBallIndex)

            if(clickedBallIndexes.length === 2) {
                console.log('Try to change:', clickedBallIndexes);

                if (pairs.includes(`You can move ${clickedBallIndexes[0]} to ${clickedBallIndexes[1]}`)
                    || pairs.includes(`You can move ${clickedBallIndexes[1]} to ${clickedBallIndexes[0]}`)) {
                    console.log('Change passed');
                    const firstBallTextureCache = balls[clickedBallIndexes[0]].texture

                    balls[clickedBallIndexes[0]].texture = balls[clickedBallIndexes[1]].texture
                    balls[clickedBallIndexes[1]].texture = firstBallTextureCache

                    balls[clickedBallIndexes[0]].scale.set(1)
                    balls[clickedBallIndexes[1]].scale.set(1)


                } else {
                    console.log(`Can't change`);
                    balls[clickedBallIndexes[0]].scale.set(1)
                    balls[clickedBallIndexes[1]].scale.set(1)
                    arrayActiveIndexes = []
                }

    
                arrayActiveIndexes.push(clickedBallIndexes[0])
                arrayActiveIndexes.push(clickedBallIndexes[1])
                
                setMore2BallsInLine(arrayActiveIndexes)
                
                count += ballsInLineIndexes3Times.length
                document.querySelector('#count').innerHTML = `${count}`
                console.log('Count:' + count);
    
                clickedBallIndexes = []
                arrayActiveIndexes = []

                if(doWeHaveOptions() === false) {
                    console.log('RE-CREATION!');
                    for(let i = 0; i < balls.length; i++) {
                            balls[i].texture = Texture.from(ballsAddresses[randomNumber()])
                    }
                    setTimeout(() => {
                        if(doWeHaveOptions() === false) {
                            console.log('RE-CREATION!');
                            for(let i = 0; i < balls.length; i++) {
                                    balls[i].texture = Texture.from(ballsAddresses[randomNumber()])
                            }
                            doWeHaveOptions()
                        }
                    }, 100)
                    for(let i = 0; i < balls.length; i++) {
                        setMore2BallsInLine([i])
                    }
                }
            }
        }
        

        function createOneBall(position = { x: 0, y: 0 }, anchor = { x: 0.5, y: 0.5 }): Sprite {
            ball = Sprite.from(ballsAddresses[randomNumber()])
            ball.position.copyFrom(position)
            ball.anchor.copyFrom(anchor)
            ball.interactive = true;
            ball.cursor = 'pointer'
            ball.on('pointerdown', onClick)
            return ball
        }

        
        function createBallsString(): Array<Sprite> {
            ballsLine = []
            for(let i = 0; i < ballsInLine; i++) {
                ballsLine.push(createOneBall({x: positionX, y: positionY}))
                positionX += correction
            }
            return ballsLine
        }


        function createBallsSquare(): Array<Sprite> {
            for(let i = 0; i < ballsInLine; i++) {
                createBallsString()
                balls.push(...ballsLine)
                positionY += correction
                positionX = positionXStatic + x
            }
            console.log('Creation balls');
            return balls
        }

        
        let timer = setInterval(() => {
                document.querySelector("#timer").innerHTML = minute + ":" + sec;
                if (sec <= 9) {
                    document.querySelector("#timer").innerHTML = minute + ":0" + sec;
                }
                if (sec == 0) {
                    clearInterval(timer)
                    this.removeChild(...balls)
                    document.querySelector(".count").classList.add('big-score')
                }
                sec--;
            }, 1000)
        
        
        this.addChild(...balls)
    }
    
    // Events >>------------------------------------------------------------<<<<

    // Private >>-----------------------------------------------------------<<<<
}
