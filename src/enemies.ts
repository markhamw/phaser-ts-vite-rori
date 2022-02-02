

import Phaser from "phaser";

export interface EnemyType {
    enemydata: IEnemyData;
}


declare global {
    namespace Phaser.GameObjects {
        interface GameObjectFactory {
            unit(x: number, y: number, texture: string, enemydata: IEnemyData, frame?: string | number): Unit;
        }
    }
}

export default class Unit
    extends Phaser.Physics.Arcade.Sprite implements EnemyType {
    facing = 8;
    enemydata: IEnemyData;
    hit: number = 0;
    inBattle: boolean = false;
    roam?: boolean;
    startingX: number;
    startingY: number;
    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
        texture: string,
        data: IEnemyData,
        frame?: string | number,
    ) {
        super(scene, x, y, texture, frame);
        this.enemydata = data
 
        this.startingX = x;
        this.startingY = y;

        InitAnims(this)
        CollideWithOverWorldAndPlayer(this, this.scene);
        this.setInteractive();
        this.play(this.enemydata!.IdleAnimKey);

    }
    Move() {
        if (Phaser.Math.FloorTo(Phaser.Math.Distance.Between(this.x, this.y, this.startingX, this.startingY)) > 50) {
            this.setVelocity(0);

        }

        let chanceForIdle = Phaser.Math.Between(0, 4);
        if (chanceForIdle == 1 || 2 || 3) {
            this.facing = 8;
            //  Stop(this.scene, this)
            this.play(this.enemydata!.IdleAnimKey);
        } else {
            this.facing = Phaser.Math.Between(0, 7);
            this.enemydata!.speed = Phaser.Math.Between(4, 5);
        }
    }


    /*     handleCollision(
            go: Phaser.GameObjects.GameObject,
            tile: Phaser.Tilemaps.Tile
        ) {
            Stop(this, go)
    
        } */

    /*     handleCollisionWithSprite(
            unit: Phaser.GameObjects.GameObject,
            obj2: Phaser.GameObjects.GameObject
        ) {
            console.log("emitting hit event")
            this.scene.events.emit('enemy-collision', this, obj2);
            console.log(this, obj2)
        } */

    preload() {
        this.scene.load.atlas(this.enemydata!.name, this.enemydata!.PathToPNG, this.enemydata!.PathToJSON)
    }

    create() {
        this.scene.time.addEvent({
            delay: Phaser.Math.Between(4000, 7000),
            callback: () => {
                this.Move()
            },
            repeat: -1,
        });
    }

    decideMovement() {

        switch (this.facing) {
            case Direction.UP:
                this.setVelocity(0, -this.enemydata!.speed)
                AnimatedEnemyWalk(this)
                break
            case Direction.DOWN:
                this.setVelocity(0, this.enemydata!.speed)
                AnimatedEnemyWalk(this)
                break
            case Direction.LEFT:
                this.setVelocity(-this.enemydata!.speed, 0)
                AnimatedEnemyWalk(this)
                this.flipX = true;
                break
            case Direction.RIGHT:
                this.setVelocity(this.enemydata!.speed, 0)
                AnimatedEnemyWalk(this)
                break
            case Direction.LEFTANDUP:
                this.setVelocity(-this.enemydata!.speed, -this.enemydata!.speed)
                AnimatedEnemyWalk(this)
                this.flipX = true;
                break
            case Direction.LEFTANDDOWN:
                this.setVelocity(-this.enemydata!.speed, this.enemydata!.speed)
                AnimatedEnemyWalk(this)
                this.flipX = true;
                break
            case Direction.RIGHTANDUP:
                this.setVelocity(this.enemydata!.speed, -this.enemydata!.speed)
                AnimatedEnemyWalk(this)
                break
            case Direction.RIGHTANDDOWN:
                this.setVelocity(this.enemydata!.speed, this.enemydata!.speed)
                AnimatedEnemyWalk(this)
                break
            case Direction.IDLE:
                this.setVelocity(0, 0)
                //1 to 50 because its using delta time
                let chanceforIdleAnim = Phaser.Math.Between(0, 200);
                if (chanceforIdleAnim == 1) {
                    AnimatedEnemyIdle(this);
                } else {
                    if (chanceforIdleAnim > 0 && chanceforIdleAnim < 15) {
                        this.facing = Phaser.Math.Between(0, 7);
                        this.enemydata!.speed = Phaser.Math.Between(0, 1);
                    }

                }

                break
        }
    }
    distanceFrom(obj: Phaser.GameObjects.Sprite): number {
        return Phaser.Math.FloorTo(Phaser.Math.Distance.Between(this.x, this.y, obj.x, obj.y))
    }
    preUpdate(t: number, dt: number) {
        this.flipX = false;
        super.preUpdate(t, dt);

        if (this.hit > 0) {
            console.log('being hit')
            ++this.hit;
            if (this.hit > 8) {
                this.hit = 0;
            }
            return
        } else {
            if (this.active) {
                if (this.roam) {
                    this.decideMovement();
                }

            }
        }


    }
}


