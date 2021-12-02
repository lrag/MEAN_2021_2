import { Injectable } from "@angular/core"
import { BehaviorSubject, Subject } from "rxjs"

@Injectable( { providedIn : 'root' })
export class Movida {

    private subject:Subject<number>
    private behaviorSubject:BehaviorSubject<number>

    private contador:number = 0

    constructor(){
        this.subject = new Subject()

        this.behaviorSubject = new BehaviorSubject(-50)

        setInterval(() => {
            console.log("disparando el evento:"+this.contador)
            this.subject.next(this.contador)
            this.behaviorSubject.next(this.contador)
            this.contador++
        },5000)

    }

    public getSubject():Subject<number>{
        return this.subject
    }

    public getBehaviorSubject():BehaviorSubject<number>{
        return this.behaviorSubject
    }

}