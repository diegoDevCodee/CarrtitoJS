// VARIABLES
const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
const listaCursos = document.querySelector("#lista-cursos");
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners() {
  //CUando agregas un curso presionando "Agregar al carrito"
  listaCursos.addEventListener("click", agregarCurso);

  // Elimina cursos del carrito
  carrito.addEventListener("click", eliminarCurso);

  //Vaciar el carrito
  vaciarCarritoBtn.addEventListener("click", () => {
    articulosCarrito = []; // Reseteamos el arreglo

    limpiarHTML(); //Eliminamos todo el html
  });
}

//FUNCIONES

function agregarCurso(e) {
  e.preventDefault();
  if (e.target.classList.contains("agregar-carrito")) {
    const cursoSelecionado = e.target.parentElement.parentElement;

    leerDatosCurso(cursoSelecionado);
  }
}

//Elimina un curso del carrito
function eliminarCurso(e) {
  // console.log(e.target.classList)
  if (e.target.classList.contains("borrar-curso")) {
    const cursoId = e.target.getAttribute("data-id");

    //elimina del arreglo de articulos del carrito por el data-id
    articulosCarrito = articulosCarrito.filter((curso) => curso.id !== cursoId);

    carritoHTML(); // Iterar sobre el carrito y mostrar su HTML actualizado
  }
}

//Lee el contendio del html al que le dimos click y extrae la info del curso

function leerDatosCurso(curso) {
  // console.log(curso)

  // Crear un objeto con el contenido del curso actual
  const infoCurso = {
    imagen: curso.querySelector("img").src,
    titulo: curso.querySelector("h4").textContent,
    precio: curso.querySelector(".precio span").textContent,
    id: curso.querySelector("a").getAttribute("data-id"),
    cantidad: 1,
  };

  //Revsia si un elemento ya existe en el carrito
  const existe = articulosCarrito.some((curso) => curso.id === infoCurso.id);
  if (existe) {
    //actualizamos la cantidad
    const cursos = articulosCarrito.map((curso) => {
      if (curso.id === infoCurso.id) {
        curso.cantidad++;
        return curso; // retorna el objeto actualizado
      } else {
        return curso; // retorna los objetos que no son duplicados
      }
    });
    articulosCarrito = [...cursos];
  } else {
    //agregar elementos al arreglo del carrito
    articulosCarrito = [...articulosCarrito, infoCurso];
  }

  // console.log(articulosCarrito);

  carritoHTML();
}

//muestra el carrito de compras
function carritoHTML() {
  // limpiar el html
  limpiarHTML();

  //Recorre  el carrito y genera el html
  articulosCarrito.forEach((curso) => {
    const { imagen, titulo, precio, cantidad, id } = curso;
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>
      <img src="${imagen}" width="100"/>
      </td>
      <td>
      ${titulo}
      </td>
      <td>
      ${precio}
      </td>
      <td>
      ${cantidad}
      </td>
      <td>
        <a href="#" class="borrar-curso" data-id="${id}">
          X
        </a>
      </td>
    `;

    //Agrega el html del carrito en el tbody
    contenedorCarrito.appendChild(row);
  });
}

//Elimina los curso del tbody
function limpiarHTML() {
  //forma lenta
  // contenedorCarrito.innerHTML=''

  //forma rapida
  while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
  }
}
