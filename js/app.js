const ingresos = [
    new Ingreso('Salario', 3000.00),
    new Ingreso('Venta auto', 1500)
];
const egresos = [
    new Egreso('Renta departamento', 900),
    new Egreso('Ropa', 400)
];

let cargarApp = () => {
    cargarCabecero();
    cargarIngresos();
    cargarEgresos ();
}

let totalIngresos = () => {
    let totalIngreso = 0;
    for(let ingreso of ingresos){
        totalIngreso += ingreso.valor;
    }
    return totalIngreso;
}

let totalEgresos = () => {
    let totalEgreso = 0;
    for(let egreso of egresos){
        totalEgreso += egreso.valor;
    }
    return totalEgreso;
}

let cargarCabecero = () => {
    let presupuesto = totalIngresos() - totalEgresos();
    let porcentajeEgreso = totalEgresos()/totalIngresos();
    document.querySelector('#presupuesto').innerHTML = formatoMoneda(presupuesto);
    document.querySelector('#porcentaje').innerHTML = formatoPorcentaje(porcentajeEgreso);
    document.querySelector('#ingresos').innerHTML = formatoMoneda(totalIngresos());
    document.querySelector('#egresos').innerHTML = formatoMoneda(totalEgresos());
    
}

const formatoMoneda = (valor) => {
    return valor.toLocaleString('en-US', {style:'currency', currency:'USD', minimumFractionDigits:2});

}
const formatoPorcentaje = (valor) => {
    return valor.toLocaleString('en-US', {style:'percent', minimumFractionDigits:2});

}

const cargarIngresos = () => {
    let ingresosHTML = '';
    for(let ingreso of ingresos){
        ingresosHTML += crearIngresoHTML(ingreso);
    }
    document.querySelector('#lista-ingresos').innerHTML = ingresosHTML;
}
const cargarEgresos = () => {
    let egresosHTML = '';
    for(let egreso of egresos){
        egresosHTML += crearEgresoHTML(egreso);
    }
    document.querySelector('#lista-egresos').innerHTML = egresosHTML;
}

const crearIngresoHTML = (ingreso) => {
    let ingresoHTML =`
        <div class="elemento limpiarEstilos">
        <div class="elemento_descripcion">${ingreso.descripcion}</div>
        <div class="derecha limpiarEstilos">
            <div class="elemento_valor">+ ${formatoMoneda(ingreso.valor)}</div>
            <div class="elemento_eliminar">
                <div class="elemento_eliminar--btn">
                    <ion-icon name="close-circle-sharp" 
                    onclick = 'eliminarIngreso(${ingreso.id})'></ion-icon>
                </div>
            </div>
        </div>
        </div>
    `;
    return ingresoHTML; 
}

const eliminarIngreso = (id) => {
   let indiceEliminar = ingresos.findIndex((ingreso) => ingreso.id === id);
    //Mae esta pinga funciona así: por cada objeto que tenga el arreglo de ingresos[] (lo itera), findIndex realiza una busqueda y compara cual objeto tiene un id igual al parametro id que estamos proporcionando al hacer click en el boton de eliminar en el prorgrama, una vez que lo encuentra, lo extrae y lo guarda como indice en la variable indiceEliminar
    
    ingresos.splice(indiceEliminar, 1);//lo elimina del arreglo

    cargarCabecero();//y vuelve a cargar toda esta pinga para que se actualize la estrutura de la pagina y los calculos totales respectivos 
    cargarIngresos();    
}    

const crearEgresoHTML = (egreso) => {
    let egresoHTML =`
    <div class="elemento limpiarEstilos">
    <div class="elemento_descripcion">${egreso.descripcion}</div>
    <div class="derecha limpiarEstilos">
    <div class="elemento_valor">- ${formatoMoneda(egreso.valor)}</div>
    <div class="elemento_porcentaje">${formatoPorcentaje(egreso.valor/totalEgresos())}</div>
    <div class="elemento_eliminar">
    <div class="elemento_eliminar--btn">
    <ion-icon name="close-circle-sharp" 
    onclick = 'eliminarEgreso(${egreso.id})'></ion-icon>
    </div>
    </div>
    </div>
    </div>
    `;
    return egresoHTML; 
}
const eliminarEgreso = (id) => {
    let indiceEliminar = egresos.findIndex((egreso) => egreso.id === id);
  
    egresos.splice(indiceEliminar, 1);

    cargarCabecero();
    cargarEgresos();    
}    

let agregarDato = () => {
    let forma = document.forms['forma'];
    let tipo = forma['tipo'];
    let descripcion = forma['descripcion'];
    let valor = forma['valor'];
    
    if(descripcion.value !== '' && valor.value !== ''){
        if(tipo.value === 'ingreso'){
            ingresos.push(new Ingreso(descripcion.value, +valor.value));//el + lo convierte en valor numerico
            cargarCabecero();
            cargarIngresos();    
        }else if (tipo.value === 'egreso'){
            egresos.push(new Egreso(descripcion.value, +valor.value));//el + lo convierte en valor numerico
            cargarCabecero();
            cargarEgresos();    
            
        }
    }

}
