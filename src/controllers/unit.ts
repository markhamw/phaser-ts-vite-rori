
interface StateConfig {
    name?: string;
    onEnter?: () => void
    onUpdate?: (dt: number) => void
    onExit?: () => void
}

export default class UnitActionsController {
    name: string
    context?: any
    states = new Map<string, StateConfig>()
    currentstate?: StateConfig;
    previousstate?: StateConfig;
    isSwitchingState: boolean = false;
    private stateQueue: string[] = [];

    constructor(context?: any, name?: string) {
        this.context = context
        this.name = name ?? 'default'
    }

    addState(name: string, config?: StateConfig) {

        const context = this.context

        this.states.set(name, {
            name,
            onEnter: config?.onEnter?.bind(context),
            onUpdate: config?.onUpdate?.bind(context),
            onExit: config?.onExit?.bind(context)
        })

        return this
    }

    isCurrentState(name: string) {
        if (!this.currentstate) {
            return false
        }
        return this.currentstate.name === name

    }
    setState(name: string) {
        if (!this.states.has(name)) {
            return
        }
        if (this.isSwitchingState) {
            this.stateQueue.push(name)
            return
        }
        this.isSwitchingState = true
        if (this.currentstate && this.currentstate.onExit) {
            this.currentstate.onExit?.()
        }
        this.previousstate = this.currentstate
        this.currentstate = this.states.get(name)!

        if (this.currentstate?.onEnter) {
            this.currentstate.onEnter()
        }

        this.isSwitchingState = false
        return this

    }

    
    update(dt: number) {

        if (this.stateQueue.length > 0) {
            this.setState(this.stateQueue.shift()!)
            return
        }
        if (this.currentstate && this.currentstate.onUpdate) {
            this.currentstate.onUpdate(dt)
        }

    }


}