Phaser.GameObjects.GameObjectFactory.register(
    "unit",
    function (this: Phaser.GameObjects.GameObjectFactory, x: number, y: number, texture: string, enemydata: IEnemyData, frame?: string | number) {
        var sprite = new Unit(this.scene as any, x, y, texture, enemydata, frame);

        this.displayList.add(sprite);
        this.updateList.add(sprite);
        this.scene.physics.world.enableBody(sprite, Phaser.Physics.Arcade.DYNAMIC_BODY);

        return sprite;
    }
);

/* this.scene.events.addListener('player-clicked-fight', () => {
    this.scene.events.emit('player-killed-rat', this)
    this.scene.sound.add('ratsound', { volume: 0.1, detune: Phaser.Math.Between(-500, -1200) }).play()
    this.isAlive = false;
    this.anims.play({ key: 'enemy-rat-dead', frameRate: 3, repeat: 0, delay: 1 })
}) */

export type IEnemyData = {
    name: string;
    descriptiveName: string;
    speed: number;
    SpriteAtlasKey: string;
    IconPng: string;
    PathToPNG: string;
    PathToJSON: string;
    JsonPrefixIdle: string;
    JsonPrefixWalk: string;
    JsonPrefixAttack: string;
    JsonPrefixHit: string;
    JsonPrefixDeath: string;
    IdleAnimKey: string;
    WalkAnimKey: string;
    HitAnimKey: string;
    AttackAnimKey: string;
    DeathAnimKey: string;
    PlayerInteractionLines?: string[];
    ResponseToPlayerLines?: string[];
}

