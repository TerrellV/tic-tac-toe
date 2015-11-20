# tic-tac-toe

####[View Live App](http://mirprest.github.io/tic-tac-toe/)

This was built with React and utalizes the Flux Pattern.

###Game Difficulty Logic Explained

####Easy:
After the user picks a box, the computer reviews each open board spot and picks a random one.

####Regular:
- The computer will review the board and look for the winning move.
- Next the computer will review the board and look for the defensive move to stop user from getting 3 in a row.

####Impossible:
- The user can not win. The user can only cause a tie.
- The computer has the same logic as regular except if those two scenarios don't apply it will make the necessary move based on the board layout. 

####[View Live App](http://mirprest.github.io/tic-tac-toe/)
