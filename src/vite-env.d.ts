/// <reference types="vite/client" />

declare namespace Phaser {
    interface Scene {
        firebase: import('./plugins/FirebasePlugin').default
    }
}