export const enemies: IEnemyData[] = [
    {
        name: "enemy-titan",
        PathToPNG: "enemies/titan.png",
        PathToJSON: "enemies/titan.json",
        IconPng: "IconTitan.png",
        descriptiveName: "Titan",
        speed: Phaser.Math.Between(1, 5),
        SpriteAtlasKey: "enemy-titan",
        JsonPrefixIdle: "TitanIdle",
        JsonPrefixWalk: "TitanWalk",
        JsonPrefixAttack: "TitanAttack",
        JsonPrefixHit: "TileHit",
        JsonPrefixDeath: "TitanDeath",
        IdleAnimKey: "enemy-titan-idle",
        WalkAnimKey: "enemy-titan-walk",
        HitAnimKey: "enemy-titan-hit",
        AttackAnimKey: "enemy-titan-attack",
        DeathAnimKey: "enemy-titan-death",
        PlayerInteractionLines: ["It's a Titan-like. Theyre descendants of the first ones", "Thats a Titan. Bad at titaning blah blah"],
        ResponseToPlayerLines: ["Hmmrrrff", "Urrnkk", "Dink"]
    },
    {
        name: "enemy-golem",
        PathToPNG: "enemies/golem.png",
        PathToJSON: "enemies/golem.json",
        IconPng: "IconGolem.png",
        descriptiveName: "Golem",
        speed: Phaser.Math.Between(1, 5),
        JsonPrefixIdle: "GolemIdle",
        JsonPrefixWalk: "GolemWalk",
        JsonPrefixAttack: "GolemAttack",
        JsonPrefixHit: "GolemHit",
        JsonPrefixDeath: "GolemDeath",
        SpriteAtlasKey: "enemy-golem",
        IdleAnimKey: "enemy-golem-idle",
        WalkAnimKey: "enemy-golem-walk",
        HitAnimKey: "enemy-golem-hit",
        AttackAnimKey: "enemy-golem-attack",
        DeathAnimKey: "enemy-golem-death",
        PlayerInteractionLines: ["Golems are the best", "Golems are the worst", "Golems are the bestest"],
        ResponseToPlayerLines: ["*stern look*", "*rock eyebrow raises*", "I dont want to fight you fleshling"]

    },
    {
        name: "enemy-groklin",
        descriptiveName: "Groklin",
        speed: Phaser.Math.Between(0, 5),
        IconPng: "IconGremlin.png",
        PathToPNG: "enemies/groklin.png",
        PathToJSON: "enemies/groklin.json",
        JsonPrefixIdle: "GremlinIdle",
        JsonPrefixWalk: "GremlinWalk",
        JsonPrefixAttack: "GremlinAttack",
        JsonPrefixHit: "GremlinHit",
        JsonPrefixDeath: "GremlinDeath",
        SpriteAtlasKey: "enemy-groklin",
        IdleAnimKey: "enemy-groklin-idle",
        WalkAnimKey: "enemy-groklin-walk",
        HitAnimKey: "enemy-groklin-hit",
        AttackAnimKey: "enemy-groklin-attack",
        DeathAnimKey: "enemy-groklin-death",
        PlayerInteractionLines: ["Groklins are not my fave", "Groklins are the worst", "Its a Groklin", "A typical Groklin"],
        ResponseToPlayerLines: ["Gods damn you!", "Be damned to the wastes", "I dont even like you a little bit"]
    },
    {
        name: "enemy-skeleton",
        descriptiveName: "Skeleton",
        speed: Phaser.Math.Between(1, 1),
        IconPng: "IconSkeleton.png",
        PathToPNG: "enemies/skeleton.png",
        PathToJSON: "enemies/skeleton.json",
        JsonPrefixIdle: "SkeletonIdle",
        JsonPrefixWalk: "SkeletonWalk",
        JsonPrefixAttack: "SkeletonAttack",
        JsonPrefixHit: "SkeletonHit",
        JsonPrefixDeath: "SkeletonDeath",
        SpriteAtlasKey: "enemy-skeleton",
        IdleAnimKey: "enemy-skeleton-idle",
        WalkAnimKey: "enemy-skeleton-walk",
        HitAnimKey: "enemy-skeleton-hit",
        AttackAnimKey: "enemy-skeleton-attack",
        DeathAnimKey: "enemy-skeleton-death",
        PlayerInteractionLines: ["Mr skellington I presume", "Living Bones", "Its a Skeleton"],
        ResponseToPlayerLines: ["*no eye stare*", "*bones rattle*", "*clattering teeth*"]

    },
    {
        name: "enemy-efreet",
        descriptiveName: "Efreet",
        speed: Phaser.Math.Between(1, 1),
        IconPng: "IconEfreet.png",
        PathToPNG: "enemies/efreet.png",
        PathToJSON: "enemies/efreet.json",
        JsonPrefixIdle: "EfreetIdle",
        JsonPrefixWalk: "EfreetWalk",
        JsonPrefixAttack: "EfreetAttack",
        JsonPrefixHit: "EfreetHit",
        JsonPrefixDeath: "EfreetDeath",
        SpriteAtlasKey: "enemy-efreet",
        IdleAnimKey: "enemy-efreet-idle",
        WalkAnimKey: "enemy-efreet-walk",
        HitAnimKey: "enemy-efreet-hit",
        AttackAnimKey: "enemy-efreet-attack",
        DeathAnimKey: "enemy-efreet-death",
        PlayerInteractionLines: ["Efreet are the best", "Efreet are the worst", "Its a Efreet", "A typical Efreet"],
        ResponseToPlayerLines: ["*red eye stare*", "Im burning a short wick, buddy", "The only furniture I can use is stone or obsidian. How dare you insinuate that"]

    },
    {
        name: "enemy-centaur",
        descriptiveName: "Centaur",
        speed: Phaser.Math.Between(1, 1),
        IconPng: "IconCentaur.png",
        PathToPNG: "enemies/centaur.png",
        PathToJSON: "enemies/centaur.json",
        JsonPrefixIdle: "CentaurIdle",
        JsonPrefixWalk: "CentaurWalk",
        JsonPrefixAttack: "CentaurAttack",
        JsonPrefixHit: "CentaurHit",
        JsonPrefixDeath: "CentaurDeath",
        SpriteAtlasKey: "enemy-centaur",
        IdleAnimKey: "enemy-centaur-idle",
        WalkAnimKey: "enemy-centaur-walk",
        HitAnimKey: "enemy-centaur-hit",
        AttackAnimKey: "enemy-centaur-attack",
        DeathAnimKey: "enemy-centaur-death",
        PlayerInteractionLines: ["Thats a four legged humanoid", "Centaurs are four legged assholes", "Its a Centaur", "A typical Centaur. Smug and goes clop clop"],
        ResponseToPlayerLines: ["*clop clop clop* Hahaha", "Youre two legs arent as good as one of mine, human. Hmf.", "Get behind me and see what happens. Youll be eating hoof"]
    },
    {
        name: "enemy-monk",
        descriptiveName: "Monk",
        speed: Phaser.Math.Between(2, 3),
        IconPng: "IconMonk.png",
        PathToPNG: "enemies/monk.png",
        PathToJSON: "enemies/monk.json",
        JsonPrefixIdle: "MonkIdle",
        JsonPrefixWalk: "MonkWalk",
        JsonPrefixAttack: "MonkAttack",
        JsonPrefixHit: "MonkHit",
        JsonPrefixDeath: "MonkDeath",
        SpriteAtlasKey: "enemy-monk",
        IdleAnimKey: "enemy-monk-idle",
        WalkAnimKey: "enemy-monk-walk",
        HitAnimKey: "enemy-monk-hit",
        AttackAnimKey: "enemy-monk-attack",
        DeathAnimKey: "enemy-monk-death",
        PlayerInteractionLines: ["Monks are the best", "Monks are the worst", "Its a Monk", "A typical Monk"],
        ResponseToPlayerLines: ["I agree", "Yes, yes, yes....", "I dont know what to say"]
    },
    {
        name: "enemy-pitfiend",
        descriptiveName: "PitFiend",
        speed: Phaser.Math.Between(2, 3),
        IconPng: "IconPitFiend.png",
        PathToPNG: "enemies/pitfiend.png",
        PathToJSON: "enemies/pitfiend.json",
        JsonPrefixIdle: "PitFiendIdle",
        JsonPrefixWalk: "PitFiendWalk",
        JsonPrefixAttack: "PitFiendAttack",
        JsonPrefixHit: "PitFiendHit",
        JsonPrefixDeath: "PitFiendDeath",
        SpriteAtlasKey: "enemy-pitfiend",
        IdleAnimKey: "enemy-pitfiend-idle",
        WalkAnimKey: "enemy-pitfiend-walk",
        HitAnimKey: "enemy-pitfiend-hit",
        AttackAnimKey: "enemy-pitfiend-attack",
        DeathAnimKey: "enemy-pitfiend-death",
        PlayerInteractionLines: ["Pitfiends are the best", "Pitfiends are the worst", "Its a Pitfiend", "A typical Pitfiend"],
        ResponseToPlayerLines: ["You will not pass by", "I look very scary but I think I could try to make friends. Be my friend and you can pass", "I dont know what to say except turn back, turn back now"]
    },
    {
        name: "enemy-ghost",
        descriptiveName: "Ghost",
        speed: Phaser.Math.Between(2, 3),
        IconPng: "IconGhost.png",
        PathToPNG: "enemies/ghost.png",
        PathToJSON: "enemies/ghost.json",
        JsonPrefixIdle: "GhostIdle",
        JsonPrefixWalk: "GhostWalk",
        JsonPrefixAttack: "GhostAttack",
        JsonPrefixHit: "GhostHit",
        JsonPrefixDeath: "GhostDeath",
        SpriteAtlasKey: "enemy-ghost",
        IdleAnimKey: "enemy-ghost-idle",
        WalkAnimKey: "enemy-ghost-walk",
        HitAnimKey: "enemy-ghost-hit",
        AttackAnimKey: "enemy-ghost-attack",
        DeathAnimKey: "enemy-ghost-death",
        PlayerInteractionLines: ["A living dead", "an Echo of the dead", "Its a ghost, stay alert", "Its a dangerous aparation"],
        ResponseToPlayerLines: ["You can run but Ill find you", "Dont be surprised but ima to kill you", "GTFO!"]
    },
    {
        name: "enemy-deer",
        descriptiveName: "Deer",
        speed: Phaser.Math.Between(5, 9),
        IconPng: "IconDeer.png",
        PathToPNG: "enemies/deer.png",
        PathToJSON: "enemies/deer.json",
        JsonPrefixIdle: "DeerIdle",
        JsonPrefixWalk: "DeerWalk",
        JsonPrefixAttack: "DeerAttack",
        JsonPrefixHit: "DeerHit",
        JsonPrefixDeath: "DeerDeath",
        SpriteAtlasKey: "enemy-deer",
        IdleAnimKey: "enemy-deer-idle",
        WalkAnimKey: "enemy-deer-walk",
        HitAnimKey: "enemy-deer-hit",
        AttackAnimKey: "enemy-deer-attack",
        DeathAnimKey: "enemy-deer-death",
        PlayerInteractionLines: ["Oh deer", "Hi my deer", "Its a deer", "A typical deer"],
    },
    {
        name: "enemy-pixie",
        descriptiveName: "Pixie",
        speed: Phaser.Math.Between(5, 9),
        IconPng: "IconPixie.png",
        PathToPNG: "enemies/pixie.png",
        PathToJSON: "enemies/pixie.json",
        JsonPrefixIdle: "PixieIdle",
        JsonPrefixWalk: "PixieWalk",
        JsonPrefixAttack: "PixieAttack",
        JsonPrefixHit: "PixieHit",
        JsonPrefixDeath: "PixieDeath",
        SpriteAtlasKey: "enemy-pixie",
        IdleAnimKey: "enemy-pixie-idle",
        WalkAnimKey: "enemy-pixie-walk",
        HitAnimKey: "enemy-pixie-hit",
        AttackAnimKey: "enemy-pixie-attack",
        DeathAnimKey: "enemy-pixie-death",
        PlayerInteractionLines: ["Oh it LOOKS innocent", "leaving it alone", "Its a pixie", "A typical pixie"],
    },
    {
        name: "enemy-spider",
        descriptiveName: "Spider",
        speed: Phaser.Math.Between(5, 9),
        IconPng: "IconSpider.png",
        PathToPNG: "enemies/spider.png",
        PathToJSON: "enemies/spider.json",
        JsonPrefixIdle: "SpiderIdle",
        JsonPrefixWalk: "SpiderWalk",
        JsonPrefixAttack: "SpiderAttack",
        JsonPrefixHit: "SpiderHit",
        JsonPrefixDeath: "SpiderDeath",
        SpriteAtlasKey: "enemy-spider",
        IdleAnimKey: "enemy-spider-idle",
        WalkAnimKey: "enemy-spider-walk",
        HitAnimKey: "enemy-spider-hit",
        AttackAnimKey: "enemy-spider-attack",
        DeathAnimKey: "enemy-spider-death",
        PlayerInteractionLines: ["I dont think so", "Nooope", "MmmMmm *shakes head*", "A typical spider. Bye felicia!"],
    },
    {
        name: "enemy-naga",
        descriptiveName: "Naga",
        speed: Phaser.Math.Between(5, 9),
        IconPng: "IconNaga.png",
        PathToPNG: "enemies/naga.png",
        PathToJSON: "enemies/naga.json",
        JsonPrefixIdle: "NagaIdle",
        JsonPrefixWalk: "NagaWalk",
        JsonPrefixAttack: "NagaAttack",
        JsonPrefixHit: "NagaHit",
        JsonPrefixDeath: "NagaDeath",
        SpriteAtlasKey: "enemy-naga",
        IdleAnimKey: "enemy-naga-idle",
        WalkAnimKey: "enemy-naga-walk",
        HitAnimKey: "enemy-naga-hit",
        AttackAnimKey: "enemy-naga-attack",
        DeathAnimKey: "enemy-naga-death",
        PlayerInteractionLines: ["Wanda?", "Im naga do it..nope", "Nah...ga", "Ok thats a naga", "A typical naga"],
    },
    {
        name: "enemy-troll",
        descriptiveName: "Troll",
        speed: Phaser.Math.Between(5, 9),
        IconPng: "IconTroll.png",
        PathToPNG: "enemies/troll.png",
        PathToJSON: "enemies/troll.json",
        JsonPrefixIdle: "TrollIdle",
        JsonPrefixWalk: "TrollWalk",
        JsonPrefixAttack: "TrollAttack",
        JsonPrefixHit: "TrollHit",
        JsonPrefixDeath: "TrollDeath",
        SpriteAtlasKey: "enemy-troll",
        IdleAnimKey: "enemy-troll-idle",
        WalkAnimKey: "enemy-troll-walk",
        HitAnimKey: "enemy-troll-hit",
        AttackAnimKey: "enemy-troll-attack",
        DeathAnimKey: "enemy-troll-death",
        PlayerInteractionLines: ["Okay? Okay. You dont speak much", "", "Ok thats a troll.", "A typical troll"],
    },
    {
        name: "enemy-treant",
        descriptiveName: "Treant",
        speed: Phaser.Math.Between(5, 9),
        IconPng: "IconTreant.png",
        PathToPNG: "enemies/treant.png",
        PathToJSON: "enemies/treant.json",
        JsonPrefixIdle: "TreantIdle",
        JsonPrefixWalk: "TreantWalk",
        JsonPrefixAttack: "TreantAttack",
        JsonPrefixHit: "TreantHit",
        JsonPrefixDeath: "TreantDeath",
        SpriteAtlasKey: "enemy-treant",
        IdleAnimKey: "enemy-treant-idle",
        WalkAnimKey: "enemy-treant-walk",
        HitAnimKey: "enemy-treant-hit",
        AttackAnimKey: "enemy-treant-attack",
        DeathAnimKey: "enemy-treant-death",
        PlayerInteractionLines: ["Treefolk do not exist", "Pretty good special effects now eff off", "Thats a moving obviously sentient sandlewood tree person, and its sassy looking", "A typical treant"],
    },
    {
        name: "enemy-lich",
        descriptiveName: "Lich",
        speed: Phaser.Math.Between(5, 9),
        IconPng: "IconLich.png",
        PathToPNG: "enemies/lich.png",
        PathToJSON: "enemies/lich.json",
        JsonPrefixIdle: "LichIdle",
        JsonPrefixWalk: "LichWalk",
        JsonPrefixAttack: "LichAttack",
        JsonPrefixHit: "LichHit",
        JsonPrefixDeath: "LichDeath",
        SpriteAtlasKey: "enemy-lich",
        IdleAnimKey: "enemy-lich-idle",
        WalkAnimKey: "enemy-lich-walk",
        HitAnimKey: "enemy-lich-hit",
        AttackAnimKey: "enemy-lich-attack",
        DeathAnimKey: "enemy-lich-death",
        PlayerInteractionLines: ["reallly?", "a typical lich", "I dont think so", "Nope", "Nope", "Nope"],
    },
    {
        name: "enemy-zombie",
        descriptiveName: "Zombie",
        speed: Phaser.Math.Between(5, 9),
        IconPng: "IconZombie.png",
        PathToPNG: "enemies/zombie.png",
        PathToJSON: "enemies/zombie.json",
        JsonPrefixIdle: "ZombieIdle",
        JsonPrefixWalk: "ZombieWalk",
        JsonPrefixAttack: "ZombieAttack",
        JsonPrefixHit: "ZombieHit",
        JsonPrefixDeath: "ZombieDeath",
        SpriteAtlasKey: "enemy-zombie",
        IdleAnimKey: "enemy-zombie-idle",
        WalkAnimKey: "enemy-zombie-walk",
        HitAnimKey: "enemy-zombie-hit",
        AttackAnimKey: "enemy-zombie-attack",
        DeathAnimKey: "enemy-zombie-death",
        PlayerInteractionLines: ["Rotter", "Not very dangerous..but in numbers",],
    }
];
/* {
   name: "enemy-djinn",
   PathToPNG: "enemies/djinn.png",
   PathToJSON: "enemies/djinn.json"
 },
 {
   name: "enemy-gargoyle",
   PathToPNG: "enemies/gargoyle.png",
   PathToJSON: "enemies/gargoyle.json"
 }, */

