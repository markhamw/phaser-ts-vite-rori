
import Phaser from "phaser";


export type IOverworldEnemy = {
    SpriteAtlasKey: string;
    IconPng: string;
    descriptiveName: string;
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

export const enemies: IOverworldEnemy[] = [
    {

        PathToPNG: "assets/overworld/enemies/titan.png",
        PathToJSON: "assets/overworld/enemies/titan.json",
        IconPng: "IconTitan.png",
        descriptiveName: "Titan",

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

        PathToPNG: "assets/overworld/enemies/golem.png",
        PathToJSON: "assets/overworld/enemies/golem.json",
        IconPng: "IconGolem.png",
        descriptiveName: "Golem",

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

        descriptiveName: "Groklin",

        IconPng: "IconGremlin.png",
        PathToPNG: "assets/overworld/enemies/groklin.png",
        PathToJSON: "assets/overworld/enemies/groklin.json",
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

        descriptiveName: "Skeleton",

        IconPng: "IconSkeleton.png",
        PathToPNG: "assets/overworld/enemies/skeleton.png",
        PathToJSON: "assets/overworld/enemies/skeleton.json",
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

        descriptiveName: "Efreet",

        IconPng: "IconEfreet.png",
        PathToPNG: "assets/overworld/enemies/efreet.png",
        PathToJSON: "assets/overworld/enemies/efreet.json",
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

        descriptiveName: "Centaur",

        IconPng: "IconCentaur.png",
        PathToPNG: "assets/overworld/enemies/centaur.png",
        PathToJSON: "assets/overworld/enemies/centaur.json",
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
        SpriteAtlasKey: "enemy-monk",
        descriptiveName: "Monk",
        IconPng: "IconMonk.png",
        PathToPNG: "assets/overworld/enemies/monk.png",
        PathToJSON: "assets/overworld/enemies/monk.json",
        JsonPrefixIdle: "MonkIdle",
        JsonPrefixWalk: "MonkWalk",
        JsonPrefixAttack: "MonkAttack",
        JsonPrefixHit: "MonkHit",
        JsonPrefixDeath: "MonkDeath",
        IdleAnimKey: "enemy-monk-idle",
        WalkAnimKey: "enemy-monk-walk",
        HitAnimKey: "enemy-monk-hit",
        AttackAnimKey: "enemy-monk-attack",
        DeathAnimKey: "enemy-monk-death",
        PlayerInteractionLines: ["Monks are the best", "Monks are the worst", "Its a Monk", "A typical Monk"],
        ResponseToPlayerLines: ["I agree", "Yes, yes, yes....", "I dont know what to say"]
    },
    {

        descriptiveName: "PitFiend",

        IconPng: "IconPitFiend.png",
        PathToPNG: "assets/overworld/enemies/pitfiend.png",
        PathToJSON: "assets/overworld/enemies/pitfiend.json",
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

        descriptiveName: "Ghost",

        IconPng: "IconGhost.png",
        PathToPNG: "assets/overworld/enemies/ghost.png",
        PathToJSON: "assets/overworld/enemies/ghost.json",
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

        descriptiveName: "Deer",

        IconPng: "IconDeer.png",
        PathToPNG: "assets/overworld/enemies/deer.png",
        PathToJSON: "assets/overworld/enemies/deer.json",
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

        descriptiveName: "Pixie",

        IconPng: "IconPixie.png",
        PathToPNG: "assets/overworld/enemies/pixie.png",
        PathToJSON: "assets/overworld/enemies/pixie.json",
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

        descriptiveName: "Spider",

        IconPng: "IconSpider.png",
        PathToPNG: "assets/overworld/enemies/spider.png",
        PathToJSON: "assets/overworld/enemies/spider.json",
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

        descriptiveName: "Naga",

        IconPng: "IconNaga.png",
        PathToPNG: "assets/overworld/enemies/naga.png",
        PathToJSON: "assets/overworld/enemies/naga.json",
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

        descriptiveName: "Troll",

        IconPng: "IconTroll.png",
        PathToPNG: "assets/overworld/enemies/troll.png",
        PathToJSON: "assets/overworld/enemies/troll.json",
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

        descriptiveName: "Treant",

        IconPng: "IconTreant.png",
        PathToPNG: "assets/overworld/enemies/treant.png",
        PathToJSON: "assets/overworld/enemies/treant.json",
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

        descriptiveName: "Lich",

        IconPng: "IconLich.png",
        PathToPNG: "assets/overworld/enemies/lich.png",
        PathToJSON: "assets/overworld/enemies/lich.json",
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

        descriptiveName: "Zombie",

        IconPng: "IconZombie.png",
        PathToPNG: "assets/overworld/enemies/zombie.png",
        PathToJSON: "assets/overworld/enemies/zombie.json",
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


