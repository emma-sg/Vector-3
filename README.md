Vector 3
========

Adaptation the [original game](https://web.archive.org/web/20131115042508/http://playthisthing.com/vector-3) by Greg Costikyan. More information can be found in the `PDFs` folder.
Coded by [@EdenSG](https://github.com/EdenSG), [@TheMacMini09](https://github.com/TheMacMini09) and [@1sadtrombone](https://github.com/1sadtrombone), AKA **[Team Hatzors!](https://github.com/koding/global.hackathon/blob/master/Teams/Hatzors/ABOUT.md)** for the [Koding Hackathon](https://koding.com/Hackathon).

This is in no way a finished product, but it's part of what could eventually become a fully-fledged HTML5 multiplayer educational game. An explanation of what you see will follow:

- the game is meant for multiple players (there's no point in playing it without an opponent or seven)
- A lot of things don't work at the moment (most, actually). You can likely see what we were aiming for, but it didn't get finished.
- **The display**: the two grids you see are the XY and XZ grids, where ships are positioned. The red square moves with the grid, showing how the grid doesn't actually move more than the size of one grid square. The blue square shows the movement of a spaceship on the grid.

### What we hope to do with this:

- Have players place ship(s) initially
  + Figure out what indicator to use to represent spaceships
  + Have players place ships in 3D space according to ruled from PDF
- Figure out how rest of game play will be presented
- This is just the Leaning Scenario - add options for other game types
- Sound and music
- Add extra game features: 
  + Planets (with gravity that you have to account for)
  + Fuel (maybe you can refuel on planets - a use for Cargo pods)
  + More resource management
  + Orientation in 3D (maybe you have to be facing in the right direction to fire in that direction)
- HTML5 local storage (store a game until needed again)
- NodeJS for local storage (save games in files)
- Multiplayer modes (with NodeJS — players can run a game on their LAN or with port forwarding anywhere online)
- Play online ([together.js](https://togetherjs.com/) might sort of do what we want, or maybe we can write our own backend)
- Colours for each player:
  + distribute the number of players around the hue wheel (for identification of ships, etc.)
- More dimensions! Figure out a good way to display four dimensions on a 2D screen (not easy...)
- Incorporate "cheats" into the game through the JS console
- Insert educational lessons on probability, multi-dimensional space, Newtonian movement, etc.
  
Other ideas? Leave a note in the wiki! 