/* {
  name: "enemy-mage",
  PathToPNG: "enemies/mage.png",
  PathToJSON: "enemies/mage.json"
}, */
/*  ,
  {
    name: "enemy-harpy",
    PathToPNG: "enemies/harpy.png",
    PathToJSON: "enemies/harpy.json"
  },
  {
    name: "enemy-shamanb",
    PathToPNG: "enemies/shamanb.png",
    PathToJSON: "enemies/shamanB.json"
  },
  {
    name: "enemy-cyclops",
    PathToPNG: "enemies/cyclops.png",
    PathToJSON: "enemies/cyclops.json"
  },
  {
    name: "enemy-centaur",
    PathToPNG: "enemies/centaur.png",
    PathToJSON: "enemies/centaur.json"
  },
  {
    name: "enemy-wolfrider",
    PathToPNG: "enemies/wolfrider.png",
    PathToJSON: "enemies/wolfrider.json"
  } ,
  {
    name: "enemy-druid",
    PathToPNG: "enemies/druid.png",
    PathToJSON: "enemies/druid.json"
  },
  {
    name: "enemy-dwarf",
    PathToPNG: "enemies/dwarf.png",
    PathToJSON: "enemies/dwarf.json"
  },
  {
    name: "enemy-hunter",
    PathToPNG: "enemies/hunter.png",
    PathToJSON: "enemies/hunter.json"
  },
  {
    name: "enemy-pixie",
    PathToPNG: "enemies/pixie.png",
    PathToJSON: "enemies/pixie.json"
  },
  {
    name: "enemy-satyr",
    PathToPNG: "enemies/satyr.png",
    PathToJSON: "enemies/satyr.json"
  },
  
  {
    name: "enemy-bknight",
    PathToPNG: "enemies/bknight.png",
    PathToJSON: "enemies/bknight.json"
  },
  {
    name: "enemy-lich",
    PathToPNG: "enemies/lich.png",
    PathToJSON: "enemies/lich.json"
  },
  {
    name: "enemy-vampire",
    PathToPNG: "enemies/vampire.png",
    PathToJSON: "enemies/vampire.json"
  }, 
  {
    name: "enemy-demon",
    PathToPNG: "enemies/demon.png",
    PathToJSON: "enemies/demon.json"
  },
  {
    name: "enemy-devil",
    PathToPNG: "enemies/devil.png",
    PathToJSON: "enemies/devil.json"
  },
  {
    name: "enemy-efreet",
    PathToPNG: "enemies/efreet.png",
    PathToJSON: "enemies/efreet.json"
  },
  {
    name: "enemy-gog",
    PathToPNG: "enemies/gog.png",
    PathToJSON: "enemies/gog.json"
  },
  {
    name: "enemy-hellhound",
    PathToPNG: "enemies/hellhound.png",
    PathToJSON: "enemies/hellhound.json"
  },
  {
    name: "enemy-imp",
    PathToPNG: "enemies/imp.png",
    PathToJSON: "enemies/imp.json"
  },
  {
    name: "enemy-pitfiend",
    PathToPNG: "enemies/pitfiend.png",
    PathToJSON: "enemies/pitfiend.json"
  },
  {
    name: "enemy-archer",
    PathToPNG: "enemies/archer.png",
    PathToJSON: "enemies/archer.json"
  },
  {
    name: "enemy-cavalier",
    PathToPNG: "enemies/cavalier.png",
    PathToJSON: "enemies/cavalier.json"
  },
  {
    name: "enemy-griffin",
    PathToPNG: "enemies/griffin.png",
    PathToJSON: "enemies/griffin.json"
  },
  {
    name: "enemy-monk",
    PathToPNG: "enemies/monk.png",
    PathToJSON: "enemies/monk.json"
  },
  {
    name: "enemy-paladin",
    PathToPNG: "enemies/paladin.png",
    PathToJSON: "enemies/paladin.json"
  },
  {
    name: "enemy-pikeman",
    PathToPNG: "enemies/pikeman.png",
    PathToJSON: "enemies/pikeman.json"
  },
  {
    name: "enemy-swordsman",
    PathToPNG: "enemies/swordsman.png",
    PathToJSON: "enemies/swordsman.json"
  }, */


