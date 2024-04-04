# Shariki

Simple game with a lot of bugs :)

Deploy - [https://shariki.vercel.app/](https://shariki.vercel.app/)

## to start npm run dev

The goal of the game is to score as many points as possible within the allotted time.

On the main stage there is something in the form of a container filled with elements of the same shape (balls, rectangles, etc.).

The user has the ability to swap adjacent elements, only if, after changing positions, “burning” occurs.

If there are more than 2 elements of the same color vertically or horizontally, then the elements “burn out”, forming empty spaces, which must be filled with newly appeared random elements from above.

The game continues until the time runs out (if the user does not have the opportunity to "burn", the elements are mixed).

At the end of the game, you need to show the number of points scored and the time spent.
