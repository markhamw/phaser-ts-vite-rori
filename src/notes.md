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
   