/* export function CreateEnemy(scene: any, enemy: string, x: number, y: number, scale?: number) {
    if (!scene.unitgroup) {
        scene.unitgroup = newEnemyGroup(scene, Unit, true, true);
    }
    let unit = scene.add.unit(x, y, enemy, GetEnemyDataByName(enemies, enemy));
    scene.unitgroup.add(unit)
    unit.setDepth(3);
    return unit;
} */

export interface AnimatedEnemy extends Phaser.Physics.Arcade.Sprite {
    IdleAnim(): void;
    WalkAnim(): void;
    AttackAnim(): void;
    HitAnim(): void;
    DeathAnim(): void;
}

export interface Collides extends Phaser.Physics.Arcade.Sprite {
    CollideWithOverWorldAndPlayer(): void;
/*     handleCollision(player: Player): void;
    handleCollisionWithSprite(sprite: Phaser.Physics.Arcade.Sprite): void; */
}

export const CollideWithOverWorldAndPlayer = (sprite: any, scene: any) => {
    sprite.scene.physics.add.collider(sprite, scene.baseLayer);
    sprite.scene.physics.add.collider(sprite, scene.decorLayer);
    sprite.scene.physics.add.collider(sprite, scene.decorLayer);
    if (scene.player != null && scene.player.active) {
        sprite.scene.physics.add.collider(sprite, scene.player);
    }
}


