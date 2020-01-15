class Rules {

    constructor() {

        this.rules = []

        this.rules['notempty'] = v => !!v || 'Campo requerido';
        this.rules['filenotempty'] = v => !!v || 'Campo requerido';
        
    }

    getRule(name) {

        return this.rules[name];

    }

}

export default Rules