const planBasicoEng = document.getElementById('planBasicoEng');
const planProEng = document.getElementById('planProEng');
const planBasicoEngSpinner = document.getElementById('planBasicoEngSpinner');
const PlanProEngSpinner = document.getElementById('PlanProEngSpinner');
const cantColaboradores = document.getElementById('cantColaboradores');
const shoppingCart = document.getElementById('shoppingCart');
const totalPrice = document.getElementById('totalPrice');
const totalPriceBasicEng = document.getElementById('totalPriceBasicEng');
const totalPriceProEng = document.getElementById('totalPriceProEng');
const formContact = document.getElementById('formContact');
const emailContacto = document.getElementById('emailContacto');
const contactForm = document.getElementById("contactForm");
const URL_API_PIPEDRIVE = 'https://api.pipedrive.com/v1/leads?api_token=a33ef9998c19b76ece6b44f3af26722074839511';
const toast = document.getElementById('engToast');
const toastBad = document.getElementById('engBadToast');
const modalToast = new bootstrap.Toast(toast);
const modalToastBad = new bootstrap.Toast(toastBad);
const ModalSuccessMessage = new bootstrap.Modal(document.getElementById('ModalSuccessMessage'));
const ModalDangerMessage = new bootstrap.Modal(document.getElementById('ModalDangerMessage'));
/*
"id": "8af0b8b0-060c-11ee-8831-3bb6f72fed65" // "PLAN BASICO FORMACION"
"id": "998134e0-060c-11ee-b598-316797ecfe16" // "PLAN PRO FORMACION"
"id": "ae135610-0605-11ee-9fef-598ff8a2911e" // "PLAN BASICO ENGAGEMENT"
"id": "b6432180-0605-11ee-9fef-598ff8a2911e" // "PLAN PRO ENGAGEMENT"

// shoppingCart elements
const ContainerPlanEngSelected = document.getElementById('ContainerPlanEngSelected');
*/
const planEngSelected = document.getElementById('planEngSelected');
const planCounterUsers = document.getElementById('planCounterUsers');
const priceEngSelected = document.getElementById('priceEngSelected');

const DESCUENTOS = {
    'Engagement': {
        'PlanBasico': 0.15
    },
    'Formacion': {
        'PlanBasico': 0.15
    }
};

const BASE = {
    'Engagement': [{
        '300': { 'Base': 86, 'Unidad': 0.07 },
        '500': { 'Base': 89, 'Unidad': 0.09 },
        '1000': { 'Base': 99, 'Unidad': 0.08 },
        '4000': { 'Base': 109, 'Unidad': 0.07 },
        '10000': { 'Base': 119, 'Unidad': 0.05 },
    }],
    'Formacion': 1,
};

class CostoEng {
    constructor(plan, cantidadColaboradores, total, label = '', email = '') {
        this.plan = plan;
        this.cantidadColaboradores = cantidadColaboradores;
        this.total = total;
        this.label = label;
        this.email = email;
    }

    costoPlanBasico() {
        let total = this.calcularCosto();
        if (this.plan === 'basic') {
            total = total - (total * DESCUENTOS['Engagement']['PlanBasico']);
            total = parseFloat(Math.round(total));
        }

        planBasicoEng.setAttribute("data-price", total);
        totalPriceBasicEng.innerHTML = total;
        this.total = total;
    }

    costoPlanPro() {
        const total = this.calcularCosto();
        totalPriceProEng.innerHTML = total;
        planProEng.setAttribute("data-price", total);
        this.total = total;
    }

    calcularCosto() {
        let total = 0;
        let base = 0;
        let valorUsuario = 0;

        if (this.cantidadColaboradores <= 100) {
            total = BASE['Engagement'][0]['300']['Base'];
            return total;
        } else if (this.cantidadColaboradores > 100 && this.cantidadColaboradores <= 300) {
            base = BASE['Engagement'][0]['300']['Base'];
            valorUsuario = BASE['Engagement'][0]['300']['Unidad'];
            total = base + (valorUsuario * (this.cantidadColaboradores - 100));
            return total;
        } else if (this.cantidadColaboradores > 300 && this.cantidadColaboradores <= 500) {
            base = BASE['Engagement'][0]['500']['Base'];
            valorUsuario = BASE['Engagement'][0]['500']['Unidad'];
        } else if (this.cantidadColaboradores > 500 && this.cantidadColaboradores <= 1000) {
            base = BASE['Engagement'][0]['1000']['Base'];
            valorUsuario = BASE['Engagement'][0]['1000']['Unidad'];
        } else if (this.cantidadColaboradores > 1000 && this.cantidadColaboradores <= 4000) {
            base = BASE['Engagement'][0]['4000']['Base'];
            valorUsuario = BASE['Engagement'][0]['4000']['Unidad'];
        } else if (this.cantidadColaboradores > 4000 && this.cantidadColaboradores <= 10000) {
            base = BASE['Engagement'][0]['10000']['Base'];
            valorUsuario = BASE['Engagement'][0]['10000']['Unidad'];
        }

        total = base + (valorUsuario * this.cantidadColaboradores);
        total = parseFloat(Math.round(total));

        return total;
    }

    async contactar() {
        const data = {
            "title": `${this.email} (${this.cantidadColaboradores} personas)`,
            "organization_id": 165,
            "label_ids": [this.label],
            "value": {
                "amount": this.total,
                "currency": "CLF"
            },
            "was_seen": false
        };
        const response = await fetch(URL_API_PIPEDRIVE, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(data)
        });
    
        if (response.status === 201) {
            ModalSuccessMessage.show();
        } else {
            ModalDangerMessage.show();
        }
    }
}

class costoAcre { }

//inicializando clases
const cotizadorEng = new CostoEng('basic', cantColaboradores.value, 0);

cotizadorEng.costoPlanBasico();
cotizadorEng.costoPlanPro();

cantColaboradores.addEventListener('keyup', (event) => {
    let cantColaboradores = parseInt(event.target.value);
    cantColaboradores = isNaN(cantColaboradores) ? 0 : cantColaboradores;

    cotizadorEng.cantidadColaboradores = cantColaboradores;
    cotizadorEng.costoPlanBasico();
    cotizadorEng.costoPlanPro();
});

emailContacto.addEventListener('keyup', (event) => {
    cotizadorEng.email = emailContacto.value;
});

contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    let submitterId = event.submitter.id;
    let plan = event.submitter.dataset.value;
    let label = event.submitter.dataset.label;
    cotizadorEng.plan = plan;
    cotizadorEng.label = label;
    contactar(submitterId);

    planEngSelected.innerText = plan;
    planCounterUsers.innerText = cotizadorEng.cantidadColaboradores;
    priceEngSelected.innerText = event.submitter.dataset.price;
});

async function contactar(submitterId){
    //deshabilitando boton de contactar para evitar spam
    document.getElementById(submitterId).classList.add('d-none');
    document.getElementById(submitterId+'Spinner').classList.remove('d-none');
        
    await cotizadorEng.contactar(submitterId);

    document.getElementById(submitterId).classList.remove('d-none');
    document.getElementById(submitterId+'Spinner').classList.add('d-none');
}