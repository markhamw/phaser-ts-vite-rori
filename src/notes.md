- storing data

```
  const text = this.add.text(350, 270, '', { font: '16px Courier', fill: '#00ff00' });
        const gem = this.add.image(300, 300, 'gem');

        //  Store some data about this Gem:
        gem.setData('name', 'Red Gem Stone');
        gem.setData('level', 2);
        gem.setData('owner', 'Link');

        //  Whenever a data value is updated we call this function:
        gem.on('setdata', function (gameObject, key, value) {
            text.setText([
                'Name: ' + gem.getData('name'),
                'Level: ' + gem.getData('level'),
                'Value: ' + gem.getData('gold') + ' gold',
                'Owner: ' + gem.getData('owner')
            ]);
        });

        //  Set the value, this will emit the `setdata` event.
        gem.setData('gold', 50);

        //  Change the 'value' property when the mouse is clicked
        this.input.on('pointerdown', function () {
            gem.data.values.gold += 50;
            if (gem.data.values.gold % 200 === 0)
            {
                gem.data.values.level++;
            }
        });
    }
```

- fade camera

```

        this.tweens.add({
            targets: image,
            x: 100,
            ease: 'Sine.easeInOut',
            yoyo: true,
            repeat: -1,
            duration: 3000
        });

        this.cameras.main.once('camerafadeincomplete', function (camera) {
            camera.fadeOut(6000);
        });

        this.cameras.main.fadeIn(6000);
```

- minimap

```
https://phaser.io/examples/v3/view/camera/minimap-camera
```

-cam fricton

```
   .setFrictionAir(0.05)
```

# Premise

- Gameplay involves simple overworld view and action rpg combat in encounters. The player just needs to survive and gain score/gold. TBD 

- Player should be presented with an overworld that displays progress, sparks interest in areas of the world, provides a point to expand the game, can be navigated by the player, and allows the player to start encounters

- Encounters have combat and reward system exists in the form of completion screen, lots of sounds, progression of the player of some kind, 

- Player can go to the main NPC once the first quest is completed

# Overworld

- Displays a status , list of quests (locked and unlocked), at the top and objectives for the quest last clicked on
- Enemies for unlocked quests are not yet spawned on the map
- When a quest is completed tween occurs to move the camera and show the next encounter spawning in
- Player click on things currently to start encounteres

status 
- hp
- mp
- gold

# Encounters

- Player has a health pool for prototyping
- Swings a sword
- 4 direction movement

## Encounter battles

- Player fights and kills everything
- Score increases for speed
- Score increases with fewer enemy hits
- Score decreases with time to complete a little
- Encounter is completed if the player doesnt die
- ???????