export const IdleAnim = (sprite: any) => {
    sprite.scene.anims.create({
        key: sprite.enemydata.IdleAnimKey,
        frames: sprite.anims.generateFrameNames(sprite.enemydata.SpriteAtlasKey, {
            start: 1,
            end: 4,
            prefix: sprite.enemydata.JsonPrefixIdle,
            suffix: ".png",
        }),
        repeat: 0,
        frameRate: 5,
    })
}

export const WalkAnim = (sprite: any) => {
    sprite.scene.anims.create({
        key: sprite.enemydata.WalkAnimKey,
        frames: sprite.anims.generateFrameNames(sprite.enemydata.SpriteAtlasKey, {
            start: 1,
            end: 4,
            prefix: sprite.enemydata.JsonPrefixWalk,
            suffix: ".png",
        }),
        repeat: -1,
        frameRate: 5,
    })
}

export const AttackAnim = (sprite: any) => {
    sprite.scene.anims.create({
        key: sprite.enemydata.AttackAnimKey,
        frames: sprite.anims.generateFrameNames(sprite.enemydata.SpriteAtlasKey, {
            start: 1,
            end: 4,
            prefix: sprite.enemydata.JsonPrefixAttack,
            suffix: ".png",
        }),
        repeat: -1,
        frameRate: 5,
    })
}

