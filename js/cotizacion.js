const planBasicoEng = document.getElementById('planBasicoEng');
const planProEng = document.getElementById('planProEng');
const cantColaboradores = document.getElementById('cantColaboradores');
const btnContacto = document.getElementById('contactar');
const shoppingCart = document.getElementById('shoppingCart');
const totalPrice = document.getElementById('totalPrice');
const totalPriceBasicEng = document.getElementById('totalPriceBasicEng');
const totalPriceProEng = document.getElementById('totalPriceProEng');
// shoppingCart elements
const ContainerPlanEngSelected = document.getElementById('ContainerPlanEngSelected');
const planEngSelected = document.getElementById('planEngSelected');
const planCounterUsers = document.getElementById('planCounterUsers');
const priceEngSelected = document.getElementById('priceEngSelected');

const MULTIPLICADOR = {
    'basicEng': 1,
    'ProEng': 2
}

class Costo {
    constructor(planes) {
        this.planes = planes;
    }

    showPlan(plan){
        if(plan === 'Engagement'){
            ContainerPlanEngSelected.classList.remove('d-none');
            planEngSelected.innerHTML = this.planes['Engagement'].plan;
            planCounterUsers.innerHTML = this.planes['Engagement'].cantidadColaboradores;
            priceEngSelected.innerHTML = this.planes['Engagement'].total;
        }else if(plan === 'Formacion'){

        }
    }

    // funcion para ponerse en contacto
    planContactar() {
        console.log(this.plan, this.cantidadColaboradores);
    }
}

class CostoEng {
    constructor(plan, cantidadColaboradores, total) {
        this.plan = plan;
        this.cantidadColaboradores = cantidadColaboradores;
        this.total = total;
    }

    costoPlanBasico() {
        const total = MULTIPLICADOR['basicEng'] * this.cantidadColaboradores;
        totalPriceBasicEng.innerHTML = total;
        totalPrice.innerHTML = total;
        this.total = total;
    }

    costoPlanPro() {
        const total = MULTIPLICADOR['ProEng'] * this.cantidadColaboradores;
        totalPriceProEng.innerHTML = total;
        totalPrice.innerHTML = total;
        this.total = total;
    }

    addPlan() {
        const planEng = {
            total: this.total,
            plan: this.plan,
            cantidadColaboradores: this.cantidadColaboradores
        }
        cotizador.planes['Engagement'] = planEng;
        cotizador.showPlan('Engagement');
    }

}

class costoAcre { }

//inicializando clases
const cotizadorEng = new CostoEng('basic', cantColaboradores.value, 0);
const cotizador = new Costo({ 'Engagement': [], 'Formacion': [] });

cotizadorEng.costoPlanBasico();
cotizadorEng.costoPlanPro();

planBasicoEng.addEventListener('click', (event) => {
    shoppingCart.classList.remove("d-none");
    let plan = event.target.dataset.value;
    cotizadorEng.plan = plan;
    cotizadorEng.costoPlanBasico();
    cotizadorEng.addPlan();
    cotizadorEng.showPlan();
});

planProEng.addEventListener('click', (event) => {
    shoppingCart.classList.remove("d-none");
    let plan = event.target.dataset.value;
    cotizadorEng.plan = plan;
    cotizadorEng.costoPlanPro();
    cotizadorEng.addPlan();
    cotizadorEng.showPlan();
});

cantColaboradores.addEventListener('keyup', (event) => {
    let cantColaboradores = parseInt(event.target.value);
    cantColaboradores = isNaN(cantColaboradores) ? 0 : cantColaboradores;

    cotizadorEng.cantidadColaboradores = cantColaboradores;
    cotizadorEng.costoPlanBasico();
    cotizadorEng.costoPlanPro();
});

btnContacto.addEventListener('click', event => {
    cotizadorEng.planContactar();
});