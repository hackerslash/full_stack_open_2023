class afridi {
    constructor(name,age){
        this.name=name;
        this.age=age;
    }

    greet(){
        console.log('Hi my name is '+ this.name);
    }
}

const afridi1= new afridi('afridi',22);
afridi1.greet();