export const HitAnim = (sprite: any) => {
    sprite.scene.anims.create({
        key: sprite.enemydata.HitAnimKey,
        frames: sprite.anims.generateFrameNames(sprite.enemydata.SpriteAtlasKey, {
            start: 1,
            end: 4,
            prefix: sprite.enemydata.JsonPrefixHit,
            suffix: ".png",
        }),
        repeat: -1,
        frameRate: 3,
    })
}

export const DeathAnim = (sprite: any) => {
    sprite.scene.anims.create({
        key: sprite.enemydata.DeathAnimKey,
        frames: sprite.anims.generateFrameNames(sprite.enemydata.SpriteAtlasKey, {
            start: 1,
            end: 4,
            prefix: sprite.enemydata.JsonPrefixDeath,
            suffix: ".png",
        }),
        repeat: -1,
        frameRate: 3,
    })
}


export function AnimatedEnemyIdle(sprite: any) {
    sprite.anims.play(sprite.enemydata.IdleAnimKey, true);
}
export function AnimatedEnemyWalk(sprite: any) {
    sprite.anims.play(sprite.enemydata.WalkAnimKey, true);
}
export function AnimatedEnemyAttack(sprite: any) {
    sprite.anims.play(sprite.enemydata.AttackAnimKey, true);
}
export function AnimatedEnemyHit(sprite: any) {
    sprite.anims.play(sprite.enemydata.HitAnimKey, true);
}
export function AnimatedEnemyDeath(sprite: any) {
    sprite.anims.play(sprite.enemydata.DeathAnimKey, true);
}

export function InitAnims(sprite: any): void {
    IdleAnim(sprite);
    WalkAnim(sprite);
    AttackAnim(sprite);
    HitAnim(sprite);
    DeathAnim(sprite);
}


export const newEnemyGroup = (scene: Phaser.Scene, type: any, collides: boolean, collideWorldBounds: boolean) => {
    return scene.physics.add.group({
        classType: type,
        createCallback: (gameObject) => {
            const unit = gameObject as typeof type;
            unit.body.onCollide = collides;
        },
        collideWorldBounds: collideWorldBounds,
    });
}




